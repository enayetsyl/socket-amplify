import { useSocket } from "@/context/SocketContext";


const useMeetingSocket = () => {
    const socket = useSocket();

    const startMeeting = (meetingId, moderator, onSuccess, onError) => {
        socket.emit("startMeeting", { meetingId, moderator });

        // Handle responses
        socket.on("startMeetingSuccess", onSuccess);
        socket.on("startMeetingError", onError);
    };

    return { startMeeting };
};

export default useMeetingSocket;
