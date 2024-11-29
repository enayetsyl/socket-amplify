require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const setupMeetingSocket = require("./sockets/meetingSocket");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

setupMeetingSocket(io);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
