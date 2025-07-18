const { execSync } = require("child_process");
const path = require("path");

async function main() {
  console.log("🚀 SECURESCOUT FULL DEPLOYMENT SCRIPT");
  console.log("=====================================");

  try {
    // Step 1: Deploy all contracts
    console.log("\n📋 STEP 1: Deploying all contracts...");
    console.log(
      "Running: npx hardhat run scripts/full-deployment.js --network polkadotHubTestnet"
    );

    execSync(
      "npx hardhat run scripts/full-deployment.js --network polkadotHubTestnet",
      {
        stdio: "inherit",
        cwd: __dirname,
      }
    );

    console.log("\n✅ Contract deployment completed!");

    // Step 2: Update frontend
    console.log("\n📋 STEP 2: Updating frontend...");
    console.log("Running: npx hardhat run scripts/update-frontend.js");

    execSync("npx hardhat run scripts/update-frontend.js", {
      stdio: "inherit",
      cwd: __dirname,
    });

    console.log("\n✅ Frontend update completed!");

    // Step 3: Show final instructions
    console.log("\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("=====================================");

    console.log("\n📋 === NEXT STEPS ===");
    console.log("1. Check the generated files:");
    console.log("   - contracts/deployment-info.json");
    console.log("   - frontend/src/contract-addresses.json");
    console.log("   - frontend/src/contract-constants.ts");

    console.log("\n2. Update your frontend:");
    console.log(
      "   - Copy addresses from contract-constants.ts to contractService.ts"
    );
    console.log("   - Update generated.ts if using wagmi codegen");
    console.log("   - Restart your frontend development server");

    console.log("\n3. Test your application:");
    console.log("   - Try registering as an agent");
    console.log("   - Test other functionality");

    console.log("\n📝 === IMPORTANT FILES ===");
    console.log("Deployment info: contracts/deployment-info.json");
    console.log("Frontend addresses: frontend/src/contract-addresses.json");
    console.log("TypeScript constants: frontend/src/contract-constants.ts");
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    console.log("\n💡 Troubleshooting:");
    console.log("1. Check your private key is set in .env");
    console.log("2. Ensure you have enough PAS tokens for gas");
    console.log("3. Check network connectivity");
    console.log("4. Try running individual scripts if needed");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
