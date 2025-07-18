const { ethers } = require("hardhat");

async function main() {
  console.log("🔧 Fixing trapped contracts by redeploying...");
  console.log("=".repeat(60));

  // Get signer
  const [signer] = await ethers.getSigners();
  console.log(`Using signer: ${signer.address}`);

  // Check signer balance
  const balance = await ethers.provider.getBalance(signer.address);
  console.log(`Signer balance: ${ethers.formatEther(balance)} ETH`);

  if (balance === 0n) {
    console.log("❌ Insufficient balance to deploy contracts");
    return;
  }

  console.log("\n📋 Redeploying trapped contracts...");

  try {
    // Deploy UserRegistry
    console.log("\n🔧 Deploying UserRegistry...");
    const UserRegistry = await ethers.getContractFactory("UserRegistry");
    const userRegistry = await UserRegistry.deploy();
    await userRegistry.waitForDeployment();
    const userRegistryAddress = await userRegistry.getAddress();
    console.log(`✅ UserRegistry deployed at: ${userRegistryAddress}`);

    // Deploy JobRegistry
    console.log("\n🔧 Deploying JobRegistry...");
    const JobRegistry = await ethers.getContractFactory("JobRegistry");
    const jobRegistry = await JobRegistry.deploy();
    await jobRegistry.waitForDeployment();
    const jobRegistryAddress = await jobRegistry.getAddress();
    console.log(`✅ JobRegistry deployed at: ${jobRegistryAddress}`);

    // Deploy SecureScoutHub
    console.log("\n🔧 Deploying SecureScoutHub...");
    const SecureScoutHub = await ethers.getContractFactory("SecureScoutHub");
    const secureScoutHub = await SecureScoutHub.deploy();
    await secureScoutHub.waitForDeployment();
    const secureScoutHubAddress = await secureScoutHub.getAddress();
    console.log(`✅ SecureScoutHub deployed at: ${secureScoutHubAddress}`);

    // Test the new contracts
    console.log("\n🧪 Testing new contracts...");

    // Test UserRegistry
    const isPaused = await userRegistry.paused();
    console.log(`UserRegistry paused: ${isPaused}`);

    const owner = await userRegistry.owner();
    console.log(`UserRegistry owner: ${owner}`);

    // Test JobRegistry
    const jobRegistryPaused = await jobRegistry.paused();
    console.log(`JobRegistry paused: ${jobRegistryPaused}`);

    const jobRegistryOwner = await jobRegistry.owner();
    console.log(`JobRegistry owner: ${jobRegistryOwner}`);

    // Test SecureScoutHub
    const hubOwner = await secureScoutHub.owner();
    console.log(`SecureScoutHub owner: ${hubOwner}`);

    console.log("\n" + "=".repeat(60));
    console.log("🎯 Redeployment completed successfully!");
    console.log("\nNew contract addresses:");
    console.log(`UserRegistry: ${userRegistryAddress}`);
    console.log(`JobRegistry: ${jobRegistryAddress}`);
    console.log(`SecureScoutHub: ${secureScoutHubAddress}`);

    console.log("\nNext steps:");
    console.log("1. Update your frontend configuration with the new addresses");
    console.log(
      "2. Run the registration status check with the new UserRegistry address"
    );
    console.log("3. Test the registration functionality");

    // Save the new addresses to a file
    const fs = require("fs");
    const newAddresses = {
      UserRegistry: userRegistryAddress,
      JobRegistry: jobRegistryAddress,
      SecureScoutHub: secureScoutHubAddress,
      PaymentRegistry: "0x0C8E6caC9e8Ef7a391d6B92B0bd58c61DD7d4dCB", // Keep working ones
      RatingRegistry: "0x7C26250e379c6df8810B65D5Da4F446D975C2CeE",
    };

    fs.writeFileSync(
      "./new-deployed-addresses.json",
      JSON.stringify(newAddresses, null, 2)
    );
    console.log("\n📄 New addresses saved to: new-deployed-addresses.json");
  } catch (error) {
    console.error("❌ Error during redeployment:", error.message);
    console.log("\nPossible solutions:");
    console.log("1. Check if you have sufficient balance");
    console.log("2. Verify network connectivity");
    console.log("3. Check if the contract compilation is successful");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
