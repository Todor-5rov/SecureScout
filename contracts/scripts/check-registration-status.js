const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "🔍 Checking registration status with account:",
    deployer.address
  );

  // All UserRegistry addresses from the deployment
  const userRegistryAddresses = [
    {
      name: "SecureScoutUserRegistryModule#UserRegistry",
      address: "0xa787969C57E88918fEf86f2ded68D2a115D90B1f",
    },
    {
      name: "SecureScoutJobRegistryModule#UserRegistry",
      address: "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5",
    },
    {
      name: "SecureScoutPaymentRegistryModule#UserRegistry",
      address: "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5",
    },
    {
      name: "SecureScoutRatingRegistryModule#UserRegistry",
      address: "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5",
    },
    {
      name: "SecureScoutHubModule#UserRegistry (Frontend)",
      address: "0x56B6F7bA2E62ea5635c278357708ae4c957c5360",
    },
  ];

  // Get UserRegistry ABI (we'll use a simple one for the check)
  const userRegistryAbi = [
    "function registeredScouts(address) view returns (bool)",
    "function registeredAgents(address) view returns (bool)",
    "function getScout(address) view returns (tuple(address walletAddress, string displayName, string email, string location, uint256 totalJobsPosted, uint256 totalSpent, uint256 averageRating, uint256 totalRatings, bool isActive))",
    "function getAgent(address) view returns (tuple(address walletAddress, string name, string email, string serviceType, uint256 priceInPAS, string location, uint256 completedJobs, uint256 totalEarnings, uint256 averageRating, uint256 totalRatings, bool isAvailable, bool isActive))",
  ];

  console.log(
    "\n📋 Checking registration status on all UserRegistry contracts...\n"
  );

  for (const registry of userRegistryAddresses) {
    try {
      const userRegistry = new ethers.Contract(
        registry.address,
        userRegistryAbi,
        deployer
      );

      console.log(`🔍 ${registry.name}:`);
      console.log(`   Address: ${registry.address}`);

      // Check if deployer is registered as scout
      const isScout = await userRegistry.registeredScouts(deployer.address);
      console.log(`   Registered as Scout: ${isScout}`);

      // Check if deployer is registered as agent
      const isAgent = await userRegistry.registeredAgents(deployer.address);
      console.log(`   Registered as Agent: ${isAgent}`);

      // If registered as scout, get scout details
      if (isScout) {
        try {
          const scoutData = await userRegistry.getScout(deployer.address);
          console.log(`   Scout Details:`);
          console.log(`     Name: ${scoutData.displayName}`);
          console.log(`     Email: ${scoutData.email}`);
          console.log(`     Location: ${scoutData.location}`);
          console.log(`     Total Jobs Posted: ${scoutData.totalJobsPosted}`);
          console.log(`     Is Active: ${scoutData.isActive}`);
        } catch (error) {
          console.log(`   ❌ Error getting scout details: ${error.message}`);
        }
      }

      // If registered as agent, get agent details
      if (isAgent) {
        try {
          const agentData = await userRegistry.getAgent(deployer.address);
          console.log(`   Agent Details:`);
          console.log(`     Name: ${agentData.name}`);
          console.log(`     Email: ${agentData.email}`);
          console.log(`     Service Type: ${agentData.serviceType}`);
          console.log(
            `     Price: ${ethers.formatEther(agentData.priceInPAS)} PAS`
          );
          console.log(`     Location: ${agentData.location}`);
          console.log(`     Is Available: ${agentData.isAvailable}`);
          console.log(`     Is Active: ${agentData.isActive}`);
        } catch (error) {
          console.log(`   ❌ Error getting agent details: ${error.message}`);
        }
      }

      console.log(""); // Empty line for readability
    } catch (error) {
      console.log(`❌ Error checking ${registry.name}: ${error.message}\n`);
    }
  }

  // Check if any other accounts might be registered
  console.log("🔍 Checking for other potential registered accounts...\n");

  // Check the frontend UserRegistry for any registered users
  const frontendRegistry = new ethers.Contract(
    "0x56B6F7bA2E62ea5635c278357708ae4c957c5360",
    userRegistryAbi,
    deployer
  );

  try {
    // Try to get all agents (if the contract has this function)
    const allAgentsAbi = [
      "function getAllAgents() view returns (tuple(address walletAddress, string name, string email, string serviceType, uint256 priceInPAS, string location, uint256 completedJobs, uint256 totalEarnings, uint256 averageRating, uint256 totalRatings, bool isAvailable, bool isActive)[])",
    ];
    const frontendRegistryWithAgents = new ethers.Contract(
      "0x56B6F7bA2E62ea5635c278357708ae4c957c5360",
      userRegistryAbi.concat(allAgentsAbi),
      deployer
    );

    const allAgents = await frontendRegistryWithAgents.getAllAgents();
    console.log(
      `📊 Total registered agents on frontend UserRegistry: ${allAgents.length}`
    );

    if (allAgents.length > 0) {
      console.log("   Registered agents:");
      allAgents.forEach((agent, index) => {
        console.log(`   ${index + 1}. ${agent.name} (${agent.walletAddress})`);
      });
    }
  } catch (error) {
    console.log(`❌ Error getting all agents: ${error.message}`);
  }

  console.log("\n🎯 Summary:");
  console.log(
    "- The frontend is using UserRegistry at: 0x56B6F7bA2E62ea5635c278357708ae4c957c5360"
  );
  console.log(
    "- If the user registered on a different UserRegistry, they won't appear as registered in the frontend"
  );
  console.log(
    "- Solution: Either register on the frontend UserRegistry or update the frontend to use the correct UserRegistry"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
