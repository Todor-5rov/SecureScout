const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing agent registration with account:", deployer.address);

  // Contract addresses from deployment
  const HUB_ADDRESS = "0x83c3a2e47344DC80613eeA1b4B3D8cB11bF15DFA";
  const USER_REGISTRY_ADDRESS = "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5";

  try {
    // Get contract instances
    const hub = await ethers.getContractAt("SecureScoutHub", HUB_ADDRESS);
    const userRegistry = await ethers.getContractAt(
      "UserRegistry",
      USER_REGISTRY_ADDRESS
    );

    console.log("\n=== Testing Agent Registration ===");

    // Check if contracts are paused
    const hubPaused = await hub.paused();
    const userRegistryPaused = await userRegistry.paused();

    console.log("Hub paused:", hubPaused);
    console.log("UserRegistry paused:", userRegistryPaused);

    if (hubPaused || userRegistryPaused) {
      console.log("❌ Contracts are paused. Cannot test registration.");
      return;
    }

    // Check if user is already registered
    const isAgent = await userRegistry.registeredAgents(deployer.address);
    const isScout = await userRegistry.registeredScouts(deployer.address);

    console.log("Is already agent:", isAgent);
    console.log("Is already scout:", isScout);

    if (isAgent) {
      console.log("✅ User is already registered as agent");

      // Get agent details
      const agent = await hub.getAgent(deployer.address);
      console.log("Agent details:", {
        name: agent.name,
        email: agent.email,
        serviceType: agent.serviceType,
        priceInPAS: ethers.formatEther(agent.priceInPAS),
        location: agent.location,
        isAvailable: agent.isAvailable,
        isActive: agent.isActive,
      });
    } else if (isScout) {
      console.log("❌ User is registered as scout, cannot register as agent");
    } else {
      console.log("🔄 Testing agent registration...");

      // Test agent registration
      const name = "Test Agent";
      const email = "test@example.com";
      const serviceType = "Security";
      const priceInPAS = ethers.parseEther("0.1"); // 0.1 PAS
      const location = "Test Location";

      console.log("Registration parameters:", {
        name,
        email,
        serviceType,
        priceInPAS: ethers.formatEther(priceInPAS),
        location,
      });

      try {
        const tx = await hub.registerAgent(
          name,
          email,
          serviceType,
          priceInPAS,
          location
        );
        console.log("Transaction hash:", tx.hash);

        const receipt = await tx.wait();
        console.log("✅ Agent registration successful!");
        console.log("Gas used:", receipt.gasUsed.toString());

        // Verify registration
        const agent = await hub.getAgent(deployer.address);
        console.log("Agent details after registration:", {
          name: agent.name,
          email: agent.email,
          serviceType: agent.serviceType,
          priceInPAS: ethers.formatEther(agent.priceInPAS),
          location: agent.location,
          isAvailable: agent.isAvailable,
          isActive: agent.isActive,
        });
      } catch (error) {
        console.error("❌ Agent registration failed:", error.message);

        // Check for specific error conditions
        if (error.message.includes("Already registered")) {
          console.log("User is already registered");
        } else if (error.message.includes("paused")) {
          console.log("Contract is paused");
        } else if (error.message.includes("insufficient funds")) {
          console.log("Insufficient funds for gas");
        } else {
          console.log("Unknown error occurred");
        }
      }
    }
  } catch (error) {
    console.error("Error testing agent registration:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
