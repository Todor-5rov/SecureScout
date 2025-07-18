//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SecureScoutSetupModule#JobRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const secureScoutSetupModuleJobRegistryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'JobApplicationSubmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'JobAssigned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'JobCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'JobCompleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'reason',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'JobDisputed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'scout',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'budget',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'JobPosted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'progress',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'JobProgressUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'JobStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'agent', internalType: 'address', type: 'address' },
    ],
    name: 'acceptAgent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'agentJobCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'agentJobs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'applyForJob',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'approveJobCompletion',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelJobRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'reason', internalType: 'string', type: 'string' },
    ],
    name: 'disputeJob',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'agent', internalType: 'address', type: 'address' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAgentJobsPaginated',
    outputs: [
      { name: 'jobIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getJobApplicationsPaginated',
    outputs: [
      { name: 'applications', internalType: 'address[]', type: 'address[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobBasicInfo',
    outputs: [
      { name: '_jobId', internalType: 'uint256', type: 'uint256' },
      { name: '_scout', internalType: 'address', type: 'address' },
      { name: '_assignedAgent', internalType: 'address', type: 'address' },
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_budget', internalType: 'uint256', type: 'uint256' },
      { name: '_escrowAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: '_status',
        internalType: 'enum JobRegistry.JobStatus',
        type: 'uint8',
      },
      { name: '_progress', internalType: 'uint8', type: 'uint8' },
      { name: '_createdAt', internalType: 'uint256', type: 'uint256' },
      { name: '_deadline', internalType: 'uint256', type: 'uint256' },
      { name: '_isCompleted', internalType: 'bool', type: 'bool' },
      { name: '_isPaid', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobBasicInfoPart1',
    outputs: [
      { name: '_jobId', internalType: 'uint256', type: 'uint256' },
      { name: '_scout', internalType: 'address', type: 'address' },
      { name: '_assignedAgent', internalType: 'address', type: 'address' },
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobBasicInfoPart2',
    outputs: [
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_budget', internalType: 'uint256', type: 'uint256' },
      { name: '_escrowAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: '_status',
        internalType: 'enum JobRegistry.JobStatus',
        type: 'uint8',
      },
      { name: '_progress', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobBasicInfoPart3',
    outputs: [
      { name: '_createdAt', internalType: 'uint256', type: 'uint256' },
      { name: '_deadline', internalType: 'uint256', type: 'uint256' },
      { name: '_isCompleted', internalType: 'bool', type: 'bool' },
      { name: '_isPaid', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobProofUrls',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'scout', internalType: 'address', type: 'address' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getScoutJobsPaginated',
    outputs: [
      { name: 'jobIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasApplied',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'jobApplicationCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'jobApplications',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'jobs',
    outputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'scout', internalType: 'address', type: 'address' },
      { name: 'assignedAgent', internalType: 'address', type: 'address' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
      { name: 'budget', internalType: 'uint256', type: 'uint256' },
      { name: 'escrowAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'status',
        internalType: 'enum JobRegistry.JobStatus',
        type: 'uint8',
      },
      { name: 'progress', internalType: 'uint8', type: 'uint8' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'isCompleted', internalType: 'bool', type: 'bool' },
      { name: 'isPaid', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextJobId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
      { name: 'budget', internalType: 'uint256', type: 'uint256' },
      { name: 'preferredAgent', internalType: 'address', type: 'address' },
    ],
    name: 'postJobRequest',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'scoutJobCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'scoutJobs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setUserRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'startJob',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'deliverables', internalType: 'string', type: 'string' },
      { name: 'proofUrls', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'submitJobCompletion',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'progressPercentage', internalType: 'uint8', type: 'uint8' },
      { name: 'updateMessage', internalType: 'string', type: 'string' },
    ],
    name: 'updateJobProgress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'userRegistry',
    outputs: [
      { name: '', internalType: 'contract UserRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const secureScoutSetupModuleJobRegistryAddress = {
  420420422: '0x3b7d086bEE7f87334d09a9d446Ff04875e46a4c1',
} as const

/**
 *
 */
export const secureScoutSetupModuleJobRegistryConfig = {
  address: secureScoutSetupModuleJobRegistryAddress,
  abi: secureScoutSetupModuleJobRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SecureScoutSetupModule#PaymentRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const secureScoutSetupModulePaymentRegistryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'EarningsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FundsDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'scout',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PaymentRefunded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PaymentReleased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PlatformFeeCollected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'agentEarnings',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'depositFunds',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'escrowBalances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'agent', internalType: 'address', type: 'address' }],
    name: 'getAgentEarnings',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getEscrowBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'agent', internalType: 'address', type: 'address' }],
    name: 'getPendingPayments',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPlatformFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'jobRegistry',
    outputs: [
      { name: '', internalType: 'contract JobRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'paymentsReleased',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'pendingPayments',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'platformFeeBps',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'platformFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'refundPayment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'releasePayment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setJobRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newFeeBps', internalType: 'uint256', type: 'uint256' }],
    name: 'setPlatformFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setUserRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'userRegistry',
    outputs: [
      { name: '', internalType: 'contract UserRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawEarnings',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawPlatformFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 *
 */
export const secureScoutSetupModulePaymentRegistryAddress = {
  420420422: '0xA1491dCC11A232A4303aD3893296Edfdd7e4Abdb',
} as const

/**
 *
 */
export const secureScoutSetupModulePaymentRegistryConfig = {
  address: secureScoutSetupModulePaymentRegistryAddress,
  abi: secureScoutSetupModulePaymentRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SecureScoutSetupModule#RatingRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const secureScoutSetupModuleRatingRegistryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'rating', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'AgentRated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'reviewer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'reviewee',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ReviewUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'scout',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'jobId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'rating', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'ScoutRated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [{ name: 'agent', internalType: 'address', type: 'address' }],
    name: 'getAgentRating',
    outputs: [
      { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobReviews',
    outputs: [
      {
        name: '',
        internalType: 'struct RatingRegistry.Review',
        type: 'tuple',
        components: [
          { name: 'reviewer', internalType: 'address', type: 'address' },
          { name: 'reviewee', internalType: 'address', type: 'address' },
          { name: 'jobId', internalType: 'uint256', type: 'uint256' },
          { name: 'rating', internalType: 'uint8', type: 'uint8' },
          { name: 'comment', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getReview',
    outputs: [
      {
        name: '',
        internalType: 'struct RatingRegistry.Review',
        type: 'tuple',
        components: [
          { name: 'reviewer', internalType: 'address', type: 'address' },
          { name: 'reviewee', internalType: 'address', type: 'address' },
          { name: 'jobId', internalType: 'uint256', type: 'uint256' },
          { name: 'rating', internalType: 'uint8', type: 'uint8' },
          { name: 'comment', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'scout', internalType: 'address', type: 'address' }],
    name: 'getScoutRating',
    outputs: [
      { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserReviewsPaginated',
    outputs: [
      { name: 'reviewJobIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'jobRegistry',
    outputs: [
      { name: '', internalType: 'contract JobRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
      { name: 'review', internalType: 'string', type: 'string' },
    ],
    name: 'rateAgent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
      { name: 'review', internalType: 'string', type: 'string' },
    ],
    name: 'rateScout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'reviews',
    outputs: [
      { name: 'reviewer', internalType: 'address', type: 'address' },
      { name: 'reviewee', internalType: 'address', type: 'address' },
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
      { name: 'comment', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setJobRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setUserRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'newRating', internalType: 'uint8', type: 'uint8' },
      { name: 'newComment', internalType: 'string', type: 'string' },
    ],
    name: 'updateReview',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRatingCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'userRegistry',
    outputs: [
      { name: '', internalType: 'contract UserRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userReviewCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userReviews',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userTotalRatings',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

/**
 *
 */
export const secureScoutSetupModuleRatingRegistryAddress = {
  420420422: '0x7f08C64559D41d8266e51C7dDFbcc886415BA5fE',
} as const

/**
 *
 */
export const secureScoutSetupModuleRatingRegistryConfig = {
  address: secureScoutSetupModuleRatingRegistryAddress,
  abi: secureScoutSetupModuleRatingRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SecureScoutSetupModule#SecureScoutHub
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const secureScoutSetupModuleSecureScoutHubAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
      {
        name: '_paymentRegistry',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_ratingRegistry', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'contractName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'newAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'by', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'SystemPaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'by', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'SystemUnpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'agent', internalType: 'address', type: 'address' },
    ],
    name: 'acceptAgent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'applyForJob',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'approveJobCompletion',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelJobRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'reason', internalType: 'string', type: 'string' },
    ],
    name: 'disputeJob',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'emergencyPause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'emergencyUnpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'agentAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getAgent',
    outputs: [
      {
        name: '',
        internalType: 'struct UserRegistry.Agent',
        type: 'tuple',
        components: [
          { name: 'walletAddress', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'email', internalType: 'string', type: 'string' },
          { name: 'serviceType', internalType: 'string', type: 'string' },
          { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'completedJobs', internalType: 'uint256', type: 'uint256' },
          { name: 'totalEarnings', internalType: 'uint256', type: 'uint256' },
          { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
          { name: 'isAvailable', internalType: 'bool', type: 'bool' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getAgentAtIndex',
    outputs: [
      {
        name: '',
        internalType: 'struct UserRegistry.Agent',
        type: 'tuple',
        components: [
          { name: 'walletAddress', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'email', internalType: 'string', type: 'string' },
          { name: 'serviceType', internalType: 'string', type: 'string' },
          { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'completedJobs', internalType: 'uint256', type: 'uint256' },
          { name: 'totalEarnings', internalType: 'uint256', type: 'uint256' },
          { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
          { name: 'isAvailable', internalType: 'bool', type: 'bool' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'agent', internalType: 'address', type: 'address' }],
    name: 'getAgentEarnings',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'agent', internalType: 'address', type: 'address' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAgentJobsPaginated',
    outputs: [
      { name: 'jobIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'agent', internalType: 'address', type: 'address' }],
    name: 'getAgentRating',
    outputs: [
      { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'location', internalType: 'string', type: 'string' }],
    name: 'getAgentsByLocation',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'serviceType', internalType: 'string', type: 'string' }],
    name: 'getAgentsByService',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAgentsPaginated',
    outputs: [
      { name: 'agentAddresses', internalType: 'address[]', type: 'address[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAvailableAgents',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getContractAddresses',
    outputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
      { name: '_paymentRegistry', internalType: 'address', type: 'address' },
      { name: '_ratingRegistry', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getEscrowBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getJobApplicationsPaginated',
    outputs: [
      { name: 'applications', internalType: 'address[]', type: 'address[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobBasicInfo',
    outputs: [
      { name: '_jobId', internalType: 'uint256', type: 'uint256' },
      { name: '_scout', internalType: 'address', type: 'address' },
      { name: '_assignedAgent', internalType: 'address', type: 'address' },
      { name: '_title', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_budget', internalType: 'uint256', type: 'uint256' },
      { name: '_escrowAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: '_status',
        internalType: 'enum JobRegistry.JobStatus',
        type: 'uint8',
      },
      { name: '_progress', internalType: 'uint8', type: 'uint8' },
      { name: '_createdAt', internalType: 'uint256', type: 'uint256' },
      { name: '_deadline', internalType: 'uint256', type: 'uint256' },
      { name: '_isCompleted', internalType: 'bool', type: 'bool' },
      { name: '_isPaid', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobProofUrls',
    outputs: [{ name: '', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'getJobReviews',
    outputs: [
      {
        name: '',
        internalType: 'struct RatingRegistry.Review',
        type: 'tuple',
        components: [
          { name: 'reviewer', internalType: 'address', type: 'address' },
          { name: 'reviewee', internalType: 'address', type: 'address' },
          { name: 'jobId', internalType: 'uint256', type: 'uint256' },
          { name: 'rating', internalType: 'uint8', type: 'uint8' },
          { name: 'comment', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'agent', internalType: 'address', type: 'address' }],
    name: 'getPendingPayments',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'scoutAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getScout',
    outputs: [
      {
        name: '',
        internalType: 'struct UserRegistry.Scout',
        type: 'tuple',
        components: [
          { name: 'walletAddress', internalType: 'address', type: 'address' },
          { name: 'displayName', internalType: 'string', type: 'string' },
          { name: 'email', internalType: 'string', type: 'string' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'totalJobsPosted', internalType: 'uint256', type: 'uint256' },
          { name: 'totalSpent', internalType: 'uint256', type: 'uint256' },
          { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'scout', internalType: 'address', type: 'address' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getScoutJobsPaginated',
    outputs: [
      { name: 'jobIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'scout', internalType: 'address', type: 'address' }],
    name: 'getScoutRating',
    outputs: [
      { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserReviewsPaginated',
    outputs: [
      { name: 'reviewJobIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'jobRegistry',
    outputs: [
      { name: '', internalType: 'contract JobRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paymentRegistry',
    outputs: [
      { name: '', internalType: 'contract PaymentRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
      { name: 'budget', internalType: 'uint256', type: 'uint256' },
      { name: 'preferredAgent', internalType: 'address', type: 'address' },
    ],
    name: 'postJobRequest',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
      { name: 'review', internalType: 'string', type: 'string' },
    ],
    name: 'rateAgent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
      { name: 'review', internalType: 'string', type: 'string' },
    ],
    name: 'rateScout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ratingRegistry',
    outputs: [
      { name: '', internalType: 'contract RatingRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'serviceType', internalType: 'string', type: 'string' },
      { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
      { name: 'location', internalType: 'string', type: 'string' },
    ],
    name: 'registerAgent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'displayName', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
    ],
    name: 'registerScout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'isAvailable', internalType: 'bool', type: 'bool' }],
    name: 'setAgentAvailability',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_jobRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setJobRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_paymentRegistry',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    name: 'setPaymentRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_ratingRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setRatingRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_userRegistry', internalType: 'address', type: 'address' },
    ],
    name: 'setUserRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'jobId', internalType: 'uint256', type: 'uint256' }],
    name: 'startJob',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'deliverables', internalType: 'string', type: 'string' },
      { name: 'proofUrls', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'submitJobCompletion',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newLocation', internalType: 'string', type: 'string' }],
    name: 'updateAgentLocation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newPriceInPAS', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateAgentPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'jobId', internalType: 'uint256', type: 'uint256' },
      { name: 'progressPercentage', internalType: 'uint8', type: 'uint8' },
      { name: 'updateMessage', internalType: 'string', type: 'string' },
    ],
    name: 'updateJobProgress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'userRegistry',
    outputs: [
      { name: '', internalType: 'contract UserRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawEarnings',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const secureScoutSetupModuleSecureScoutHubAddress = {
  420420422: '0xCEb470b63467Aa6900014835d6db8eD59eC9809e',
} as const

/**
 *
 */
export const secureScoutSetupModuleSecureScoutHubConfig = {
  address: secureScoutSetupModuleSecureScoutHubAddress,
  abi: secureScoutSetupModuleSecureScoutHubAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SecureScoutSetupModule#UserRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const secureScoutSetupModuleUserRegistryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'serviceType',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'AgentRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'agent',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AgentUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'scout',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'displayName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ScoutRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'scout',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ScoutUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'agentAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'agentCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'agents',
    outputs: [
      { name: 'walletAddress', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'serviceType', internalType: 'string', type: 'string' },
      { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
      { name: 'location', internalType: 'string', type: 'string' },
      { name: 'completedJobs', internalType: 'uint256', type: 'uint256' },
      { name: 'totalEarnings', internalType: 'uint256', type: 'uint256' },
      { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
      { name: 'isAvailable', internalType: 'bool', type: 'bool' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'agentAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getAgent',
    outputs: [
      {
        name: '',
        internalType: 'struct UserRegistry.Agent',
        type: 'tuple',
        components: [
          { name: 'walletAddress', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'email', internalType: 'string', type: 'string' },
          { name: 'serviceType', internalType: 'string', type: 'string' },
          { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'completedJobs', internalType: 'uint256', type: 'uint256' },
          { name: 'totalEarnings', internalType: 'uint256', type: 'uint256' },
          { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
          { name: 'isAvailable', internalType: 'bool', type: 'bool' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getAgentAtIndex',
    outputs: [
      {
        name: '',
        internalType: 'struct UserRegistry.Agent',
        type: 'tuple',
        components: [
          { name: 'walletAddress', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'email', internalType: 'string', type: 'string' },
          { name: 'serviceType', internalType: 'string', type: 'string' },
          { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'completedJobs', internalType: 'uint256', type: 'uint256' },
          { name: 'totalEarnings', internalType: 'uint256', type: 'uint256' },
          { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
          { name: 'isAvailable', internalType: 'bool', type: 'bool' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'location', internalType: 'string', type: 'string' }],
    name: 'getAgentsByLocation',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'serviceType', internalType: 'string', type: 'string' }],
    name: 'getAgentsByService',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAgentsPaginated',
    outputs: [
      { name: 'agentAddresses', internalType: 'address[]', type: 'address[]' },
      { name: 'totalCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAvailableAgents',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'scoutAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getScout',
    outputs: [
      {
        name: '',
        internalType: 'struct UserRegistry.Scout',
        type: 'tuple',
        components: [
          { name: 'walletAddress', internalType: 'address', type: 'address' },
          { name: 'displayName', internalType: 'string', type: 'string' },
          { name: 'email', internalType: 'string', type: 'string' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'totalJobsPosted', internalType: 'uint256', type: 'uint256' },
          { name: 'totalSpent', internalType: 'uint256', type: 'uint256' },
          { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
          { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'agent', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'incrementAgentEarnings',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'scout', internalType: 'address', type: 'address' }],
    name: 'incrementScoutJobs',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'serviceType', internalType: 'string', type: 'string' },
      { name: 'priceInPAS', internalType: 'uint256', type: 'uint256' },
      { name: 'location', internalType: 'string', type: 'string' },
    ],
    name: 'registerAgent',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'displayName', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
    ],
    name: 'registerScout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'registeredAgents',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'registeredScouts',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'scoutAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'scoutCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'scouts',
    outputs: [
      { name: 'walletAddress', internalType: 'address', type: 'address' },
      { name: 'displayName', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'location', internalType: 'string', type: 'string' },
      { name: 'totalJobsPosted', internalType: 'uint256', type: 'uint256' },
      { name: 'totalSpent', internalType: 'uint256', type: 'uint256' },
      { name: 'averageRating', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRatings', internalType: 'uint256', type: 'uint256' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'isAvailable', internalType: 'bool', type: 'bool' }],
    name: 'setAgentAvailability',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newLocation', internalType: 'string', type: 'string' }],
    name: 'updateAgentLocation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newPriceInPAS', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateAgentPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'agent', internalType: 'address', type: 'address' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'updateAgentRating',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'scout', internalType: 'address', type: 'address' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'updateScoutRating',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 *
 */
export const secureScoutSetupModuleUserRegistryAddress = {
  420420422: '0x858901110CC332006Da3b0ad5e782770c04F4fd1',
} as const

/**
 *
 */
export const secureScoutSetupModuleUserRegistryConfig = {
  address: secureScoutSetupModuleUserRegistryAddress,
  abi: secureScoutSetupModuleUserRegistryAbi,
} as const
