import express from "express";
import http from "http"
import socketIo from "socket.io"
import cors from "cors"
import { appRouter } from "../routes/app.route.js";

export const app = express();

export const server = http.createServer(app)

export const io = socketIo(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(appRouter);
