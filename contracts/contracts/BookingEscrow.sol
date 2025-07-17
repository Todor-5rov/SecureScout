// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BookingEscrow {
    struct Booking {
        uint256 id;
        address consumer;
        address agent;
        uint256 amount;
        bool completed;
        uint256 timestamp;
        string message;
    }

    Booking[] public bookings;
    mapping(address => uint256[]) public bookingsByAgent;
    mapping(address => uint256[]) public bookingsByConsumer;

    event Booked(uint256 indexed bookingId, address indexed consumer, address indexed agent, uint256 amount, string message);
    event Completed(uint256 indexed bookingId);

    function bookAgent(address agent, string memory message) external payable {
        // Payment logic can be added here (e.g., require(msg.value > 0))
        Booking memory booking = Booking({
            id: bookings.length,
            consumer: msg.sender,
            agent: agent,
            amount: msg.value,
            completed: false,
            timestamp: block.timestamp,
            message: message
        });
        bookings.push(booking);
        bookingsByAgent[agent].push(booking.id);
        bookingsByConsumer[msg.sender].push(booking.id);
        emit Booked(booking.id, msg.sender, agent, msg.value, message);
    }

    function completeService(uint256 bookingId) external {
        // Add access control as needed (e.g., only agent or consumer can complete)
        require(bookingId < bookings.length, "Invalid bookingId");
        bookings[bookingId].completed = true;
        emit Completed(bookingId);
    }

    function getBookingsByAgent(address agent) external view returns (Booking[] memory) {
        uint256[] storage ids = bookingsByAgent[agent];
        Booking[] memory result = new Booking[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            result[i] = bookings[ids[i]];
        }
        return result;
    }

    function getBookingsByConsumer(address consumer) external view returns (Booking[] memory) {
        uint256[] storage ids = bookingsByConsumer[consumer];
        Booking[] memory result = new Booking[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            result[i] = bookings[ids[i]];
        }
        return result;
    }

    function getAllBookings() external view returns (Booking[] memory) {
        return bookings;
    }
} 