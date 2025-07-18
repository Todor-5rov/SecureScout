// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./UserRegistry.sol";
import "./JobRegistry.sol";

contract RatingRegistry is Ownable, Pausable {
    
    UserRegistry public userRegistry;
    JobRegistry public jobRegistry;
    
    struct Review {
        address reviewer;
        address reviewee;
        uint256 jobId;
        uint8 rating;
        string comment;
        uint256 timestamp;
    }
    
    // Mappings
    mapping(uint256 => Review) public reviews; // jobId => review
    mapping(address => mapping(uint256 => uint256)) public userReviews; // user => index => review jobIds
    mapping(address => uint256) public userReviewCount; // user => number of reviews
    mapping(address => uint256) public userTotalRatings; // user => total rating sum
    mapping(address => uint256) public userRatingCount; // user => number of ratings
    
    // Events
    event AgentRated(address indexed agent, uint256 indexed jobId, uint8 rating);
    event ScoutRated(address indexed scout, uint256 indexed jobId, uint8 rating);
    event ReviewUpdated(uint256 indexed jobId, address indexed reviewer, address indexed reviewee);
    
    constructor(address _userRegistry, address _jobRegistry) Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
        jobRegistry = JobRegistry(_jobRegistry);
    }
    
    modifier onlyCompletedJob(uint256 jobId) {
        // Check if job is completed
        ( , , , , , , , , JobRegistry.JobStatus status, , , , bool isCompleted, bool isPaid) = jobRegistry.jobs(jobId);
        require(status == JobRegistry.JobStatus.Completed, "Job must be completed");
        _;
    }
    
    modifier onlyJobParticipant(uint256 jobId) {
        // Check if caller is either the scout or assigned agent for this job
        ( , address scout, address assignedAgent, , , , , , , , , , , ) = jobRegistry.jobs(jobId);
        require(msg.sender == scout || msg.sender == assignedAgent, "Must be job participant");
        _;
    }
    
    modifier onlyOneReviewPerJob(uint256 jobId, address reviewee) {
        require(reviews[jobId].reviewer == address(0), "Review already exists for this job");
        _;
    }
    
    modifier validRating(uint8 rating) {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        _;
    }
    
    function rateAgent(uint256 jobId, uint8 rating, string memory review) 
        external 
        whenNotPaused 
        onlyCompletedJob(jobId) 
        onlyJobParticipant(jobId) 
        validRating(rating) 
    {
        // Get job details from JobRegistry
        ( , address scout, address agent, , , , , , , , , , , ) = jobRegistry.jobs(jobId);
        
        require(msg.sender == scout, "Only scout can rate agent");
        require(agent != address(0), "Invalid agent address");
        require(reviews[jobId].reviewer == address(0), "Review already exists for this job");
        
        // Create review
        reviews[jobId] = Review({
            reviewer: msg.sender,
            reviewee: agent,
            jobId: jobId,
            rating: rating,
            comment: review,
            timestamp: block.timestamp
        });
        
        // Update user review lists
        userReviews[agent][userReviewCount[agent]] = jobId;
        userReviewCount[agent]++;
        
        // Update agent's rating statistics
        userTotalRatings[agent] += rating;
        userRatingCount[agent]++;
        
        // Update agent's average rating in UserRegistry
        userRegistry.updateAgentRating(agent, rating);
        
        emit AgentRated(agent, jobId, rating);
        emit ReviewUpdated(jobId, msg.sender, agent);
    }
    
    function rateScout(uint256 jobId, uint8 rating, string memory review) 
        external 
        whenNotPaused 
        onlyCompletedJob(jobId) 
        onlyJobParticipant(jobId) 
        validRating(rating) 
    {
        // Get job details from JobRegistry
        ( , address scout, address agent, , , , , , , , , , , ) = jobRegistry.jobs(jobId);
        
        require(msg.sender == agent, "Only agent can rate scout");
        require(scout != address(0), "Invalid scout address");
        require(reviews[jobId].reviewer == address(0), "Review already exists for this job");
        
        // Create review
        reviews[jobId] = Review({
            reviewer: msg.sender,
            reviewee: scout,
            jobId: jobId,
            rating: rating,
            comment: review,
            timestamp: block.timestamp
        });
        
        // Update user review lists
        userReviews[scout][userReviewCount[scout]] = jobId;
        userReviewCount[scout]++;
        
        // Update scout's rating statistics
        userTotalRatings[scout] += rating;
        userRatingCount[scout]++;
        
        // Update scout's average rating in UserRegistry
        userRegistry.updateScoutRating(scout, rating);
        
        emit ScoutRated(scout, jobId, rating);
        emit ReviewUpdated(jobId, msg.sender, scout);
    }
    
    // View functions
    function getAgentRating(address agent) external view returns (uint256 averageRating, uint256 totalRatings) {
        totalRatings = userRatingCount[agent];
        if (totalRatings > 0) {
            averageRating = userTotalRatings[agent] / totalRatings;
        } else {
            averageRating = 0;
        }
    }
    
    function getScoutRating(address scout) external view returns (uint256 averageRating, uint256 totalRatings) {
        totalRatings = userRatingCount[scout];
        if (totalRatings > 0) {
            averageRating = userTotalRatings[scout] / totalRatings;
        } else {
            averageRating = 0;
        }
    }
    
    function getJobReviews(uint256 jobId) external view returns (Review memory) {
        return reviews[jobId];
    }
    
    // Paginated function to avoid gas issues
    function getUserReviewsPaginated(address user, uint256 startIndex, uint256 count) external view returns (uint256[] memory reviewJobIds, uint256 totalCount) {
        uint256 totalReviews = userReviewCount[user];
        require(startIndex < totalReviews, "Start index out of bounds");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > totalReviews) {
            endIndex = totalReviews;
        }
        
        uint256 actualCount = endIndex - startIndex;
        reviewJobIds = new uint256[](actualCount);
        
        for (uint256 i = 0; i < actualCount; i++) {
            reviewJobIds[i] = userReviews[user][startIndex + i];
        }
        
        totalCount = totalReviews;
    }
    
    function getReview(uint256 jobId) external view returns (Review memory) {
        return reviews[jobId];
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
    
    function setJobRegistry(address _jobRegistry) external onlyOwner {
        jobRegistry = JobRegistry(_jobRegistry);
    }
    
    // Emergency functions for data correction
    function updateReview(uint256 jobId, uint8 newRating, string memory newComment) external onlyOwner {
        require(reviews[jobId].reviewer != address(0), "Review does not exist");
        
        Review storage review = reviews[jobId];
        uint8 oldRating = review.rating;
        
        // Update rating statistics
        userTotalRatings[review.reviewee] = userTotalRatings[review.reviewee] - oldRating + newRating;
        
        // Update review
        review.rating = newRating;
        review.comment = newComment;
        review.timestamp = block.timestamp;
        
        // Recalculate average rating in UserRegistry
        uint256 totalRatings = userRatingCount[review.reviewee];
        uint256 averageRating = userTotalRatings[review.reviewee] / totalRatings;
        
        // This would need a function in UserRegistry to update the average directly
        // userRegistry.updateUserAverageRating(review.reviewee, averageRating);
        
        emit ReviewUpdated(jobId, review.reviewer, review.reviewee);
    }
} 