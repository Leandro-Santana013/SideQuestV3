const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });
let onlineUsers = []
io.on("connection", (socket) => {
    console.log("new connection", socket.id)


    socket.on('newAddUser', ({ id, type }) => {
        if (!onlineUsers.some(user => user.userID === id)) {
            onlineUsers.push({
                userID: id,
                socketId: socket.id,
                type: type === "pro" ? "pro" : "user"
            });
        }
        console.log("usuarios online", onlineUsers);
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    })
    
    console.log("usuarios online", onlineUsers)
    io.emit("getOnlineUsers", onlineUsers);
});

io.listen(3000);