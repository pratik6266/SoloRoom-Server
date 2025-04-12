import express from 'express';
import cors from "cors";
import 'dotenv/config';
import router from './routes/index.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { setupSocket } from './socket.js';
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from './config/redis.config.js';
import { instrument } from "@socket.io/admin-ui";
const port = process.env.PORT || 7000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
    },
    adapter: createAdapter(redis),
});
instrument(io, {
    auth: false,
    mode: "development",
});
export { io };
setupSocket(io);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Its Working 🔥');
});
app.use('/api', router);
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
