const { ethers } = require("hardhat");

async function main() {
  console.log("🔓 Unpausing SecureScout contracts...");
  console.log("=".repeat(60));

  // Get the deployed addresses
  const deployedAddresses = require("../ignition/deployments/chain-420420422/deployed_addresses.json");

  // Get signer
  const [signer] = await ethers.getSigners();
  console.log(`Using signer: ${signer.address}`);

  // Check if signer is the owner of the contracts
  console.log("\nChecking contract ownership...");

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

  // Minimal ABI for ownership and pause checks
  const minimalAbi = [
    "function owner() view returns (address)",
    "function paused() view returns (bool)",
    "function unpause()",
    "function pause()",
  ];

  for (const contract of contracts) {
    try {
      console.log(`\n📋 Checking ${contract.name}...`);
      console.log(`   Address: ${contract.address}`);

      const contractInstance = new ethers.Contract(
        contract.address,
        minimalAbi,
        signer
      );

      // Check owner
      const owner = await contractInstance.owner();
      console.log(`   Owner: ${owner}`);
      console.log(
        `   Is signer owner: ${
          owner.toLowerCase() === signer.address.toLowerCase()
            ? "✅ YES"
            : "❌ NO"
        }`
      );

      // Check if paused
      const isPaused = await contractInstance.paused();
      console.log(`   Paused: ${isPaused ? "⚠️  YES" : "✅ NO"}`);

      // Unpause if paused and signer is owner
      if (isPaused && owner.toLowerCase() === signer.address.toLowerCase()) {
        console.log(`   🔓 Unpausing ${contract.name}...`);
        const tx = await contractInstance.unpause();
        await tx.wait();
        console.log(`   ✅ ${contract.name} unpaused successfully!`);
        console.log(`   Transaction hash: ${tx.hash}`);
      } else if (isPaused) {
        console.log(`   ❌ Cannot unpause ${contract.name} - not the owner`);
      } else {
        console.log(`   ✅ ${contract.name} is already unpaused`);
      }
    } catch (error) {
      console.log(`   ❌ Error with ${contract.name}: ${error.message}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("🎯 Unpause operation completed!");
  console.log("\nNext steps:");
  console.log("1. Run the registration status check again");
  console.log("2. If contracts are still trapped, there may be other issues");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
