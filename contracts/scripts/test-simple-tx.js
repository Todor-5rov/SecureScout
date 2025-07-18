const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🧪 Testing simple transaction with account:", deployer.address);

  try {
    // Get current balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Current balance:", ethers.formatEther(balance), "PAS");

    // Try to send a small amount to ourselves (this should work)
    const tx = await deployer.sendTransaction({
      to: deployer.address,
      value: ethers.parseEther("0.000001"), // Very small amount
      gasLimit: 21000,
    });

    console.log("Transaction hash:", tx.hash);
    console.log("Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed.toString());

    // Check new balance
    const newBalance = await ethers.provider.getBalance(deployer.address);
    console.log("New balance:", ethers.formatEther(newBalance), "PAS");

    console.log("✅ Simple transaction test successful!");
  } catch (error) {
    console.error("❌ Simple transaction test failed:", error.message);

    if (error.message.includes("insufficient funds")) {
      console.log("💡 This is expected - we're sending to ourselves");
    } else if (error.message.includes("gas")) {
      console.log("💡 Gas estimation issue - common on this network");
    } else if (error.message.includes("network")) {
      console.log("💡 Network connectivity issue");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
