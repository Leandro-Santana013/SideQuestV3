const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "http://localhost:5173" } });
let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on('newAddUser', ({ id, type }) => {
        if (!onlineUsers.some(user => user.userID === id)) {
            onlineUsers.push({
                userID: id,
                socketId: socket.id,
                type: type === "pro" ? "pro" : "user"
            });
        }
        console.log("usuarios online", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on('sendMessage', (message) => {
        console.log(message);
        const user = onlineUsers.find((user) => user.userID === message.recipientOnChat);
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
        console.log("usuarios online", onlineUsers);
    });
});

io.listen(3000);
