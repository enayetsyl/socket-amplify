const { handleStartMeeting } = require("../events/meetingEvents");

const setupMeetingSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Listen for the startMeeting event
        socket.on("startMeeting", (data) => handleStartMeeting(socket, data));
    });
};

module.exports = setupMeetingSocket;
