const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Starting full deployment with account:", deployer.address);

  try {
    console.log("\n📋 === STEP 1: DEPLOYING CONTRACTS ===");

    // Deploy UserRegistry first
    console.log("Deploying UserRegistry...");
    const UserRegistry = await ethers.getContractFactory("UserRegistry");
    const userRegistry = await UserRegistry.deploy();
    await userRegistry.waitForDeployment();
    const userRegistryAddress = await userRegistry.getAddress();
    console.log("✅ UserRegistry deployed to:", userRegistryAddress);

    // Deploy JobRegistry
    console.log("Deploying JobRegistry...");
    const JobRegistry = await ethers.getContractFactory("JobRegistry");
    const jobRegistry = await JobRegistry.deploy(userRegistryAddress);
    await jobRegistry.waitForDeployment();
    const jobRegistryAddress = await jobRegistry.getAddress();
    console.log("✅ JobRegistry deployed to:", jobRegistryAddress);

    // Deploy PaymentRegistry
    console.log("Deploying PaymentRegistry...");
    const PaymentRegistry = await ethers.getContractFactory("PaymentRegistry");
    const paymentRegistry = await PaymentRegistry.deploy(
      userRegistryAddress,
      jobRegistryAddress
    );
    await paymentRegistry.waitForDeployment();
    const paymentRegistryAddress = await paymentRegistry.getAddress();
    console.log("✅ PaymentRegistry deployed to:", paymentRegistryAddress);

    // Deploy RatingRegistry
    console.log("Deploying RatingRegistry...");
    const RatingRegistry = await ethers.getContractFactory("RatingRegistry");
    const ratingRegistry = await RatingRegistry.deploy(
      userRegistryAddress,
      jobRegistryAddress
    );
    await ratingRegistry.waitForDeployment();
    const ratingRegistryAddress = await ratingRegistry.getAddress();
    console.log("✅ RatingRegistry deployed to:", ratingRegistryAddress);

    // Deploy SecureScoutHub (main contract)
    console.log("Deploying SecureScoutHub...");
    const SecureScoutHub = await ethers.getContractFactory("SecureScoutHub");
    const secureScoutHub = await SecureScoutHub.deploy(
      userRegistryAddress,
      jobRegistryAddress,
      paymentRegistryAddress,
      ratingRegistryAddress
    );
    await secureScoutHub.waitForDeployment();
    const secureScoutHubAddress = await secureScoutHub.getAddress();
    console.log("✅ SecureScoutHub deployed to:", secureScoutHubAddress);

    console.log("\n🔍 === STEP 2: TESTING CONTRACTS ===");

    // Test each contract
    const contracts = [
      {
        name: "SecureScoutHub",
        instance: secureScoutHub,
        address: secureScoutHubAddress,
      },
      {
        name: "UserRegistry",
        instance: userRegistry,
        address: userRegistryAddress,
      },
      {
        name: "JobRegistry",
        instance: jobRegistry,
        address: jobRegistryAddress,
      },
      {
        name: "PaymentRegistry",
        instance: paymentRegistry,
        address: paymentRegistryAddress,
      },
      {
        name: "RatingRegistry",
        instance: ratingRegistry,
        address: ratingRegistryAddress,
      },
    ];

    let allWorking = true;

    for (const contract of contracts) {
      try {
        console.log(`Testing ${contract.name}...`);

        if (contract.name === "SecureScoutHub") {
          const owner = await contract.instance.owner();
          console.log(`✅ ${contract.name}.owner() = ${owner}`);
        } else {
          const paused = await contract.instance.paused();
          console.log(`✅ ${contract.name}.paused() = ${paused}`);
        }
        console.log(`🎉 ${contract.name} is WORKING!`);
      } catch (error) {
        console.log(`❌ ${contract.name} failed:`, error.message);
        allWorking = false;
      }
    }

    console.log("\n📊 === STEP 3: DEPLOYMENT SUMMARY ===");

    if (allWorking) {
      console.log("🎉 ALL CONTRACTS DEPLOYED AND WORKING!");
    } else {
      console.log("⚠️ Some contracts may have issues");
    }

    // Create deployment info
    const deploymentInfo = {
      network: "polkadotHubTestnet",
      chainId: 420420422,
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      contracts: {
        SecureScoutHub: secureScoutHubAddress,
        UserRegistry: userRegistryAddress,
        JobRegistry: jobRegistryAddress,
        PaymentRegistry: paymentRegistryAddress,
        RatingRegistry: ratingRegistryAddress,
      },
      status: allWorking ? "SUCCESS" : "PARTIAL_SUCCESS",
    };

    // Save deployment info
    const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
    console.log("📄 Deployment info saved to:", deploymentPath);

    console.log("\n📋 === CONTRACT ADDRESSES ===");
    console.log("SecureScoutHub:", secureScoutHubAddress);
    console.log("UserRegistry:", userRegistryAddress);
    console.log("JobRegistry:", jobRegistryAddress);
    console.log("PaymentRegistry:", paymentRegistryAddress);
    console.log("RatingRegistry:", ratingRegistryAddress);

    console.log("\n🔄 === STEP 4: TESTING AGENT REGISTRATION ===");

    if (allWorking) {
      try {
        console.log("Testing agent registration...");

        // Check if user is already registered
        const isAgent = await userRegistry.registeredAgents(deployer.address);
        const isScout = await userRegistry.registeredScouts(deployer.address);

        if (isAgent) {
          console.log("✅ User is already registered as agent");
        } else if (isScout) {
          console.log(
            "❌ User is registered as scout, cannot register as agent"
          );
        } else {
          console.log("🔄 Testing agent registration...");

          const name = "Test Agent";
          const email = "test@example.com";
          const serviceType = "Security";
          const priceInPAS = ethers.parseEther("0.1");
          const location = "Test Location";

          const tx = await secureScoutHub.registerAgent(
            name,
            email,
            serviceType,
            priceInPAS,
            location
          );
          await tx.wait();

          console.log("✅ Agent registration successful!");

          // Verify registration
          const agent = await secureScoutHub.getAgent(deployer.address);
          console.log("Agent details:", {
            name: agent.name,
            email: agent.email,
            serviceType: agent.serviceType,
            priceInPAS: ethers.formatEther(agent.priceInPAS),
            location: agent.location,
          });
        }
      } catch (error) {
        console.log("❌ Agent registration test failed:", error.message);
      }
    }

    console.log("\n🎯 === NEXT STEPS ===");
    console.log("1. Update your frontend with the new contract addresses");
    console.log("2. Update your generated.ts file");
    console.log("3. Test your frontend application");

    console.log("\n📝 === FRONTEND UPDATE ===");
    console.log(
      "Update your frontend/src/services/contractService.ts with these addresses:"
    );
    console.log(`const CHAIN_ID = 420420422;`);
    console.log(
      `// Update these addresses in your generated.ts or contractService.ts`
    );
    console.log(`// SecureScoutHub: ${secureScoutHubAddress}`);
    console.log(`// UserRegistry: ${userRegistryAddress}`);
    console.log(`// JobRegistry: ${jobRegistryAddress}`);
    console.log(`// PaymentRegistry: ${paymentRegistryAddress}`);
    console.log(`// RatingRegistry: ${ratingRegistryAddress}`);
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
