import express from "express";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import { appRouter } from "../routes/app.route.js";
import { Chat } from "../models/chat.model.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(appRouter);

// socket shits
export const server = http.createServer(app);

export const io = socketIo(server);

const usp = io.of("/user-namespace");

const updateUser = (socket) => {
  console.log("User Connected");

  const id = socket.handshake.auth.id;

  //   update online status in the db
  socket.broadcast.emit("currentlyOnline", { id });

  //   chat implementation
  socket.on("newChat", (data) => {
    socket.broadcast.emit("loadNewChats", data);
  });

  // load old chats
  socket.on("oldChatRequest", async (data) => {
    const chats = await Chat.find({
      $or: [
        { senderId: data.sender_id, receiverId: data.receiver_id },
        { senderId: data.receiver_id, receiverId: data.sender_id },
      ],
    });

    socket.broadcast.emit("loadOldChats", { chats: chats });
  });

  // when a user deletes a chat
  socket.on("deletedChat", (id) => {
    socket.broadcast.emit("clearDeletedChats", id);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("currentlyOffline", { id });
    console.log("User Disconnected");
  });
};

usp.on("connection", updateUser);
