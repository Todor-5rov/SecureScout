Based on your SecureScout platform design, here are the key smart contract functions you'll need:

## **Core Smart Contract Functions**

### **User Management**

```plaintext
// Register users
function registerScout(string memory displayName, string memory email, string memory location) external
function registerAgent(string memory name, string memory email, string memory serviceType, uint256 priceInPAS, string memory location) external

// User data retrieval
function getScout(address scoutAddress) external view returns (Scout memory)
function getAgent(address agentAddress) external view returns (Agent memory)
function getAllAgents() external view returns (Agent[] memory)
function getAgentsByLocation(string memory location) external view returns (Agent[] memory)
function getAgentsByService(string memory serviceType) external view returns (Agent[] memory)
```

### **Job/Service Request Management**

```plaintext
// Job posting and management
function postJobRequest(string memory title, string memory description, string memory location, uint256 budget, address preferredAgent) external payable
function cancelJobRequest(uint256 jobId) external
function getJobRequest(uint256 jobId) external view returns (JobRequest memory)
function getScoutJobs(address scout) external view returns (uint256[] memory)
function getAgentJobs(address agent) external view returns (uint256[] memory)

// Job application system
function applyForJob(uint256 jobId) external
function acceptAgent(uint256 jobId, address agent) external
function getJobApplications(uint256 jobId) external view returns (address[] memory)
```

### **Escrow & Payment System**

```plaintext
// Payment handling
function depositFunds(uint256 jobId) external payable
function releasePayment(uint256 jobId) external
function refundPayment(uint256 jobId) external
function withdrawEarnings() external

// Payment status
function getEscrowBalance(uint256 jobId) external view returns (uint256)
function getAgentEarnings(address agent) external view returns (uint256)
function getPendingPayments(address agent) external view returns (uint256)
```

### **Job Progress & Completion**

```plaintext
// Job lifecycle
function startJob(uint256 jobId) external
function updateJobProgress(uint256 jobId, uint8 progressPercentage, string memory updateMessage) external
function submitJobCompletion(uint256 jobId, string memory deliverables, string[] memory proofUrls) external
function approveJobCompletion(uint256 jobId) external
function disputeJob(uint256 jobId, string memory reason) external
```

### **Rating & Reputation System**

```plaintext
// Rating system
function rateAgent(uint256 jobId, uint8 rating, string memory review) external
function rateScout(uint256 jobId, uint8 rating, string memory review) external
function getAgentRating(address agent) external view returns (uint256 averageRating, uint256 totalRatings)
function getScoutRating(address scout) external view returns (uint256 averageRating, uint256 totalRatings)
function getJobReviews(uint256 jobId) external view returns (Review[] memory)
```

### **Agent Availability & Status**

```plaintext
// Agent status management
function setAgentAvailability(bool isAvailable) external
function updateAgentPrice(uint256 newPriceInPAS) external
function updateAgentLocation(string memory newLocation) external
function getAvailableAgents() external view returns (Agent[] memory)
```

## **Data Structures You'll Need**

```plaintext
struct Scout {
    address walletAddress;
    string displayName;
    string email;
    string location;
    uint256 totalJobsPosted;
    uint256 totalSpent;
    uint256 averageRating;
    uint256 totalRatings;
    bool isActive;
}

struct Agent {
    address walletAddress;
    string name;
    string email;
    string serviceType;
    uint256 priceInPAS;
    string location;
    uint256 completedJobs;
    uint256 totalEarnings;
    uint256 averageRating;
    uint256 totalRatings;
    bool isAvailable;
    bool isActive;
}

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

struct Review {
    address reviewer;
    address reviewee;
    uint256 jobId;
    uint8 rating;
    string comment;
    uint256 timestamp;
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
```

## **Events for Frontend Integration**

```plaintext
// User events
event ScoutRegistered(address indexed scout, string displayName);
event AgentRegistered(address indexed agent, string name, string serviceType);

// Job events
event JobPosted(uint256 indexed jobId, address indexed scout, uint256 budget);
event JobApplicationSubmitted(uint256 indexed jobId, address indexed agent);
event JobAssigned(uint256 indexed jobId, address indexed agent);
event JobStarted(uint256 indexed jobId);
event JobProgressUpdated(uint256 indexed jobId, uint8 progress);
event JobCompleted(uint256 indexed jobId);
event JobDisputed(uint256 indexed jobId, string reason);

// Payment events
event FundsDeposited(uint256 indexed jobId, uint256 amount);
event PaymentReleased(uint256 indexed jobId, address indexed agent, uint256 amount);
event EarningsWithdrawn(address indexed agent, uint256 amount);

// Rating events
event AgentRated(address indexed agent, uint256 indexed jobId, uint8 rating);
event ScoutRated(address indexed scout, uint256 indexed jobId, uint8 rating);
```

## **Security & Access Control**

```plaintext
// Modifiers for access control
modifier onlyScout(uint256 jobId) { /* check if caller is job scout */ }
modifier onlyAssignedAgent(uint256 jobId) { /* check if caller is assigned agent */ }
modifier onlyActiveJob(uint256 jobId) { /* check if job is active */ }
modifier onlyRegisteredUser() { /* check if user is registered */ }

// Emergency functions
function pauseContract() external onlyOwner
function unpauseContract() external onlyOwner
function emergencyWithdraw(uint256 jobId) external onlyOwner
```

## **Integration Points for Your Frontend**

1. **Registration Flow** - Call register functions when users complete forms
2. **Agent Discovery** - Query agent functions for scout dashboard
3. **Job Management** - Post, track, and manage jobs
4. **Payment Flow** - Handle escrow deposits and releases
5. **Real-time Updates** - Listen to events for dashboard updates
6. **Profile Management** - Update user information and availability


This gives you a complete smart contract foundation that matches your UI design and user flows!