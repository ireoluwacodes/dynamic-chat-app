import express from "express";
import http from "http"
import socketIo from "socket.io"
import cors from "cors"
import { appRouter } from "../routes/app.route.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(appRouter);

// socket shits
export const server = http.createServer(app)

export const io = socketIo(server)

const usp = io.of("/user-namespace")

const updateUserOnlineStatus = (socket)=>{
    console.log("User Connected")

    const id = socket.handshake.auth.id


    socket.broadcast.emit("currentlyOnline", {id: user._id})

    socket.on("disconnect", ()=>{
        console.log("User Disconnected")
    })
}

usp.on("connection", updateUserOnlineStatus)
