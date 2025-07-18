const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "🔍 Checking contract trapped state with account:",
    deployer.address
  );

  // Contract addresses from Ignition deployment
  const HUB_ADDRESS = "0x83c3a2e47344DC80613eeA1b4B3D8cB11bF15DFA";
  const USER_REGISTRY_ADDRESS = "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5";
  const JOB_REGISTRY_ADDRESS = "0x5D2a76e9417a1391eA89a5F6d55486DCeedD6c2B";
  const PAYMENT_REGISTRY_ADDRESS = "0xD0940d5B7cC90F0D4030C36Bc3fc879C18ca343A";
  const RATING_REGISTRY_ADDRESS = "0xa401B53Fd425f13aF8953548B71c2C53321ca2Da";

  console.log("\n📋 === CONTRACT ADDRESSES ===");
  console.log("Hub:", HUB_ADDRESS);
  console.log("UserRegistry:", USER_REGISTRY_ADDRESS);
  console.log("JobRegistry:", JOB_REGISTRY_ADDRESS);
  console.log("PaymentRegistry:", PAYMENT_REGISTRY_ADDRESS);
  console.log("RatingRegistry:", RATING_REGISTRY_ADDRESS);

  // Test each contract individually
  const contracts = [
    { name: "SecureScoutHub", address: HUB_ADDRESS },
    { name: "UserRegistry", address: USER_REGISTRY_ADDRESS },
    { name: "JobRegistry", address: JOB_REGISTRY_ADDRESS },
    { name: "PaymentRegistry", address: PAYMENT_REGISTRY_ADDRESS },
    { name: "RatingRegistry", address: RATING_REGISTRY_ADDRESS },
  ];

  console.log("\n🔍 === TESTING CONTRACT ACCESS ===");

  for (const contract of contracts) {
    try {
      console.log(`\nTesting ${contract.name}...`);

      // Try to get contract instance
      const contractInstance = await ethers.getContractAt(
        contract.name,
        contract.address
      );
      console.log(`✅ ${contract.name} contract instance created`);

      // Try to call a simple view function
      try {
        if (contract.name === "SecureScoutHub") {
          const owner = await contractInstance.owner();
          console.log(`✅ ${contract.name}.owner() = ${owner}`);
        } else {
          const paused = await contractInstance.paused();
          console.log(`✅ ${contract.name}.paused() = ${paused}`);
        }
      } catch (viewError) {
        console.log(
          `❌ ${contract.name} view function failed:`,
          viewError.message
        );

        if (viewError.message.includes("ContractTrapped")) {
          console.log(`🚨 ${contract.name} is TRAPPED!`);
        }
      }
    } catch (error) {
      console.log(`❌ ${contract.name} failed to instantiate:`, error.message);

      if (error.message.includes("ContractTrapped")) {
        console.log(`🚨 ${contract.name} is TRAPPED!`);
      }
    }
  }

  console.log("\n💡 === RECOMMENDATIONS ===");
  console.log("If contracts are trapped, you have these options:");
  console.log("1. REDEPLOY: Use Ignition to redeploy with a new deployment ID");
  console.log("2. CHECK NETWORK: Verify Polkadot Hub testnet is stable");
  console.log("3. WAIT: Sometimes trapped contracts recover automatically");
  console.log(
    "4. CONTACT SUPPORT: If persistent, contact Polkadot Hub support"
  );

  console.log("\n🔄 === REDEPLOY COMMAND ===");
  console.log("To redeploy with a new ID:");
  console.log(
    "npx hardhat ignition deploy ignition/modules/SecureScoutHubModule.ts --deployment-id chain-420420422-v2 --network polkadotHubTestnet"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
