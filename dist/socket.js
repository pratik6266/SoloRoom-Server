import prisma from "./config/db.config.js";
export function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid Room"));
        }
        socket.room = room;
        next();
    });
    io.on('connection', (socket) => {
        socket.join(socket.room);
        socket.on('message', async (data) => {
            await prisma.chats.create({
                data: data
            });
            socket.to(socket.room).emit("message", data);
        });
        socket.on('disconnect', () => {
            console.log("A user disconnected: ", socket.id);
        });
    });
}
