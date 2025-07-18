const { ethers } = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("🔍 Checking network status...");
    console.log("Account:", deployer.address);
    
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Balance:", ethers.formatEther(balance), "PAS");
    
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("Current block:", blockNumber);
    
    // Try to get the latest block
    const latestBlock = await ethers.provider.getBlock("latest");
    console.log("Latest block timestamp:", new Date(latestBlock.timestamp * 1000).toISOString());
    
    console.log("✅ Network connection successful");
  } catch (error) {
    console.error("❌ Network error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 