import express from "express";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import { appRouter } from "../routes/app.route.js";

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

  socket.on("disconnect", () => {
    socket.broadcast.emit("currentlyOffline", { id });
    console.log("User Disconnected");
  });
};

usp.on("connection", updateUser);
