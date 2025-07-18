// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./UserRegistry.sol";
import "./JobRegistry.sol";
import "./PaymentRegistry.sol";
import "./RatingRegistry.sol";

contract SecureScoutHub is Ownable, Pausable {
    
    UserRegistry public userRegistry;
    JobRegistry public jobRegistry;
    PaymentRegistry public paymentRegistry;
    RatingRegistry public ratingRegistry;
    
    // Events
    event ContractUpdated(string contractName, address newAddress);
    event SystemPaused(address indexed by);
    event SystemUnpaused(address indexed by);
    
    constructor(
        address _userRegistry,
        address _jobRegistry,
        address payable _paymentRegistry,
        address _ratingRegistry
    ) Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
        jobRegistry = JobRegistry(_jobRegistry);
        paymentRegistry = PaymentRegistry(_paymentRegistry);
        ratingRegistry = RatingRegistry(_ratingRegistry);
    }
    
    // User Management Functions
    function registerScout(
        string memory displayName, 
        string memory email, 
        string memory location
    ) external whenNotPaused {
        userRegistry.registerScout(displayName, email, location);
    }
    
    function registerAgent(
        string memory name, 
        string memory email, 
        string memory serviceType, 
        uint256 priceInPAS, 
        string memory location
    ) external whenNotPaused {
        userRegistry.registerAgent(name, email, serviceType, priceInPAS, location);
    }
    
    // Use paginated functions instead of getAllAgents
    function getAgentsPaginated(uint256 startIndex, uint256 count) external view returns (address[] memory agentAddresses, uint256 totalCount) {
        return userRegistry.getAgentsPaginated(startIndex, count);
    }
    
    function getAgentAtIndex(uint256 index) external view returns (UserRegistry.Agent memory) {
        return userRegistry.getAgentAtIndex(index);
    }
    
    function getAgentsByLocation(string memory location) external view returns (address[] memory) {
        return userRegistry.getAgentsByLocation(location);
    }
    
    function getAgentsByService(string memory serviceType) external view returns (address[] memory) {
        return userRegistry.getAgentsByService(serviceType);
    }
    
    function getAvailableAgents() external view returns (address[] memory) {
        return userRegistry.getAvailableAgents();
    }
    
    function getScout(address scoutAddress) external view returns (UserRegistry.Scout memory) {
        return userRegistry.getScout(scoutAddress);
    }
    
    function getAgent(address agentAddress) external view returns (UserRegistry.Agent memory) {
        return userRegistry.getAgent(agentAddress);
    }
    
    // Job Management Functions
    function postJobRequest(
        string memory title,
        string memory description,
        string memory location,
        uint256 budget,
        address preferredAgent
    ) external payable whenNotPaused {
        jobRegistry.postJobRequest{value: msg.value}(title, description, location, budget, preferredAgent);
    }
    
    function applyForJob(uint256 jobId) external whenNotPaused {
        jobRegistry.applyForJob(jobId);
    }
    
    function acceptAgent(uint256 jobId, address agent) external whenNotPaused {
        jobRegistry.acceptAgent(jobId, agent);
    }
    
    function startJob(uint256 jobId) external whenNotPaused {
        jobRegistry.startJob(jobId);
    }
    
    function updateJobProgress(
        uint256 jobId, 
        uint8 progressPercentage, 
        string memory updateMessage
    ) external whenNotPaused {
        jobRegistry.updateJobProgress(jobId, progressPercentage, updateMessage);
    }
    
    function submitJobCompletion(
        uint256 jobId, 
        string memory deliverables, 
        string[] memory proofUrls
    ) external whenNotPaused {
        jobRegistry.submitJobCompletion(jobId, deliverables, proofUrls);
    }
    
    function approveJobCompletion(uint256 jobId) external whenNotPaused {
        jobRegistry.approveJobCompletion(jobId);
        // Trigger payment release
        paymentRegistry.releasePayment(jobId);
    }
    
    function disputeJob(uint256 jobId, string memory reason) external whenNotPaused {
        jobRegistry.disputeJob(jobId, reason);
    }
    
    function cancelJobRequest(uint256 jobId) external whenNotPaused {
        jobRegistry.cancelJobRequest(jobId);
        // Trigger refund
        paymentRegistry.refundPayment(jobId);
    }
    
    // Use new job info functions instead of getJobRequest
    function getJobBasicInfo(uint256 jobId) external view returns (
        uint256 _jobId,
        address _scout,
        address _assignedAgent,
        string memory _title,
        string memory _description,
        string memory _location,
        uint256 _budget,
        uint256 _escrowAmount,
        JobRegistry.JobStatus _status,
        uint8 _progress,
        uint256 _createdAt,
        uint256 _deadline,
        bool _isCompleted,
        bool _isPaid
    ) {
        return jobRegistry.getJobBasicInfo(jobId);
    }
    
    function getJobProofUrls(uint256 jobId) external view returns (string[] memory) {
        return jobRegistry.getJobProofUrls(jobId);
    }
    
    // Use paginated functions for job lists
    function getScoutJobsPaginated(address scout, uint256 startIndex, uint256 count) external view returns (uint256[] memory jobIds, uint256 totalCount) {
        return jobRegistry.getScoutJobsPaginated(scout, startIndex, count);
    }
    
    function getAgentJobsPaginated(address agent, uint256 startIndex, uint256 count) external view returns (uint256[] memory jobIds, uint256 totalCount) {
        return jobRegistry.getAgentJobsPaginated(agent, startIndex, count);
    }
    
    function getJobApplicationsPaginated(uint256 jobId, uint256 startIndex, uint256 count) external view returns (address[] memory applications, uint256 totalCount) {
        return jobRegistry.getJobApplicationsPaginated(jobId, startIndex, count);
    }
    
    // Payment Functions
    function withdrawEarnings() external whenNotPaused {
        paymentRegistry.withdrawEarnings();
    }
    
    function getEscrowBalance(uint256 jobId) external view returns (uint256) {
        return paymentRegistry.getEscrowBalance(jobId);
    }
    
    function getAgentEarnings(address agent) external view returns (uint256) {
        return paymentRegistry.getAgentEarnings(agent);
    }
    
    function getPendingPayments(address agent) external view returns (uint256) {
        return paymentRegistry.getPendingPayments(agent);
    }
    
    // Rating Functions
    function rateAgent(uint256 jobId, uint8 rating, string memory review) external whenNotPaused {
        ratingRegistry.rateAgent(jobId, rating, review);
    }
    
    function rateScout(uint256 jobId, uint8 rating, string memory review) external whenNotPaused {
        ratingRegistry.rateScout(jobId, rating, review);
    }
    
    function getAgentRating(address agent) external view returns (uint256 averageRating, uint256 totalRatings) {
        return ratingRegistry.getAgentRating(agent);
    }
    
    function getScoutRating(address scout) external view returns (uint256 averageRating, uint256 totalRatings) {
        return ratingRegistry.getScoutRating(scout);
    }
    
    function getJobReviews(uint256 jobId) external view returns (RatingRegistry.Review memory) {
        return ratingRegistry.getJobReviews(jobId);
    }
    
    // Use paginated function for user reviews
    function getUserReviewsPaginated(address user, uint256 startIndex, uint256 count) external view returns (uint256[] memory reviewJobIds, uint256 totalCount) {
        return ratingRegistry.getUserReviewsPaginated(user, startIndex, count);
    }
    
    // Agent Management Functions
    function setAgentAvailability(bool isAvailable) external whenNotPaused {
        userRegistry.setAgentAvailability(isAvailable);
    }
    
    function updateAgentPrice(uint256 newPriceInPAS) external whenNotPaused {
        userRegistry.updateAgentPrice(newPriceInPAS);
    }
    
    function updateAgentLocation(string memory newLocation) external whenNotPaused {
        userRegistry.updateAgentLocation(newLocation);
    }
    
    // Admin Functions
    function setUserRegistry(address _userRegistry) external onlyOwner {
        userRegistry = UserRegistry(_userRegistry);
        emit ContractUpdated("UserRegistry", _userRegistry);
    }
    
    function setJobRegistry(address _jobRegistry) external onlyOwner {
        jobRegistry = JobRegistry(_jobRegistry);
        emit ContractUpdated("JobRegistry", _jobRegistry);
    }
    
    function setPaymentRegistry(address payable _paymentRegistry) external onlyOwner {
        paymentRegistry = PaymentRegistry(_paymentRegistry);
        emit ContractUpdated("PaymentRegistry", _paymentRegistry);
    }
    
    function setRatingRegistry(address _ratingRegistry) external onlyOwner {
        ratingRegistry = RatingRegistry(_ratingRegistry);
        emit ContractUpdated("RatingRegistry", _ratingRegistry);
    }
    
    function pause() external onlyOwner {
        _pause();
        emit SystemPaused(msg.sender);
    }
    
    function unpause() external onlyOwner {
        _unpause();
        emit SystemUnpaused(msg.sender);
    }
    
    // Emergency Functions
    function emergencyPause() external onlyOwner {
        _pause();
        userRegistry.pause();
        jobRegistry.pause();
        paymentRegistry.pause();
        ratingRegistry.pause();
        emit SystemPaused(msg.sender);
    }
    
    function emergencyUnpause() external onlyOwner {
        _unpause();
        userRegistry.unpause();
        jobRegistry.unpause();
        paymentRegistry.unpause();
        ratingRegistry.unpause();
        emit SystemUnpaused(msg.sender);
    }
    
    // View contract addresses
    function getContractAddresses() external view returns (
        address _userRegistry,
        address _jobRegistry,
        address _paymentRegistry,
        address _ratingRegistry
    ) {
        return (
            address(userRegistry),
            address(jobRegistry),
            address(paymentRegistry),
            address(ratingRegistry)
        );
    }
} 