const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Diagnosing contract state...");
  console.log("=".repeat(60));

  // Get the deployed addresses
  const deployedAddresses = require("../ignition/deployments/chain-420420422/deployed_addresses.json");

  // Get signer
  const [signer] = await ethers.getSigners();
  console.log(`Using signer: ${signer.address}`);

  const contracts = [
    {
      name: "UserRegistry",
      address: deployedAddresses["SecureScoutSetupModule#UserRegistry"],
    },
    {
      name: "JobRegistry",
      address: deployedAddresses["SecureScoutSetupModule#JobRegistry"],
    },
    {
      name: "PaymentRegistry",
      address: deployedAddresses["SecureScoutSetupModule#PaymentRegistry"],
    },
    {
      name: "RatingRegistry",
      address: deployedAddresses["SecureScoutSetupModule#RatingRegistry"],
    },
    {
      name: "SecureScoutHub",
      address: deployedAddresses["SecureScoutSetupModule#SecureScoutHub"],
    },
  ];

  for (const contract of contracts) {
    console.log(`\n📋 Checking ${contract.name}...`);
    console.log(`   Address: ${contract.address}`);

    try {
      // Check if contract code exists
      const code = await ethers.provider.getCode(contract.address);
      if (code === "0x") {
        console.log(`   ❌ No contract code found at address`);
        continue;
      }
      console.log(`   ✅ Contract code exists (${code.length} bytes)`);

      // Try to get contract balance
      const balance = await ethers.provider.getBalance(contract.address);
      console.log(`   💰 Contract balance: ${ethers.formatEther(balance)} ETH`);

      // Try to get the latest transaction count
      const nonce = await ethers.provider.getTransactionCount(contract.address);
      console.log(`   🔢 Transaction count: ${nonce}`);

      // Try to get the latest block
      const latestBlock = await ethers.provider.getBlockNumber();
      console.log(`   📦 Latest block: ${latestBlock}`);

      // Try to call a simple view function
      const minimalAbi = [
        "function owner() view returns (address)",
        "function paused() view returns (bool)",
      ];

      const contractInstance = new ethers.Contract(
        contract.address,
        minimalAbi,
        signer
      );

      try {
        const owner = await contractInstance.owner();
        console.log(`   👑 Owner: ${owner}`);

        const isPaused = await contractInstance.paused();
        console.log(`   ⏸️  Paused: ${isPaused}`);

        console.log(`   ✅ Contract is responding normally`);
      } catch (callError) {
        console.log(`   ❌ Contract call failed: ${callError.message}`);

        // Check if it's a specific error
        if (callError.message.includes("ContractTrapped")) {
          console.log(`   🔍 ContractTrapped error detected`);
          console.log(`   💡 This usually means:`);
          console.log(`      - Contract is in an invalid state`);
          console.log(`      - Contract encountered an error during execution`);
          console.log(`      - Contract may need to be redeployed`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Error checking contract: ${error.message}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("🎯 Diagnosis completed!");
  console.log("\nPossible solutions:");
  console.log("1. If contracts are trapped, consider redeploying them");
  console.log("2. Check if there are any pending transactions");
  console.log("3. Verify the network connection and RPC endpoint");
  console.log("4. Check if the contracts were deployed correctly");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
