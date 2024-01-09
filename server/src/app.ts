import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import authRouter from "./routes/user.router";
import { MongoClient } from "mongodb";
import cors from "cors";
import cookieParser from "cookie-parser";
import socketIO from "socket.io";
import http from "http";
import { MessageController } from "./controllers/message.controller";
import postRouter from "./routes/post.router";
import followRouter from "./routes/follow.router";
import likeRouter from "./routes/like.router";
import favoriteRouter from "./routes/favorite.router";
import commentRouter from "./routes/comment.router";
const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const messageController = new MessageController();
const port = process.env.PORT;
/* DB CONNECTION */

/* MIDDLEWARE */
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
/* ROUTES */
app.use("/api", authRouter);
app.use("/api", postRouter)
app.use("/api", followRouter)
app.use("/api", likeRouter)
app.use("/api", favoriteRouter)
app.use("/api", commentRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/* SOCKET */

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send_message", ({ content, senderId, receiverId }) => {
    messageController.sendMessage(content, receiverId, senderId, io);
  });
});

const SERVER_PORT = process.env.SERVER_PORT;
server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
