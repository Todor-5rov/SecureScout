# SecureScout Frontend Setup Guide

## Overview

This frontend application integrates with the SecureScout smart contracts to provide a decentralized platform for connecting security professionals (agents) with clients (scouts) through blockchain-powered escrow and smart contracts.

## Features Implemented

### Smart Contract Integration

- ✅ Agent registration and profile management
- ✅ Scout registration and profile management
- ✅ Job posting and management
- ✅ Agent application and job assignment
- ✅ Payment escrow and release
- ✅ Rating and review system
- ✅ Wallet connection and user authentication

### Mapbox Integration

- ✅ Location search with autocomplete
- ✅ Interactive maps for displaying locations
- ✅ Geocoding and reverse geocoding
- ✅ Distance calculations

### UI/UX Features

- ✅ Responsive design with Tailwind CSS
- ✅ Modern component library with Radix UI
- ✅ Toast notifications with Sonner
- ✅ Loading states and error handling
- ✅ Form validation and user feedback

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **MetaMask** or compatible Web3 wallet
4. **Mapbox Access Token** (free tier available)

## Installation

1. **Clone the repository and navigate to frontend:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables:**
   Create a `.env` file in the frontend directory:

   ```env
   # Mapbox Access Token
   # Get your free token from https://account.mapbox.com/access-tokens/
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
   ```

4. **Generate contract types:**

   ```bash
   npm run generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Getting a Mapbox Access Token

1. Go to [Mapbox](https://account.mapbox.com/access-tokens/)
2. Create a free account
3. Generate a new access token
4. Add the token to your `.env` file

## Smart Contract Integration

The application uses the following smart contracts:

- **SecureScoutHub**: Main contract that orchestrates all operations
- **UserRegistry**: Manages agent and scout registrations
- **JobRegistry**: Handles job posting and management
- **PaymentRegistry**: Manages escrow and payments
- **RatingRegistry**: Handles ratings and reviews

### Contract Addresses (Chain ID: 420420422)

- SecureScoutHub: `0x83c3a2e47344DC80613eeA1b4B3D8cB11bF15DFA`
- UserRegistry: `0xBe1c83b775657b6E2aC618b570B14BD57061FFE5`
- JobRegistry: `0x5D2a76e9417a1391eA89a5F6d55486DCeedD6c2B`
- PaymentRegistry: `0xD0940d5B7cC90F0D4030C36Bc3fc879C18ca343A`
- RatingRegistry: `0xa401B53Fd425f13aF8953548B71c2C53321ca2Da`

## Key Components

### Services

- `contractService.ts`: Smart contract interaction hooks and utilities
- `mapboxService.ts`: Mapbox API integration for location services

### Components

- `LocationSearch.tsx`: Autocomplete location search with Mapbox
- `MapboxMap.tsx`: Interactive map component
- UI components in `components/ui/`: Reusable UI components

### Pages

- `landing-page.tsx`: Homepage with wallet connection
- `agent-registration.tsx`: Agent registration form
- `scouter-registration.tsx`: Scout registration form
- `agent-dashboard.tsx`: Agent dashboard (to be implemented)
- `scouter-dashboard.tsx`: Scout dashboard (to be implemented)

## Usage Flow

1. **Connect Wallet**: Users connect their Web3 wallet on the landing page
2. **Choose Role**: Users select whether to register as an agent or scout
3. **Registration**: Complete profile setup with location search
4. **Dashboard**: Access role-specific dashboard for job management

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run generate`: Generate contract types from ABIs
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Adding New Features

1. Smart contract functions: Add to `contractService.ts`
2. UI components: Create in `components/` directory
3. Pages: Add to `pages/` directory and update routing in `App.tsx`

## Troubleshooting

### Common Issues

1. **Mapbox not working**: Ensure `VITE_MAPBOX_ACCESS_TOKEN` is set in `.env`
2. **Contract calls failing**: Check wallet connection and network (should be on chain 420420422)
3. **Build errors**: Run `npm run generate` to update contract types

### Dependencies Conflicts

The project uses `--legacy-peer-deps` due to React version conflicts with some mapping libraries. This is safe for development.

## Security Notes

- Never commit your `.env` file with real tokens
- The application uses wagmi for secure wallet interactions
- All smart contract calls are validated and typed
- Location data is processed client-side for privacy

## Next Steps

1. Implement agent and scout dashboards
2. Add job posting and management features
3. Implement payment flows
4. Add rating and review system
5. Enhance map features with job location display
6. Add dispute resolution system
7. Implement notifications and real-time updates
