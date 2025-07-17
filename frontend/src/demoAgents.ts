export interface DemoAgent {
  id: string;
  name: string;
  avatar: string;
  service: string;
  location: string;
  price: number;
  description: string;
}

export const demoAgents: DemoAgent[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    service: "Cybersecurity Consultant",
    location: "Berlin, Germany",
    price: 120,
    description:
      "Expert in penetration testing and security audits for web3 projects.",
  },
  {
    id: "2",
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    service: "Smart Contract Auditor",
    location: "Seoul, South Korea",
    price: 150,
    description:
      "Specialist in Solidity smart contract reviews and DeFi security.",
  },
  {
    id: "3",
    name: "Maria Garcia",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    service: "Blockchain Forensics",
    location: "Madrid, Spain",
    price: 100,
    description:
      "Tracking and analyzing blockchain transactions for compliance.",
  },
  {
    id: "4",
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    service: "Incident Response",
    location: "New York, USA",
    price: 130,
    description: "Rapid response to security incidents and threat mitigation.",
  },
  {
    id: "5",
    name: "Sophie Lee",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    service: "Security Awareness Trainer",
    location: "London, UK",
    price: 90,
    description:
      "Educating teams on best security practices in the crypto space.",
  },
  // Add more made-up agents for demo polish
  {
    id: "6",
    name: "Ethan Brown",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    service: "Web3 Security Advisor",
    location: "Toronto, Canada",
    price: 110,
    description: "Advising startups on secure dApp development.",
  },
  {
    id: "7",
    name: "Lina Müller",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    service: "Crypto Compliance Expert",
    location: "Zurich, Switzerland",
    price: 140,
    description: "Ensuring regulatory compliance for crypto businesses.",
  },
];
