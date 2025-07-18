// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./UserRegistry.sol";
import "./JobRegistry.sol";

contract PaymentRegistry is Ownable, Pausable, ReentrancyGuard {
    
    UserRegistry public userRegistry;
    JobRegistry public jobRegistry;
    
    // Mappings
    mapping(uint256 => uint256) public escrowBalances; // jobId => amount
    mapping(address => uint256) public agentEarnings; // agent => total earnings
    mapping(address => uint256) public pendingPayments; // agent => pending amount
    mapping(uint256 => bool) public paymentsReleased; // jobId => released status
    
    // Platform fee (2% = 200 basis points)
    uint256 public platformFeeBps = 200; // 2%
    uint256 public platformFees;
    
    // Events
    event FundsDeposited(uint256 indexed jobId, uint256 amount);
    event PaymentReleased(uint256 indexed jobId, address indexed agent, uint256 amount);
    event PaymentRefunded(uint256 indexed jobId, address indexed scout, uint256 amount);
    event EarningsWithdrawn(address indexed agent, uint256 amount);
    event PlatformFeeCollected(uint256 indexed jobId, uint256 amount);
    
    constructor(address _userRegistry, address _jobRegistry) Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
        jobRegistry = JobRegistry(_jobRegistry);
    }
    
    modifier onlyJobRegistry() {
        require(msg.sender == address(jobRegistry), "Only JobRegistry can call this");
        _;
    }
    
    modifier onlyScout(uint256 jobId) {
        // Check if caller is the scout for this job
        ( , address scout, , , , , , , , , , , bool isCompleted, bool isPaid) = jobRegistry.jobs(jobId);
        require(scout == msg.sender, "Only job scout can perform this action");
        _;
    }
    
    modifier onlyAssignedAgent(uint256 jobId) {
        // Check if caller is the assigned agent for this job
        ( , , address assignedAgent, , , , , , , , , , bool isCompleted, bool isPaid) = jobRegistry.jobs(jobId);
        require(assignedAgent == msg.sender, "Only assigned agent can perform this action");
        _;
    }
    
    modifier onlyCompletedJob(uint256 jobId) {
        // Check if job is completed
        ( , , , , , , , , JobRegistry.JobStatus status, , , , bool isCompleted, bool isPaid) = jobRegistry.jobs(jobId);
        require(status == JobRegistry.JobStatus.Completed, "Job must be completed");
        _;
    }
    
    // Function to deposit funds for a job (called by JobRegistry)
    function depositFunds(uint256 jobId) external payable onlyJobRegistry {
        require(msg.value > 0, "Must deposit funds");
        
        escrowBalances[jobId] = msg.value;
        
        emit FundsDeposited(jobId, msg.value);
    }
    
    // Function to release payment to agent (called by JobRegistry when job is approved)
    function releasePayment(uint256 jobId) external onlyJobRegistry onlyCompletedJob(jobId) nonReentrant {
        require(escrowBalances[jobId] > 0, "No funds in escrow");
        require(!paymentsReleased[jobId], "Payment already released");
        
        // Get job details from JobRegistry
        ( , , address agent, , , , , , , , , , , ) = jobRegistry.jobs(jobId);
        require(agent != address(0), "No agent assigned to job");
        uint256 amount = escrowBalances[jobId];
        
        // Calculate platform fee
        uint256 platformFee = (amount * platformFeeBps) / 10000;
        uint256 agentPayment = amount - platformFee;
        
        // Update state
        escrowBalances[jobId] = 0;
        paymentsReleased[jobId] = true;
        agentEarnings[agent] += agentPayment;
        pendingPayments[agent] += agentPayment;
        platformFees += platformFee;
        
        // Transfer funds
        payable(agent).transfer(agentPayment);
        payable(owner()).transfer(platformFee);
        
        // Update agent stats in UserRegistry
        userRegistry.incrementAgentEarnings(agent, agentPayment);
        
        emit PaymentReleased(jobId, agent, agentPayment);
        emit PlatformFeeCollected(jobId, platformFee);
    }
    
    // Function to refund payment to scout (for cancelled/disputed jobs)
    function refundPayment(uint256 jobId) external onlyJobRegistry nonReentrant {
        require(escrowBalances[jobId] > 0, "No funds in escrow");
        require(!paymentsReleased[jobId], "Payment already processed");
        
        // Get job details from JobRegistry
        ( , address scout, , , , , , , , , , , , ) = jobRegistry.jobs(jobId);
        require(scout != address(0), "Invalid scout address");
        uint256 amount = escrowBalances[jobId];
        
        // Update state
        escrowBalances[jobId] = 0;
        paymentsReleased[jobId] = true;
        
        // Transfer funds back to scout
        payable(scout).transfer(amount);
        
        emit PaymentRefunded(jobId, scout, amount);
    }
    
    // Function for agents to withdraw their earnings
    function withdrawEarnings() external nonReentrant {
        uint256 amount = pendingPayments[msg.sender];
        require(amount > 0, "No pending payments");
        
        pendingPayments[msg.sender] = 0;
        
        payable(msg.sender).transfer(amount);
        
        emit EarningsWithdrawn(msg.sender, amount);
    }
    
    // View functions
    function getEscrowBalance(uint256 jobId) external view returns (uint256) {
        return escrowBalances[jobId];
    }
    
    function getAgentEarnings(address agent) external view returns (uint256) {
        return agentEarnings[agent];
    }
    
    function getPendingPayments(address agent) external view returns (uint256) {
        return pendingPayments[agent];
    }
    
    function getPlatformFees() external view returns (uint256) {
        return platformFees;
    }
    
    // Admin functions
    function setPlatformFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee cannot exceed 10%");
        platformFeeBps = newFeeBps;
    }
    
    function withdrawPlatformFees() external onlyOwner {
        uint256 amount = platformFees;
        platformFees = 0;
        payable(owner()).transfer(amount);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function setUserRegistry(address _userRegistry) external onlyOwner {
        userRegistry = UserRegistry(_userRegistry);
    }
    
    function setJobRegistry(address _jobRegistry) external onlyOwner {
        jobRegistry = JobRegistry(_jobRegistry);
    }
    
    // Emergency functions
    function emergencyWithdraw(uint256 jobId) external onlyOwner {
        require(escrowBalances[jobId] > 0, "No funds to withdraw");
        uint256 amount = escrowBalances[jobId];
        escrowBalances[jobId] = 0;
        payable(owner()).transfer(amount);
    }
    
    // Receive function to accept ETH
    receive() external payable {}
} 