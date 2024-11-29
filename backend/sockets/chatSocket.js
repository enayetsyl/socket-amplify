module.exports = (io, socket) => {
  // Handle chat messages
  socket.on("chatMessage", (data) => {
      console.log("Chat message received:", data);
      io.emit("chatBroadcast", { message: data.message, sender: data.sender });
  });

  // Handle typing indicator
  socket.on("typing", (data) => {
      socket.broadcast.emit("typing", { sender: data.sender });
  });
};


