import express from "express";
import {
  createShortUrl,
  deleteUrl,
  getUrlDetails,
  getUrlStatistics,
  redirectUrl,
  updateUrl,
} from "./controllers";

const app = express();
app.use(express.json());
app.post("/short", createShortUrl);
app.get("/statistics/:shortId", getUrlStatistics);
app.get("/:shortId", redirectUrl);
app.get("/details/:shortId", getUrlDetails);
app.put("/:shortId", updateUrl);
app.delete("/:shortId", deleteUrl);
export default app;
