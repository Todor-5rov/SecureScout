import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SecureScoutSetupModule", (m) => {
  // Gas configuration for Polkadot Hub testnet
  const gasConfig = {
    gas: 3000000n, // 3M gas limit
    maxFeePerGas: 1000000000000n, // 1 Gpsi
    maxPriorityFeePerGas: 1000000000000n, // 1 Gpsi
  };

  // Deploy all contracts fresh with gas configuration
  const userRegistry = m.contract("UserRegistry", [], {
    gas: gasConfig.gas,
    maxFeePerGas: gasConfig.maxFeePerGas,
    maxPriorityFeePerGas: gasConfig.maxPriorityFeePerGas,
  });

  const jobRegistry = m.contract("JobRegistry", [userRegistry], {
    gas: gasConfig.gas,
    maxFeePerGas: gasConfig.maxFeePerGas,
    maxPriorityFeePerGas: gasConfig.maxPriorityFeePerGas,
  });

  const paymentRegistry = m.contract(
    "PaymentRegistry",
    [userRegistry, jobRegistry],
    {
      gas: gasConfig.gas,
      maxFeePerGas: gasConfig.maxFeePerGas,
      maxPriorityFeePerGas: gasConfig.maxPriorityFeePerGas,
    }
  );

  const ratingRegistry = m.contract(
    "RatingRegistry",
    [userRegistry, jobRegistry],
    {
      gas: gasConfig.gas,
      maxFeePerGas: gasConfig.maxFeePerGas,
      maxPriorityFeePerGas: gasConfig.maxPriorityFeePerGas,
    }
  );

  const secureScoutHub = m.contract(
    "SecureScoutHub",
    [userRegistry, jobRegistry, paymentRegistry, ratingRegistry],
    {
      gas: gasConfig.gas,
      maxFeePerGas: gasConfig.maxFeePerGas,
      maxPriorityFeePerGas: gasConfig.maxPriorityFeePerGas,
    }
  );

  // Note: The contracts use Ownable pattern instead of role-based access control
  // Permissions are managed through the owner of each contract
  // The SecureScoutHub contract coordinates interactions between contracts

  return {
    userRegistry,
    jobRegistry,
    paymentRegistry,
    ratingRegistry,
    secureScoutHub,
  };
});
