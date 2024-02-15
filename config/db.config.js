import mongoose from "mongoose"
import { cloudMUrl, localMUrl, nodeEnv } from "./constants.config.js";

const selectDb = () => {
  if (nodeEnv == "production") {
    return cloudMUrl;
  } else {
    return localMUrl;
  }
};

export const ConnectDb = async () => {
  try {
    await mongoose.connect(selectDb());

    console.log(`MongoDB Connection Succeeded at ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

