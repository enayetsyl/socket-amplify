'use client'
import useMeetingSocket from "@/hooks/useSocket";
import { useState } from "react";

const Home = () => {
    const meetingId = "meeting2"
    const fullName = "John Doe";
    const moderator = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "Moderator"
    }
    const { startMeeting } = useMeetingSocket();
    const [statusMessage, setStatusMessage] = useState("");

    const handleStartMeeting = () => {
        startMeeting(
            meetingId,
            moderator,
            (response) =>{
                setStatusMessage(response.message);
        
                // Navigate to the meeting window if the message is one of the two
                console.log('response', response.message)
                if (
                  response.message === "Meeting is already in progress." ||
                  response.message === "Meeting started successfully."
                ) {
                  window.open(
                    `/meeting/${meetingId}?fullName=${encodeURIComponent(fullName)}&role=Moderator`,
                    "_blank"
                  );
                }
              },
            (error) => setStatusMessage(error.message)
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <button onClick={handleStartMeeting}
            className="bg-black text-white px-5 py-3 rounded-lg"
            >Start Meeting</button>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default Home;
