import http from "http";
import app from "./app";
import { config } from "dotenv";
import mongoose from "mongoose";
config();
const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGO_URL;
const server = http.createServer(app);

mongoose.connection.on("connected", () => {
  console.log("Mongo db connected");
});
async function startApp() {
  await mongoose.connect(mongoDbUrl!);
  server.listen(port, () => {
    console.log(`Application listening at ${port}`);
  });
}
startApp();
