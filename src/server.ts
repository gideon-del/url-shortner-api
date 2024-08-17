import http from "http";
import app from "./app";
import { config } from "dotenv";
import mongoose from "mongoose";
config();
const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGO_URL;
const server = http.createServer(app);

async function startApp() {
  server.listen(port, () => {
    console.log(`Application listening at ${port}`);
  });
}
startApp();
