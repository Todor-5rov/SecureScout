const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔄 Updating frontend with new contract addresses...");

  try {
    // Read deployment info
    const deploymentPath = path.join(__dirname, "..", "deployment-info.json");
    if (!fs.existsSync(deploymentPath)) {
      console.log("❌ No deployment info found. Run full-deployment.js first.");
      return;
    }

    const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
    console.log("📄 Found deployment info:", deploymentInfo.status);

    // Create a simple contract addresses file for frontend
    const frontendAddresses = {
      chainId: deploymentInfo.chainId,
      contracts: deploymentInfo.contracts,
      network: deploymentInfo.network,
      timestamp: deploymentInfo.timestamp,
    };

    // Save to frontend directory
    const frontendPath = path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "src",
      "contract-addresses.json"
    );
    fs.writeFileSync(frontendPath, JSON.stringify(frontendAddresses, null, 2));
    console.log("✅ Contract addresses saved to:", frontendPath);

    // Create a TypeScript constants file
    const tsConstants = `// Auto-generated contract addresses
export const CONTRACT_ADDRESSES = {
  ${deploymentInfo.chainId}: {
    SecureScoutHub: "${deploymentInfo.contracts.SecureScoutHub}",
    UserRegistry: "${deploymentInfo.contracts.UserRegistry}",
    JobRegistry: "${deploymentInfo.contracts.JobRegistry}",
    PaymentRegistry: "${deploymentInfo.contracts.PaymentRegistry}",
    RatingRegistry: "${deploymentInfo.contracts.RatingRegistry}"
  }
} as const;

export const CHAIN_ID = ${deploymentInfo.chainId};
export const NETWORK = "${deploymentInfo.network}";
`;

    const tsPath = path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "src",
      "contract-constants.ts"
    );
    fs.writeFileSync(tsPath, tsConstants);
    console.log("✅ TypeScript constants saved to:", tsPath);

    console.log("\n📋 === CONTRACT ADDRESSES ===");
    console.log("SecureScoutHub:", deploymentInfo.contracts.SecureScoutHub);
    console.log("UserRegistry:", deploymentInfo.contracts.UserRegistry);
    console.log("JobRegistry:", deploymentInfo.contracts.JobRegistry);
    console.log("PaymentRegistry:", deploymentInfo.contracts.PaymentRegistry);
    console.log("RatingRegistry:", deploymentInfo.contracts.RatingRegistry);

    console.log("\n🎯 === FRONTEND UPDATE INSTRUCTIONS ===");
    console.log(
      "1. Copy the addresses from contract-constants.ts to your contractService.ts"
    );
    console.log("2. Update your generated.ts file with the new addresses");
    console.log("3. Restart your frontend development server");
    console.log("4. Test the application");

    console.log("\n📝 === MANUAL UPDATE REQUIRED ===");
    console.log("You'll need to manually update these files:");
    console.log("- frontend/src/services/contractService.ts");
    console.log("- frontend/src/generated.ts (if using wagmi codegen)");
    console.log("- Any other files that reference contract addresses");
  } catch (error) {
    console.error("❌ Error updating frontend:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
