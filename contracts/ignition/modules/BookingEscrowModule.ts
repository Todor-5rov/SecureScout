import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BookingEscrowModule = buildModule("BookingEscrowModule", (m) => {
  const bookingEscrow = m.contract("BookingEscrow", []); // No constructor args
  return { bookingEscrow };
});

export default BookingEscrowModule;
