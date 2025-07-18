# SecureScout Smart Contracts

## Overview

SecureScout is a decentralized platform that connects scouts (job posters) with agents (service providers) for various tasks and services. The platform includes user management, job posting, payment processing, and rating systems.

## Recent Fixes (v2.0)

### Problem Solved

The contracts were experiencing "contract trapped" errors on PolkadotVM due to:

1. **Dynamic arrays in storage** (`address[]`, `uint256[]`) that grow with `.push()`
2. **Complex struct returns** with dynamic arrays
3. **Gas-intensive operations** that exceed PolkadotVM limits

### Solution Implemented

1. **Replaced dynamic arrays with mappings**: `address[]` → `mapping(uint256 => address)`
2. **Added pagination**: All list functions now support pagination to avoid gas issues
3. **Split complex struct returns**: Large structs are now returned as individual fields
4. **Optimized storage patterns**: More gas-efficient data structures

## Contract Architecture

### Core Contracts

#### 1. UserRegistry

Manages user registration and profiles for both scouts and agents.

**Key Changes:**

- `scoutAddresses[]` → `mapping(uint256 => address) scoutAddresses`
- `agentAddresses[]` → `mapping(uint256 => address) agentAddresses`
- `getAllAgents()` → `getAgentsPaginated(startIndex, count)`
- `getAgentsByLocation()` now returns `address[]` instead of `Agent[]`

**New Functions:**

```solidity
function getAgentsPaginated(uint256 startIndex, uint256 count)
    external view returns (address[] memory agentAddresses, uint256 totalCount)

function getAgentAtIndex(uint256 index)
    external view returns (Agent memory)
```

#### 2. JobRegistry

Handles job posting, applications, and job lifecycle management.

**Key Changes:**

- `jobApplications[]` → `mapping(uint256 => mapping(uint256 => address))`
- `scoutJobs[]` → `mapping(address => mapping(uint256 => uint256))`
- `agentJobs[]` → `mapping(address => mapping(uint256 => uint256))`
- `getJobRequest()` → `getJobBasicInfo()` + `getJobProofUrls()`

**New Functions:**

```solidity
function getJobBasicInfo(uint256 jobId) external view returns (
    uint256 _jobId, address _scout, address _assignedAgent,
    string memory _title, string memory _description, string memory _location,
    uint256 _budget, uint256 _escrowAmount, JobStatus _status,
    uint8 _progress, uint256 _createdAt, uint256 _deadline,
    bool _isCompleted, bool _isPaid
)

function getScoutJobsPaginated(address scout, uint256 startIndex, uint256 count)
    external view returns (uint256[] memory jobIds, uint256 totalCount)

function getAgentJobsPaginated(address agent, uint256 startIndex, uint256 count)
    external view returns (uint256[] memory jobIds, uint256 totalCount)

function getJobApplicationsPaginated(uint256 jobId, uint256 startIndex, uint256 count)
    external view returns (address[] memory applications, uint256 totalCount)
```

#### 3. PaymentRegistry

Manages escrow, payments, and fee collection.

**No major changes** - this contract was already optimized.

#### 4. RatingRegistry

Handles user ratings and reviews.

**Key Changes:**

- `userReviews[]` → `mapping(address => mapping(uint256 => uint256))`
- `getUserReviews()` → `getUserReviewsPaginated()`

**New Functions:**

```solidity
function getUserReviewsPaginated(address user, uint256 startIndex, uint256 count)
    external view returns (uint256[] memory reviewJobIds, uint256 totalCount)
```

#### 5. SecureScoutHub

Main interface contract that provides unified access to all functionality.

**Updated Functions:**

- All list functions now use pagination
- Job data is split into basic info and proof URLs
- Agent lists return addresses instead of full structs

## Migration Guide

### Frontend Integration

#### Before (v1.0):

```javascript
// Get all agents
const agents = await contract.getAllAgents();

// Get job details
const job = await contract.getJobRequest(jobId);

// Get user jobs
const jobs = await contract.getScoutJobs(userAddress);
```

#### After (v2.0):

```javascript
// Get agents with pagination
const [agentAddresses, totalCount] = await contract.getAgentsPaginated(0, 10);
const agents = [];
for (let i = 0; i < agentAddresses.length; i++) {
  const agent = await contract.getAgentAtIndex(i);
  agents.push(agent);
}

// Get job details (split)
const jobInfo = await contract.getJobBasicInfo(jobId);
const proofUrls = await contract.getJobProofUrls(jobId);

// Get user jobs with pagination
const [jobIds, totalJobs] = await contract.getScoutJobsPaginated(
  userAddress,
  0,
  10
);
```

### Backend Integration

#### Pagination Pattern:

```javascript
async function getAllAgents(contract, batchSize = 50) {
  const agents = [];
  let startIndex = 0;
  let hasMore = true;

  while (hasMore) {
    const [agentAddresses, totalCount] = await contract.getAgentsPaginated(
      startIndex,
      batchSize
    );

    for (const address of agentAddresses) {
      const agent = await contract.getAgent(address);
      agents.push(agent);
    }

    startIndex += batchSize;
    hasMore = startIndex < totalCount;
  }

  return agents;
}
```

## Deployment

### Prerequisites

- Node.js 16+
- Hardhat
- PolkadotVM compatible environment

### Steps

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Deploy contracts:

```bash
npx hardhat run deploy.js --network <your-network>
```

### Contract Addresses

After deployment, you'll get addresses for:

- UserRegistry
- JobRegistry
- PaymentRegistry
- RatingRegistry
- SecureScoutHub (main interface)

## Gas Optimization

### Key Improvements

1. **Storage Efficiency**: Mappings instead of dynamic arrays
2. **Pagination**: Avoid loading large datasets at once
3. **Split Returns**: Smaller, focused function returns
4. **Batch Operations**: Process data in manageable chunks

### Gas Usage Comparison

- **v1.0**: `getAllAgents()` - O(n) gas complexity
- **v2.0**: `getAgentsPaginated()` - O(batch_size) gas complexity

## Testing

### Unit Tests

```bash
npx hardhat test
```

### Integration Tests

```bash
npx hardhat test --grep "Integration"
```

### Gas Tests

```bash
npx hardhat test --grep "Gas"
```

## Security Considerations

### Access Control

- All contracts use OpenZeppelin's `Ownable` pattern
- Pausable functionality for emergency stops
- Role-based permissions removed in favor of direct function calls

### Reentrancy Protection

- PaymentRegistry uses `ReentrancyGuard`
- External calls are made last in functions

### Input Validation

- String length checks
- Address validation
- Numeric range validation

## Troubleshooting

### Common Issues

1. **"Contract trapped" error**

   - Ensure you're using paginated functions for large datasets
   - Check gas limits in your deployment environment

2. **Function not found**

   - Verify you're using the new function names
   - Check contract addresses are correctly set

3. **Gas limit exceeded**
   - Reduce batch sizes in pagination
   - Use individual getter functions instead of bulk operations

### Support

For issues related to the contract fixes, check:

1. Function signatures match the new API
2. Pagination parameters are within bounds
3. Contract addresses are correctly configured

## Future Improvements

### Planned Enhancements

1. **Indexed Events**: Better event filtering
2. **Batch Operations**: Multi-call functions
3. **Upgradeable Contracts**: Proxy pattern implementation
4. **Cross-chain Integration**: Multi-chain support

### Performance Optimizations

1. **Storage Packing**: Optimize struct layouts
2. **Event Optimization**: Reduce event gas costs
3. **Function Batching**: Combine related operations
