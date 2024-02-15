import { Router } from "express"
import { getHome } from "../controllers/app.controller.js"

export const appRouter = Router()

appRouter.route("/").get(getHome)