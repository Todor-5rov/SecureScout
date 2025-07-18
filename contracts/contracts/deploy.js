const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy UserRegistry first
  console.log("Deploying UserRegistry...");
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.waitForDeployment();
  console.log("UserRegistry deployed to:", await userRegistry.getAddress());

  // Deploy JobRegistry
  console.log("Deploying JobRegistry...");
  const JobRegistry = await ethers.getContractFactory("JobRegistry");
  const jobRegistry = await JobRegistry.deploy(await userRegistry.getAddress());
  await jobRegistry.waitForDeployment();
  console.log("JobRegistry deployed to:", await jobRegistry.getAddress());

  // Deploy PaymentRegistry
  console.log("Deploying PaymentRegistry...");
  const PaymentRegistry = await ethers.getContractFactory("PaymentRegistry");
  const paymentRegistry = await PaymentRegistry.deploy(
    await userRegistry.getAddress(),
    await jobRegistry.getAddress()
  );
  await paymentRegistry.waitForDeployment();
  console.log(
    "PaymentRegistry deployed to:",
    await paymentRegistry.getAddress()
  );

  // Deploy RatingRegistry
  console.log("Deploying RatingRegistry...");
  const RatingRegistry = await ethers.getContractFactory("RatingRegistry");
  const ratingRegistry = await RatingRegistry.deploy(
    await userRegistry.getAddress(),
    await jobRegistry.getAddress()
  );
  await ratingRegistry.waitForDeployment();
  console.log("RatingRegistry deployed to:", await ratingRegistry.getAddress());

  // Deploy SecureScoutHub (main contract)
  console.log("Deploying SecureScoutHub...");
  const SecureScoutHub = await ethers.getContractFactory("SecureScoutHub");
  const secureScoutHub = await SecureScoutHub.deploy(
    await userRegistry.getAddress(),
    await jobRegistry.getAddress(),
    await paymentRegistry.getAddress(),
    await ratingRegistry.getAddress()
  );
  await secureScoutHub.waitForDeployment();
  console.log("SecureScoutHub deployed to:", await secureScoutHub.getAddress());

  console.log("Deployment completed successfully!");
  console.log("\nContract Addresses:");
  console.log("UserRegistry:", await userRegistry.getAddress());
  console.log("JobRegistry:", await jobRegistry.getAddress());
  console.log("PaymentRegistry:", await paymentRegistry.getAddress());
  console.log("RatingRegistry:", await ratingRegistry.getAddress());
  console.log("SecureScoutHub:", await secureScoutHub.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
