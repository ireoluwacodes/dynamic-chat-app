import { app } from "./config/app.config.js";
import { PORT } from "./config/constants.config.js";
import { ConnectDb } from "./config/db.config.js";

export const startApp = async (port) => {
  try {
    await ConnectDb();
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    throw new Error(error);
  }
};

startApp(PORT);
