import express from "express";
import cors from "cors"
import { appRouter } from "../routes/app.route.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(appRouter);
