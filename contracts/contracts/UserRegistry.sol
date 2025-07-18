// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract UserRegistry is Ownable, Pausable {
    
    constructor() Ownable(msg.sender) {}
    
    struct Scout {
        address walletAddress;
        string displayName;
        string email;
        string location;
        uint256 totalJobsPosted;
        uint256 totalSpent;
        uint256 averageRating;
        uint256 totalRatings;
        bool isActive;
    }
    
    struct Agent {
        address walletAddress;
        string name;
        string email;
        string serviceType;
        uint256 priceInPAS;
        string location;
        uint256 completedJobs;
        uint256 totalEarnings;
        uint256 averageRating;
        uint256 totalRatings;
        bool isAvailable;
        bool isActive;
    }
    
    // Mappings
    mapping(address => Scout) public scouts;
    mapping(address => Agent) public agents;
    mapping(address => bool) public registeredScouts;
    mapping(address => bool) public registeredAgents;
    
    // Remove dynamic arrays - use mappings instead
    mapping(uint256 => address) public scoutAddresses;
    mapping(uint256 => address) public agentAddresses;
    uint256 public scoutCount = 0;
    uint256 public agentCount = 0;
    
    // Events
    event ScoutRegistered(address indexed scout, string displayName);
    event AgentRegistered(address indexed agent, string name, string serviceType);
    event ScoutUpdated(address indexed scout);
    event AgentUpdated(address indexed agent);
    
    modifier onlyRegisteredScout() {
        require(registeredScouts[msg.sender], "User not registered as scout");
        _;
    }
    
    modifier onlyRegisteredAgent() {
        require(registeredAgents[msg.sender], "User not registered as agent");
        _;
    }
    
    modifier onlyRegisteredUser() {
        require(registeredScouts[msg.sender] || registeredAgents[msg.sender], "User not registered");
        _;
    }
    
    function registerScout(
        string memory displayName, 
        string memory email, 
        string memory location
    ) external whenNotPaused {
        require(!registeredScouts[msg.sender], "Already registered as scout");
        require(!registeredAgents[msg.sender], "Already registered as agent");
        require(bytes(displayName).length > 0, "Display name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(location).length > 0, "Location cannot be empty");
        
        scouts[msg.sender] = Scout({
            walletAddress: msg.sender,
            displayName: displayName,
            email: email,
            location: location,
            totalJobsPosted: 0,
            totalSpent: 0,
            averageRating: 0,
            totalRatings: 0,
            isActive: true
        });
        
        registeredScouts[msg.sender] = true;
        scoutAddresses[scoutCount] = msg.sender;
        scoutCount++;
        
        emit ScoutRegistered(msg.sender, displayName);
    }
    
    function registerAgent(
        string memory name, 
        string memory email, 
        string memory serviceType, 
        uint256 priceInPAS, 
        string memory location
    ) external whenNotPaused {
        require(!registeredAgents[msg.sender], "Already registered as agent");
        require(!registeredScouts[msg.sender], "Already registered as scout");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(serviceType).length > 0, "Service type cannot be empty");
        require(bytes(location).length > 0, "Location cannot be empty");
        require(priceInPAS > 0, "Price must be greater than 0");
        
        agents[msg.sender] = Agent({
            walletAddress: msg.sender,
            name: name,
            email: email,
            serviceType: serviceType,
            priceInPAS: priceInPAS,
            location: location,
            completedJobs: 0,
            totalEarnings: 0,
            averageRating: 0,
            totalRatings: 0,
            isAvailable: true,
            isActive: true
        });
        
        registeredAgents[msg.sender] = true;
        agentAddresses[agentCount] = msg.sender;
        agentCount++;
        
        emit AgentRegistered(msg.sender, name, serviceType);
    }
    
    function getScout(address scoutAddress) external view returns (Scout memory) {
        require(registeredScouts[scoutAddress], "Scout not found");
        return scouts[scoutAddress];
    }
    
    function getAgent(address agentAddress) external view returns (Agent memory) {
        require(registeredAgents[agentAddress], "Agent not found");
        return agents[agentAddress];
    }
    
    // Replace getAllAgents with paginated version to avoid gas issues
    function getAgentsPaginated(uint256 startIndex, uint256 count) external view returns (address[] memory addresses, uint256 totalCount) {
        require(startIndex < agentCount, "Start index out of bounds");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > agentCount) {
            endIndex = agentCount;
        }
        
        uint256 actualCount = endIndex - startIndex;
        addresses = new address[](actualCount);
        
        for (uint256 i = 0; i < actualCount; i++) {
            addresses[i] = agentAddresses[startIndex + i];
        }
        
        totalCount = agentCount;
    }
    
    // Get individual agent data instead of returning full array
    function getAgentAtIndex(uint256 index) external view returns (Agent memory) {
        require(index < agentCount, "Index out of bounds");
        address agentAddress = agentAddresses[index];
        return agents[agentAddress];
    }
    
    function getAgentsByLocation(string memory location) external view returns (address[] memory) {
        uint256 count = 0;
        address[] memory tempAddresses = new address[](agentCount);
        
        for (uint256 i = 0; i < agentCount; i++) {
            if (keccak256(bytes(agents[agentAddresses[i]].location)) == keccak256(bytes(location))) {
                tempAddresses[count] = agentAddresses[i];
                count++;
            }
        }
        
        address[] memory locationAgents = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            locationAgents[i] = tempAddresses[i];
        }
        return locationAgents;
    }
    
    function getAgentsByService(string memory serviceType) external view returns (address[] memory) {
        uint256 count = 0;
        address[] memory tempAddresses = new address[](agentCount);
        
        for (uint256 i = 0; i < agentCount; i++) {
            if (keccak256(bytes(agents[agentAddresses[i]].serviceType)) == keccak256(bytes(serviceType))) {
                tempAddresses[count] = agentAddresses[i];
                count++;
            }
        }
        
        address[] memory serviceAgents = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            serviceAgents[i] = tempAddresses[i];
        }
        return serviceAgents;
    }
    
    function getAvailableAgents() external view returns (address[] memory) {
        uint256 count = 0;
        address[] memory tempAddresses = new address[](agentCount);
        
        for (uint256 i = 0; i < agentCount; i++) {
            if (agents[agentAddresses[i]].isAvailable && agents[agentAddresses[i]].isActive) {
                tempAddresses[count] = agentAddresses[i];
                count++;
            }
        }
        
        address[] memory availableAgents = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            availableAgents[i] = tempAddresses[i];
        }
        return availableAgents;
    }
    
    // Update functions for agents
    function setAgentAvailability(bool isAvailable) external onlyRegisteredAgent {
        agents[msg.sender].isAvailable = isAvailable;
        emit AgentUpdated(msg.sender);
    }
    
    function updateAgentPrice(uint256 newPriceInPAS) external onlyRegisteredAgent {
        require(newPriceInPAS > 0, "Price must be greater than 0");
        agents[msg.sender].priceInPAS = newPriceInPAS;
        emit AgentUpdated(msg.sender);
    }
    
    function updateAgentLocation(string memory newLocation) external onlyRegisteredAgent {
        require(bytes(newLocation).length > 0, "Location cannot be empty");
        agents[msg.sender].location = newLocation;
        emit AgentUpdated(msg.sender);
    }
    
    // Internal functions for other contracts to call
    function incrementScoutJobs(address scout) external {
        // This should only be called by the JobRegistry contract
        require(registeredScouts[scout], "Scout not found");
        scouts[scout].totalJobsPosted++;
        emit ScoutUpdated(scout);
    }
    
    function incrementAgentEarnings(address agent, uint256 amount) external {
        // This should only be called by the PaymentRegistry contract
        require(registeredAgents[agent], "Agent not found");
        agents[agent].totalEarnings += amount;
        agents[agent].completedJobs++;
        emit AgentUpdated(agent);
    }
    
    function updateAgentRating(address agent, uint8 rating) external {
        // This should only be called by the RatingRegistry contract
        require(registeredAgents[agent], "Agent not found");
        Agent storage agentData = agents[agent];
        uint256 totalRating = agentData.averageRating * agentData.totalRatings + rating;
        agentData.totalRatings++;
        agentData.averageRating = totalRating / agentData.totalRatings;
        emit AgentUpdated(agent);
    }
    
    function updateScoutRating(address scout, uint8 rating) external {
        // This should only be called by the RatingRegistry contract
        require(registeredScouts[scout], "Scout not found");
        Scout storage scoutData = scouts[scout];
        uint256 totalRating = scoutData.averageRating * scoutData.totalRatings + rating;
        scoutData.totalRatings++;
        scoutData.averageRating = totalRating / scoutData.totalRatings;
        emit ScoutUpdated(scout);
    }
    
    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
} 