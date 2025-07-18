const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🔍 Checking new deployment with account:", deployer.address);

  // New contract addresses from the v2 deployment
  const HUB_ADDRESS = "0x2FF46a441a8587954E22bD7BE274EE785F506D1F";
  const USER_REGISTRY_ADDRESS = "0xe323c3035aBB0F9a965A210B49C96B98082611F2";
  const JOB_REGISTRY_ADDRESS = "0xF5beBDe74555e6Fa04601b06e90046b02aD16052";
  const PAYMENT_REGISTRY_ADDRESS = "0xc15ec1293e7DA9cE9FaCEe713B75bdfAA9EE11b9";
  const RATING_REGISTRY_ADDRESS = "0xc041daC38FfCcc299522Ad5D90303D3E58922cD1";

  console.log("\n📋 === NEW CONTRACT ADDRESSES (v2) ===");
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

  console.log("\n🔍 === TESTING NEW CONTRACTS ===");

  let allWorking = true;

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
        console.log(`🎉 ${contract.name} is WORKING!`);
      } catch (viewError) {
        console.log(
          `❌ ${contract.name} view function failed:`,
          viewError.message
        );

        if (viewError.message.includes("ContractTrapped")) {
          console.log(`🚨 ${contract.name} is TRAPPED!`);
          allWorking = false;
        }
      }
    } catch (error) {
      console.log(`❌ ${contract.name} failed to instantiate:`, error.message);

      if (error.message.includes("ContractTrapped")) {
        console.log(`🚨 ${contract.name} is TRAPPED!`);
        allWorking = false;
      }
    }
  }

  console.log("\n📊 === SUMMARY ===");
  if (allWorking) {
    console.log("🎉 ALL CONTRACTS ARE WORKING!");
    console.log("✅ You can now use agent registration and other functions");
  } else {
    console.log("⚠️ Some contracts are still trapped");
    console.log("Consider redeploying again or contacting support");
  }

  console.log("\n🔄 === NEXT STEPS ===");
  if (allWorking) {
    console.log("1. Update your frontend with the new contract addresses");
    console.log("2. Test agent registration");
    console.log("3. Update your generated.ts file with new addresses");
  }

  // Show the old vs new addresses
  console.log("\n📝 === ADDRESS COMPARISON ===");
  console.log("OLD (trapped) addresses:");
  console.log("Hub: 0x83c3a2e47344DC80613eeA1b4B3D8cB11bF15DFA");
  console.log("UserRegistry: 0xBe1c83b775657b6E2aC618b570B14BD57061FFE5");
  console.log("JobRegistry: 0x5D2a76e9417a1391eA89a5F6d55486DCeedD6c2B");

  console.log("\nNEW (working) addresses:");
  console.log("Hub:", HUB_ADDRESS);
  console.log("UserRegistry:", USER_REGISTRY_ADDRESS);
  console.log("JobRegistry:", JOB_REGISTRY_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
