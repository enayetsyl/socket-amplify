const { fakeMeetingData, liveMeetingData } = require("../constant");



const handleStartMeeting = (socket, data) => {
    const { meetingId, moderator } = data;

    const meeting = fakeMeetingData.find((m) => m.meetingId === meetingId);
    if (!meeting) {
        socket.emit("startMeetingError", { message: "Meeting does not exist." });
        return;
    }

    // Check if the meeting is already ongoing in liveMeetingData
    const liveMeeting = liveMeetingData.find((m) => m.meetingId === meetingId);

    console.log('live meeting', liveMeeting)


    if (liveMeeting && liveMeeting.ongoing) {
        socket.emit("startMeetingSuccess", { message: "Meeting is already in progress." });
        return;
    }


    // Mark the meeting as ongoing in liveMeetingData
    if (liveMeeting) {
        liveMeeting.ongoing = true;
    } else {
        liveMeetingData.push({
            meetingId: meetingId,
            moderator: [moderator],
            ongoing: true,
            isStreaming: false,
            participantChat: [],
            observerChat: [],
            waitingRoom: [],
            removedParticipant: [],
            participantList: [],
            observerList: [],
        });
    }
    console.log("live meeting before emit");
    console.dir(liveMeetingData, { depth: null });
    // Notify frontend
    socket.emit("startMeetingSuccess", { message: "Meeting started successfully." });

    // Broadcast to other participants
    socket.broadcast.emit("meetingStarted", { meetingId });
};

module.exports = { handleStartMeeting };
