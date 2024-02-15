import dotenv from "dotenv";

dotenv.config()

export const PORT  = process.env.PORT
export const nodeEnv = process.env.NODE_ENV
export const localMUrl =process.env.LOCAL_MONGO_URL
export const cloudMUrl = process.env.MONGO_URL