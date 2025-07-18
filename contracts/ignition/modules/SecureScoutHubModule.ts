import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SecureScoutHubModule", (m) => {
  // Deploy all contracts fresh
  const userRegistry = m.contract("UserRegistry", []);
  const jobRegistry = m.contract("JobRegistry", [userRegistry]);
  const paymentRegistry = m.contract("PaymentRegistry", [
    userRegistry,
    jobRegistry,
  ]);
  const ratingRegistry = m.contract("RatingRegistry", [
    userRegistry,
    jobRegistry,
  ]);

  const secureScoutHub = m.contract("SecureScoutHub", [
    userRegistry,
    jobRegistry,
    paymentRegistry,
    ratingRegistry,
  ]);

  return { secureScoutHub };
});
