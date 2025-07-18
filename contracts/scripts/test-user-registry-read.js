const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🧪 Testing UserRegistry read operations...");
  console.log("Account:", deployer.address);

  // Frontend UserRegistry address
  const USER_REGISTRY_ADDRESS = "0x56B6F7bA2E62ea5635c278357708ae4c957c5360";

  // Simple ABI for testing
  const testAbi = [
    "function registeredScouts(address) view returns (bool)",
    "function registeredAgents(address) view returns (bool)",
    "function paused() view returns (bool)",
  ];

  try {
    console.log("\n📋 Testing basic contract interaction...");

    // Test 1: Check if we can create a contract instance
    console.log("1. Creating contract instance...");
    const userRegistry = new ethers.Contract(
      USER_REGISTRY_ADDRESS,
      testAbi,
      deployer
    );
    console.log("   ✅ Contract instance created");

    // Test 2: Check if contract is paused
    console.log("2. Checking pause state...");
    const isPaused = await userRegistry.paused();
    console.log(`   Paused: ${isPaused}`);

    // Test 3: Check registration status
    console.log("3. Checking registration status...");
    const isScout = await userRegistry.registeredScouts(deployer.address);
    const isAgent = await userRegistry.registeredAgents(deployer.address);
    console.log(`   Registered as Scout: ${isScout}`);
    console.log(`   Registered as Agent: ${isAgent}`);

    // Test 4: Check with a different address
    console.log("4. Checking with zero address...");
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const zeroIsScout = await userRegistry.registeredScouts(zeroAddress);
    const zeroIsAgent = await userRegistry.registeredAgents(zeroAddress);
    console.log(`   Zero address as Scout: ${zeroIsScout}`);
    console.log(`   Zero address as Agent: ${zeroIsAgent}`);

    console.log("\n✅ All read operations successful!");
  } catch (error) {
    console.error("❌ Error:", error.message);

    // Try to get more details about the error
    if (error.message.includes("ContractTrapped")) {
      console.log("\n🔍 ContractTrapped Error Analysis:");
      console.log(
        "- This usually means the contract is paused or has initialization issues"
      );
      console.log("- The contract might be in a failed state");
      console.log("- Try checking if the contract was deployed correctly");
    }

    if (error.message.includes("execution reverted")) {
      console.log("\n🔍 Execution Reverted Analysis:");
      console.log("- The function call reverted");
      console.log("- This could be due to access controls or invalid state");
    }
  }

  // Test network connectivity
  console.log("\n🌐 Testing network connectivity...");
  try {
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`   Balance: ${ethers.formatEther(balance)} PAS`);

    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`   Block: ${blockNumber}`);

    console.log("   ✅ Network is working");
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
