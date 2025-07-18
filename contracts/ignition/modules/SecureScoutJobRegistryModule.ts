import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SecureScoutJobRegistryModule", (m) => {
  // Reference the UserRegistry from the previous module
  const userRegistry = m.contractAt(
    "UserRegistry",
    "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5"
  );

  const jobRegistry = m.contract("JobRegistry", [userRegistry]);

  return { jobRegistry };
});
