import dotenv from "dotenv";
import app from "./app.js";
import { testDatabaseConnection } from "./config/database.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    await testDatabaseConnection();

    app.listen(port, () => {
      console.log(
        `Backend server running on port ${port}`
      );
    });
  } catch (error) {
    console.error(
      "Backend startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();