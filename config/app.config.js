import express from "express";
import http from "http"
import socketIo from "socket.io"
import cors from "cors"
import { appRouter } from "../routes/app.route.js";

export const app = express();

export const server = http.createServer(app)

export const io = socketIo(server)

const usp = io.of("/user-namespace")

usp.on("connection", updateUserOnlineStatus)

const updateUserOnlineStatus = (socket)=>{
    console.log("User Connected")

    console.log(socket.handshake.auth.id)

    socket.on("disconnect", ()=>{
        console.log("User Disconnected")
    })
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(appRouter);
