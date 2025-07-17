import { type Abi } from "wagmi";

export type ContractData = {
  contractName: string;
  sourceName: string;
  abi: Abi;
  bytecode: string;
};

export interface AgentInfo {
  agent: string;
  platform: string;
  price: bigint;
  latitude: number;
  longitude: number;
  service: string;
}

export type Role = "None" | "Agent" | "Consumer";

export type BookingStatus = "Pending" | "Completed";

export interface Booking {
  consumer: string;
  agent: string;
  amount: bigint;
  status: BookingStatus;
}
