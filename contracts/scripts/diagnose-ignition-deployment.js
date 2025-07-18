const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "🔍 Diagnosing Ignition deployment with account:",
    deployer.address
  );

  // Contract addresses from Ignition deployment - UPDATED
  const HUB_ADDRESS = "0x2fEa883690A3729345e510DEDD095503e2525A84";
  const USER_REGISTRY_ADDRESS = "0x56B6F7bA2E62ea5635c278357708ae4c957c5360";
  const JOB_REGISTRY_ADDRESS = "0x11f7bE5D5f84020EE5F8baDF712d7Bf5B6C33847";
  const PAYMENT_REGISTRY_ADDRESS = "0x5bEb4dc995e53ecA297b4B3add57acd5D3F9C6F1";
  const RATING_REGISTRY_ADDRESS = "0xed1FE5E4629CcAc417230937D3156caA42208DC7";

  try {
    console.log("\n📋 === CONTRACT ADDRESSES ===");
    console.log("Hub:", HUB_ADDRESS);
    console.log("UserRegistry:", USER_REGISTRY_ADDRESS);
    console.log("JobRegistry:", JOB_REGISTRY_ADDRESS);
    console.log("PaymentRegistry:", PAYMENT_REGISTRY_ADDRESS);
    console.log("RatingRegistry:", RATING_REGISTRY_ADDRESS);

    // Get contract instances
    const hub = await ethers.getContractAt("SecureScoutHub", HUB_ADDRESS);
    const userRegistry = await ethers.getContractAt(
      "UserRegistry",
      USER_REGISTRY_ADDRESS
    );
    const jobRegistry = await ethers.getContractAt(
      "JobRegistry",
      JOB_REGISTRY_ADDRESS
    );
    const paymentRegistry = await ethers.getContractAt(
      "PaymentRegistry",
      PAYMENT_REGISTRY_ADDRESS
    );
    const ratingRegistry = await ethers.getContractAt(
      "RatingRegistry",
      RATING_REGISTRY_ADDRESS
    );

    console.log("\n🔒 === PAUSE STATE CHECK ===");

    // Check if contracts are paused
    const hubPaused = await hub.paused();
    const userRegistryPaused = await userRegistry.paused();
    const jobRegistryPaused = await jobRegistry.paused();
    const paymentRegistryPaused = await paymentRegistry.paused();
    const ratingRegistryPaused = await ratingRegistry.paused();

    console.log("Hub paused:", hubPaused);
    console.log("UserRegistry paused:", userRegistryPaused);
    console.log("JobRegistry paused:", jobRegistryPaused);
    console.log("PaymentRegistry paused:", paymentRegistryPaused);
    console.log("RatingRegistry paused:", ratingRegistryPaused);

    if (
      hubPaused ||
      userRegistryPaused ||
      jobRegistryPaused ||
      paymentRegistryPaused ||
      ratingRegistryPaused
    ) {
      console.log("\n❌ ISSUE FOUND: One or more contracts are paused!");
      console.log(
        "This will cause all transactions to fail with 'whenNotPaused' modifier."
      );
    } else {
      console.log("\n✅ All contracts are unpaused");
    }

    console.log("\n👑 === OWNERSHIP CHECK ===");

    // Check contract owners
    const hubOwner = await hub.owner();
    const userRegistryOwner = await userRegistry.owner();
    const jobRegistryOwner = await jobRegistry.owner();
    const paymentRegistryOwner = await paymentRegistry.owner();
    const ratingRegistryOwner = await ratingRegistry.owner();

    console.log("Hub owner:", hubOwner);
    console.log("UserRegistry owner:", userRegistryOwner);
    console.log("JobRegistry owner:", jobRegistryOwner);
    console.log("PaymentRegistry owner:", paymentRegistryOwner);
    console.log("RatingRegistry owner:", ratingRegistryOwner);
    console.log("Deployer address:", deployer.address);

    // Check if deployer is owner
    const isHubOwner =
      hubOwner.toLowerCase() === deployer.address.toLowerCase();
    const isUserRegistryOwner =
      userRegistryOwner.toLowerCase() === deployer.address.toLowerCase();
    const isJobRegistryOwner =
      jobRegistryOwner.toLowerCase() === deployer.address.toLowerCase();
    const isPaymentRegistryOwner =
      paymentRegistryOwner.toLowerCase() === deployer.address.toLowerCase();
    const isRatingRegistryOwner =
      ratingRegistryOwner.toLowerCase() === deployer.address.toLowerCase();

    console.log("\n🔑 === OWNER PERMISSIONS ===");
    console.log("Is Hub owner:", isHubOwner);
    console.log("Is UserRegistry owner:", isUserRegistryOwner);
    console.log("Is JobRegistry owner:", isJobRegistryOwner);
    console.log("Is PaymentRegistry owner:", isPaymentRegistryOwner);
    console.log("Is RatingRegistry owner:", isRatingRegistryOwner);

    console.log("\n🧪 === TESTING AGENT REGISTRATION ===");

    // Check if user is already registered
    const isAgent = await userRegistry.registeredAgents(deployer.address);
    const isScout = await userRegistry.registeredScouts(deployer.address);

    console.log("Is already agent:", isAgent);
    console.log("Is already scout:", isScout);

    if (isAgent) {
      console.log("✅ User is already registered as agent");
      const agent = await hub.getAgent(deployer.address);
      console.log("Agent details:", {
        name: agent.name,
        email: agent.email,
        serviceType: agent.serviceType,
        priceInPAS: ethers.formatEther(agent.priceInPAS),
        location: agent.location,
        isAvailable: agent.isAvailable,
        isActive: agent.isActive,
      });
    } else if (isScout) {
      console.log("❌ User is registered as scout, cannot register as agent");
    } else {
      console.log("🔄 User is not registered - ready for testing");
    }

    console.log("\n💡 === RECOMMENDATIONS ===");

    if (
      hubPaused ||
      userRegistryPaused ||
      jobRegistryPaused ||
      paymentRegistryPaused ||
      ratingRegistryPaused
    ) {
      console.log(
        "1. UNPAUSE CONTRACTS: Run the unpause script to fix the pause state"
      );
      console.log(
        "   npx hardhat run scripts/unpause-contracts.js --network polkadotHubTestnet"
      );
    }

    if (
      !isHubOwner &&
      !isUserRegistryOwner &&
      !isJobRegistryOwner &&
      !isPaymentRegistryOwner &&
      !isRatingRegistryOwner
    ) {
      console.log("2. OWNERSHIP ISSUE: Deployer is not owner of any contracts");
      console.log(
        "   This might indicate the contracts were deployed by a different account"
      );
    }

    if (!isAgent && !isScout) {
      console.log("3. TEST REGISTRATION: User can test agent registration");
      console.log(
        "   npx hardhat run scripts/test-agent-registration.js --network polkadotHubTestnet"
      );
    }
  } catch (error) {
    console.error("❌ Error during diagnosis:", error.message);

    if (error.message.includes("contract not deployed")) {
      console.log(
        "💡 Suggestion: Check if contracts are deployed at the specified addresses"
      );
    } else if (error.message.includes("network")) {
      console.log("💡 Suggestion: Check network connection and RPC endpoint");
    } else if (error.message.includes("signer")) {
      console.log("💡 Suggestion: Check if private key is properly configured");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
