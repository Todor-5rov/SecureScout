# SecureScout 🔒

A decentralized platform connecting trusted security professionals with clients worldwide through blockchain-powered escrow and smart contracts. Built for the Polkadot ecosystem on Passet Hub network.

## 🎯 Project Overview

SecureScout is a Web3 marketplace that revolutionizes how security professionals and clients connect. It eliminates traditional intermediaries by using smart contracts for secure escrow, transparent job management, and trustless payments.

### Key Features

- **Decentralized Marketplace**: Direct peer-to-peer connections between security professionals and clients
- **Smart Contract Escrow**: Secure payment handling with automated release upon job completion
- **Reputation System**: Transparent rating and review system for both parties
- **Job Lifecycle Management**: Complete workflow from job posting to completion
- **Location-Based Matching**: Find security experts in specific geographic areas
- **Real-time Progress Tracking**: Monitor job progress with blockchain-verified updates

## 🏗️ Architecture

### Smart Contract System

The platform consists of five main smart contracts deployed on Passet Hub:

#### 1. **SecureScoutHub** (Main Contract)

The central hub that orchestrates all interactions between users and other contracts.

**Key Functions:**

- User registration (Scouts and Agents)
- Job posting and management
- Payment processing
- Rating and review system
- Contract administration

#### 2. **UserRegistry**

Manages user profiles and authentication for both Scouts (clients) and Agents (security professionals).

**User Types:**

- **Scouts**: Clients who post security job requests
- **Agents**: Security professionals who provide services

**Profile Data:**

- Personal information (name, email, location)
- Service details (for agents: service type, pricing)
- Performance metrics (completed jobs, ratings, earnings)
- Availability status

#### 3. **JobRegistry**

Handles the complete job lifecycle from posting to completion.

**Job States:**

1. **Posted**: Job is available for applications
2. **Applied**: Agents have applied for the job
3. **Assigned**: An agent has been selected
4. **InProgress**: Work has begun
5. **Submitted**: Agent has submitted deliverables
6. **Completed**: Job is finished and payment released
7. **Disputed**: Job has issues requiring resolution
8. **Cancelled**: Job was cancelled

**Key Features:**

- Escrow-based payment system
- Progress tracking with blockchain verification
- Dispute resolution mechanism
- Automated payment release upon completion

#### 4. **PaymentRegistry**

Manages all financial transactions and escrow accounts.

**Functions:**

- Escrow fund management
- Payment release upon job completion
- Refund processing for cancelled jobs
- Earnings tracking for agents
- Withdrawal functionality

#### 5. **RatingRegistry**

Implements a transparent reputation system.

**Features:**

- Bidirectional rating (Scouts rate Agents, Agents rate Scouts)
- Review system with detailed feedback
- Average rating calculations
- Reputation history tracking

### Frontend Application

Built with React, TypeScript, and Tailwind CSS, the frontend provides an intuitive interface for all platform interactions.

#### Key Pages:

- **Landing Page**: Platform overview and wallet connection
- **Role Selection**: Choose between Scout (client) or Agent (professional)
- **Registration**: User profile creation for both roles
- **Scout Dashboard**: Job posting and management for clients
- **Agent Dashboard**: Job applications and service management for professionals
- **Agent Explorer**: Browse available security professionals

#### Technology Stack:

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Wagmi** for Web3 interactions
- **React Router** for navigation
- **Lucide React** for icons

## 🚀 Smart Contract Workflow

### For Scouts (Clients):

1. **Registration**: Create profile with name, email, and location
2. **Job Posting**: Submit security job with title, description, location, and budget
3. **Agent Selection**: Review applications and select preferred agent
4. **Progress Monitoring**: Track job progress through blockchain updates
5. **Completion Review**: Review deliverables and approve completion
6. **Payment Release**: Automatically release escrow funds to agent
7. **Rating**: Rate agent performance and leave review

### For Agents (Security Professionals):

1. **Registration**: Create profile with service type, pricing, and location
2. **Job Discovery**: Browse available security jobs
3. **Application**: Apply for jobs that match expertise
4. **Job Execution**: Complete assigned security tasks
5. **Progress Updates**: Submit regular progress updates
6. **Deliverable Submission**: Submit final deliverables and proof
7. **Payment Receipt**: Receive payment upon client approval
8. **Client Rating**: Rate client experience

## 🔐 Security Features

### Smart Contract Security:

- **OpenZeppelin Contracts**: Industry-standard security libraries
- **Pausable Functionality**: Emergency pause capability for critical issues
- **Access Control**: Role-based permissions and ownership controls
- **Reentrancy Protection**: Prevents common attack vectors
- **Input Validation**: Comprehensive parameter validation

### Escrow System:

- **Fund Locking**: Client funds locked in smart contract until completion
- **Automated Release**: Payment automatically released upon job approval
- **Refund Protection**: Automatic refunds for cancelled jobs
- **Dispute Handling**: Structured process for resolving conflicts

## 🛠️ Development Setup

This project was bootstrapped using the [create-polkadot-dapp](https://github.com/paritytech/create-polkadot-dapp) template, which provides a complete development environment for Polkadot dApps.

### Prerequisites:

- Node.js 18+
- npm or yarn
- MetaMask wallet with Passet Hub network configured
- PAS tokens for gas fees

### Quick Start:

```bash
# Create a new project using the template
npx create-polkadot-dapp@latest

# Or clone this repository
git clone <repository-url>
cd SecureScout
```

### Smart Contract Development:

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

### Frontend Development:

```bash
cd frontend
npm install
npm run dev
```

### Environment Configuration:

1. Set up MetaMask for Passet Hub network
2. Configure private key in contracts directory:
   ```bash
   npx hardhat vars set PRIVATE_KEY "YOUR_PRIVATE_KEY"
   ```
3. Deploy contracts:
   ```bash
   npx hardhat ignition deploy ./ignition/modules/SecureScoutHubModule.ts --network polkadotHubTestnet
   ```

## 🎨 Demo Mode

For hackathon demonstrations, the frontend includes a demo mode with:

- **Mock Data**: Pre-populated agent profiles and job listings
- **Simulated Interactions**: UI demonstrations without actual blockchain transactions
- **Visual Workflows**: Complete user journey demonstrations
- **Responsive Design**: Mobile-first interface for all devices

## 🌐 Network Information

- **Network**: Passet Hub (Polkadot testnet)
- **Currency**: PAS (Passet tokens)
- **Block Time**: ~12 seconds
- **Gas Model**: Weight-based (Polkadot standard)

## 📊 Performance Optimizations

### Smart Contract Optimizations:

- **Pagination**: Large data sets handled through paginated queries
- **Gas Efficiency**: Optimized storage patterns and function calls
- **Batch Operations**: Efficient handling of multiple operations
- **Event Logging**: Minimal on-chain data storage with event-based history

### Frontend Optimizations:

- **Lazy Loading**: Components loaded on demand
- **Caching**: Smart contract data caching
- **Responsive Design**: Optimized for all device sizes
- **Progressive Enhancement**: Core functionality without JavaScript

## 🔮 Future Enhancements

### Planned Features:

- **Multi-chain Support**: Expansion to other Polkadot parachains
- **Advanced Matching**: AI-powered agent-client matching
- **Insurance Integration**: DeFi insurance for high-value jobs
- **Mobile App**: Native mobile application
- **API Access**: Public API for third-party integrations
- **Governance**: DAO-based platform governance

### Technical Improvements:

- **Layer 2 Scaling**: Integration with Polkadot parachains for scaling
- **Zero-Knowledge Proofs**: Privacy-preserving reputation system
- **Cross-chain Bridges**: Interoperability with other blockchains
- **Advanced Analytics**: Platform usage and performance metrics

## 🤝 Contributing

This is a hackathon project demonstrating Web3 security marketplace concepts. Contributions are welcome for:

- Bug fixes and improvements
- Feature enhancements
- Documentation updates
- Security audits

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Polkadot ecosystem for blockchain infrastructure
- Hardhat team for development tooling
- Wagmi for Web3 React hooks
- Tailwind CSS for styling framework

---

**Built with ❤️ for the Web3 security community**
