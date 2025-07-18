import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SecureScoutPaymentRegistryModule", (m) => {
  const userRegistry = m.contractAt(
    "UserRegistry",
    "0xBe1c83b775657b6E2aC618b570B14BD57061FFE5"
  );
  const jobRegistry = m.contractAt(
    "JobRegistry",
    "0x5D2a76e9417a1391eA89a5F6d55486DCeedD6c2B"
  );

  const paymentRegistry = m.contract("PaymentRegistry", [
    userRegistry,
    jobRegistry,
  ]);

  return { paymentRegistry };
});
