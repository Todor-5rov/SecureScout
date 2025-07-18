import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SecureScoutUserRegistryModule", (m) => {
  const userRegistry = m.contract("UserRegistry", []);

  return { userRegistry };
});
