import express from "express";
import { createShortUrl, getUrlStatistics, redirectUrl } from "./controllers";

const app = express();
app.use(express.json());
app.post("/short", createShortUrl);
app.get("/statistics/:shortId", getUrlStatistics);
app.get("/:shortId", redirectUrl);
export default app;
