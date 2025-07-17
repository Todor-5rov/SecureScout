// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistry {
    enum Role { None, Agent, Consumer }

    struct AgentProfile {
        address agent;
        string platform;
        uint256 price;
        string location;
        string avatar;
        string description;
    }

    struct ConsumerProfile {
        address consumer;
        string name;
        string avatar;
    }

    mapping(address => Role) public roles;
    mapping(address => AgentProfile) public agents;
    mapping(address => ConsumerProfile) public consumers;

    address[] public agentList;
    address[] public consumerList;

    event Registered(address indexed user, Role role);
    event AgentProfileUpdated(address indexed agent, AgentProfile profile);
    event ConsumerProfileUpdated(address indexed consumer, ConsumerProfile profile);

    function registerAsAgent(
        string memory platform,
        uint256 price,
        string memory location,
        string memory avatar,
        string memory description
    ) external {
        require(roles[msg.sender] == Role.None, "Already registered");
        roles[msg.sender] = Role.Agent;
        AgentProfile memory profile = AgentProfile(
            msg.sender, platform, price, location, avatar, description
        );
        agents[msg.sender] = profile;
        agentList.push(msg.sender);
        emit Registered(msg.sender, Role.Agent);
        emit AgentProfileUpdated(msg.sender, profile);
    }

    function updateAgentProfile(
        string memory platform,
        uint256 price,
        string memory location,
        string memory avatar,
        string memory description
    ) external {
        require(roles[msg.sender] == Role.Agent, "Not an agent");
        AgentProfile storage profile = agents[msg.sender];
        profile.platform = platform;
        profile.price = price;
        profile.location = location;
        profile.avatar = avatar;
        profile.description = description;
        emit AgentProfileUpdated(msg.sender, profile);
    }

    function registerAsConsumer(string memory name, string memory avatar) external {
        require(roles[msg.sender] == Role.None, "Already registered");
        roles[msg.sender] = Role.Consumer;
        ConsumerProfile memory profile = ConsumerProfile(msg.sender, name, avatar);
        consumers[msg.sender] = profile;
        consumerList.push(msg.sender);
        emit Registered(msg.sender, Role.Consumer);
        emit ConsumerProfileUpdated(msg.sender, profile);
    }

    function updateConsumerProfile(string memory name, string memory avatar) external {
        require(roles[msg.sender] == Role.Consumer, "Not a consumer");
        ConsumerProfile storage profile = consumers[msg.sender];
        profile.name = name;
        profile.avatar = avatar;
        emit ConsumerProfileUpdated(msg.sender, profile);
    }
    
    function getAllAgents() external view returns (AgentProfile[] memory) {
        AgentProfile[] memory result = new AgentProfile[](agentList.length);
        for (uint i = 0; i < agentList.length; i++) {
            result[i] = agents[agentList[i]];
        }
        return result;
    }

    function getAllConsumers() external view returns (ConsumerProfile[] memory) {
        ConsumerProfile[] memory result = new ConsumerProfile[](consumerList.length);
        for (uint i = 0; i < consumerList.length; i++) {
            result[i] = consumers[consumerList[i]];
        }
        return result;
    }
    
} 