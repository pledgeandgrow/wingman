import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "*",
        methods: ["GET", "POST"],
        credentials: true
      },
      path: '/socket.io',
      transports: ['websocket'],
      pingTimeout: 60000,
      pingInterval: 25000,
      connectTimeout: 45000,
      allowEIO3: true
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on('chat message', (msg) => {
        console.log('message: ' + JSON.stringify(msg));
        io.emit('chat message', msg);

        const notification = {
          id: msg.id,
          receiver_id: msg.receiver_id,
          message: `New message : ${msg.message.substring(0, 50)}...`,
          created_at: msg.created_at,
          is_read: false
        };
        io.emit('new_notification', notification);
      });

      socket.on('new_notification', (notification) => {
        console.log('new notification: ' + JSON.stringify(notification));
        io.emit('new_notification', notification);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    httpServer.listen(port, () => {
      console.log(`> Server is ready on http://${hostname}:${port}`);
    });

  } catch (error) {
    console.error("Error while starting the server:", error);
    process.exit(1);
  }
}

startServer();

