// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./UserRegistry.sol";

contract JobRegistry is Ownable, Pausable {
    
    UserRegistry public userRegistry;
    
    struct JobRequest {
        uint256 jobId;
        address scout;
        address assignedAgent;
        string title;
        string description;
        string location;
        uint256 budget;
        uint256 escrowAmount;
        JobStatus status;
        uint8 progress;
        uint256 createdAt;
        uint256 deadline;
        string[] proofUrls;
        bool isCompleted;
        bool isPaid;
    }
    
    enum JobStatus {
        Posted,
        Applied,
        Assigned,
        InProgress,
        Submitted,
        Completed,
        Disputed,
        Cancelled
    }
    
    // Mappings
    mapping(uint256 => JobRequest) public jobs;
    mapping(uint256 => mapping(uint256 => address)) public jobApplications; // jobId => index => address
    mapping(uint256 => uint256) public jobApplicationCount; // jobId => count
    mapping(uint256 => mapping(address => bool)) public hasApplied;
    mapping(address => mapping(uint256 => uint256)) public scoutJobs; // scout => index => jobId
    mapping(address => uint256) public scoutJobCount; // scout => count
    mapping(address => mapping(uint256 => uint256)) public agentJobs; // agent => index => jobId
    mapping(address => uint256) public agentJobCount; // agent => count
    
    // State variables
    uint256 public nextJobId = 1;
    
    // Events
    event JobPosted(uint256 indexed jobId, address indexed scout, uint256 budget);
    event JobApplicationSubmitted(uint256 indexed jobId, address indexed agent);
    event JobAssigned(uint256 indexed jobId, address indexed agent);
    event JobStarted(uint256 indexed jobId);
    event JobProgressUpdated(uint256 indexed jobId, uint8 progress);
    event JobCompleted(uint256 indexed jobId);
    event JobDisputed(uint256 indexed jobId, string reason);
    event JobCancelled(uint256 indexed jobId);
    
    constructor(address _userRegistry) Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
    }
    
    modifier onlyScout(uint256 jobId) {
        require(jobs[jobId].scout == msg.sender, "Only job scout can perform this action");
        _;
    }
    
    modifier onlyAssignedAgent(uint256 jobId) {
        require(jobs[jobId].assignedAgent == msg.sender, "Only assigned agent can perform this action");
        _;
    }
    
    modifier onlyActiveJob(uint256 jobId) {
        require(jobs[jobId].status != JobStatus.Completed && 
                jobs[jobId].status != JobStatus.Cancelled, "Job is not active");
        _;
    }
    
    modifier onlyRegisteredScout() {
        // Check if user is registered as scout in UserRegistry
        require(userRegistry.registeredScouts(msg.sender), "Must be registered scout");
        _;
    }
    
    modifier onlyRegisteredAgent() {
        // Check if user is registered as agent in UserRegistry
        require(userRegistry.registeredAgents(msg.sender), "Must be registered agent");
        _;
    }
    
    function postJobRequest(
        string memory title,
        string memory description,
        string memory location,
        uint256 budget,
        address preferredAgent
    ) external payable whenNotPaused onlyRegisteredScout {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(location).length > 0, "Location cannot be empty");
        require(budget > 0, "Budget must be greater than 0");
        require(msg.value >= budget, "Insufficient escrow amount");
        
        uint256 jobId = nextJobId++;
        
        jobs[jobId] = JobRequest({
            jobId: jobId,
            scout: msg.sender,
            assignedAgent: address(0),
            title: title,
            description: description,
            location: location,
            budget: budget,
            escrowAmount: msg.value,
            status: JobStatus.Posted,
            progress: 0,
            createdAt: block.timestamp,
            deadline: block.timestamp + 30 days, // 30 days default deadline
            proofUrls: new string[](0),
            isCompleted: false,
            isPaid: false
        });
        
        scoutJobs[msg.sender][scoutJobCount[msg.sender]] = jobId;
        scoutJobCount[msg.sender]++;
        
        // If preferred agent is specified, automatically assign
        if (preferredAgent != address(0)) {
            _assignAgent(jobId, preferredAgent);
        }
        
        // Update scout's job count
        userRegistry.incrementScoutJobs(msg.sender);
        
        emit JobPosted(jobId, msg.sender, budget);
    }
    
    function applyForJob(uint256 jobId) external whenNotPaused onlyRegisteredAgent {
        require(jobs[jobId].status == JobStatus.Posted, "Job is not open for applications");
        require(!hasApplied[jobId][msg.sender], "Already applied for this job");
        require(jobs[jobId].scout != msg.sender, "Cannot apply to your own job");
        
        jobApplications[jobId][jobApplicationCount[jobId]] = msg.sender;
        jobApplicationCount[jobId]++;
        hasApplied[jobId][msg.sender] = true;
        
        agentJobs[msg.sender][agentJobCount[msg.sender]] = jobId;
        agentJobCount[msg.sender]++;
        
        emit JobApplicationSubmitted(jobId, msg.sender);
    }
    
    function acceptAgent(uint256 jobId, address agent) external onlyScout(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.Posted, "Job is not in posted status");
        require(hasApplied[jobId][agent], "Agent has not applied for this job");
        
        _assignAgent(jobId, agent);
    }
    
    function _assignAgent(uint256 jobId, address agent) internal {
        jobs[jobId].assignedAgent = agent;
        jobs[jobId].status = JobStatus.Assigned;
        
        emit JobAssigned(jobId, agent);
    }
    
    function startJob(uint256 jobId) external onlyAssignedAgent(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.Assigned, "Job must be assigned first");
        
        jobs[jobId].status = JobStatus.InProgress;
        jobs[jobId].progress = 0;
        
        emit JobStarted(jobId);
    }
    
    function updateJobProgress(
        uint256 jobId, 
        uint8 progressPercentage, 
        string memory updateMessage
    ) external onlyAssignedAgent(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.InProgress, "Job must be in progress");
        require(progressPercentage <= 100, "Progress cannot exceed 100%");
        require(progressPercentage > jobs[jobId].progress, "Progress must increase");
        
        jobs[jobId].progress = progressPercentage;
        
        emit JobProgressUpdated(jobId, progressPercentage);
    }
    
    function submitJobCompletion(
        uint256 jobId, 
        string memory deliverables, 
        string[] memory proofUrls
    ) external onlyAssignedAgent(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.InProgress, "Job must be in progress");
        require(jobs[jobId].progress == 100, "Job must be 100% complete");
        require(bytes(deliverables).length > 0, "Deliverables cannot be empty");
        
        jobs[jobId].status = JobStatus.Submitted;
        jobs[jobId].proofUrls = proofUrls;
        
        emit JobCompleted(jobId);
    }
    
    function approveJobCompletion(uint256 jobId) external onlyScout(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.Submitted, "Job must be submitted for approval");
        
        jobs[jobId].status = JobStatus.Completed;
        jobs[jobId].isCompleted = true;
        
        // Trigger payment release (this would be handled by PaymentRegistry)
        // paymentRegistry.releasePayment(jobId);
        
        emit JobCompleted(jobId);
    }
    
    function disputeJob(uint256 jobId, string memory reason) external onlyScout(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.Submitted, "Job must be submitted to dispute");
        require(bytes(reason).length > 0, "Dispute reason cannot be empty");
        
        jobs[jobId].status = JobStatus.Disputed;
        
        emit JobDisputed(jobId, reason);
    }
    
    function cancelJobRequest(uint256 jobId) external onlyScout(jobId) onlyActiveJob(jobId) {
        require(jobs[jobId].status == JobStatus.Posted, "Can only cancel posted jobs");
        
        jobs[jobId].status = JobStatus.Cancelled;
        
        // Refund escrow to scout
        payable(msg.sender).transfer(jobs[jobId].escrowAmount);
        
        emit JobCancelled(jobId);
    }
    
    // View functions - return individual fields instead of full struct
    function getJobBasicInfo(uint256 jobId) external view returns (
        uint256 _jobId,
        address _scout,
        address _assignedAgent,
        string memory _title,
        string memory _description,
        string memory _location,
        uint256 _budget,
        uint256 _escrowAmount,
        JobStatus _status,
        uint8 _progress,
        uint256 _createdAt,
        uint256 _deadline,
        bool _isCompleted,
        bool _isPaid
    ) {
        require(jobs[jobId].jobId != 0, "Job not found");
        JobRequest storage job = jobs[jobId];
        return (
            job.jobId,
            job.scout,
            job.assignedAgent,
            job.title,
            job.description,
            job.location,
            job.budget,
            job.escrowAmount,
            job.status,
            job.progress,
            job.createdAt,
            job.deadline,
            job.isCompleted,
            job.isPaid
        );
    }
    
    // Split into smaller functions to avoid stack too deep
    function getJobBasicInfoPart1(uint256 jobId) external view returns (
        uint256 _jobId,
        address _scout,
        address _assignedAgent,
        string memory _title,
        string memory _description
    ) {
        require(jobs[jobId].jobId != 0, "Job not found");
        JobRequest storage job = jobs[jobId];
        return (
            job.jobId,
            job.scout,
            job.assignedAgent,
            job.title,
            job.description
        );
    }
    
    function getJobBasicInfoPart2(uint256 jobId) external view returns (
        string memory _location,
        uint256 _budget,
        uint256 _escrowAmount,
        JobStatus _status,
        uint8 _progress
    ) {
        require(jobs[jobId].jobId != 0, "Job not found");
        JobRequest storage job = jobs[jobId];
        return (
            job.location,
            job.budget,
            job.escrowAmount,
            job.status,
            job.progress
        );
    }
    
    function getJobBasicInfoPart3(uint256 jobId) external view returns (
        uint256 _createdAt,
        uint256 _deadline,
        bool _isCompleted,
        bool _isPaid
    ) {
        require(jobs[jobId].jobId != 0, "Job not found");
        JobRequest storage job = jobs[jobId];
        return (
            job.createdAt,
            job.deadline,
            job.isCompleted,
            job.isPaid
        );
    }
    
    function getJobProofUrls(uint256 jobId) external view returns (string[] memory) {
        require(jobs[jobId].jobId != 0, "Job not found");
        return jobs[jobId].proofUrls;
    }
    
    // Paginated functions to avoid gas issues
    function getScoutJobsPaginated(address scout, uint256 startIndex, uint256 count) external view returns (uint256[] memory jobIds, uint256 totalCount) {
        uint256 totalJobs = scoutJobCount[scout];
        require(startIndex < totalJobs, "Start index out of bounds");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > totalJobs) {
            endIndex = totalJobs;
        }
        
        uint256 actualCount = endIndex - startIndex;
        jobIds = new uint256[](actualCount);
        
        for (uint256 i = 0; i < actualCount; i++) {
            jobIds[i] = scoutJobs[scout][startIndex + i];
        }
        
        totalCount = totalJobs;
    }
    
    function getAgentJobsPaginated(address agent, uint256 startIndex, uint256 count) external view returns (uint256[] memory jobIds, uint256 totalCount) {
        uint256 totalJobs = agentJobCount[agent];
        require(startIndex < totalJobs, "Start index out of bounds");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > totalJobs) {
            endIndex = totalJobs;
        }
        
        uint256 actualCount = endIndex - startIndex;
        jobIds = new uint256[](actualCount);
        
        for (uint256 i = 0; i < actualCount; i++) {
            jobIds[i] = agentJobs[agent][startIndex + i];
        }
        
        totalCount = totalJobs;
    }
    
    function getJobApplicationsPaginated(uint256 jobId, uint256 startIndex, uint256 count) external view returns (address[] memory applications, uint256 totalCount) {
        uint256 totalApplications = jobApplicationCount[jobId];
        require(startIndex < totalApplications, "Start index out of bounds");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > totalApplications) {
            endIndex = totalApplications;
        }
        
        uint256 actualCount = endIndex - startIndex;
        applications = new address[](actualCount);
        
        for (uint256 i = 0; i < actualCount; i++) {
            applications[i] = jobApplications[jobId][startIndex + i];
        }
        
        totalCount = totalApplications;
    }
    
    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function setUserRegistry(address _userRegistry) external onlyOwner {
        userRegistry = UserRegistry(_userRegistry);
    }
} 