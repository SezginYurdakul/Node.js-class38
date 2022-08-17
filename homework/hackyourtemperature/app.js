import express from "express";
import { getWeatherData } from "./getWeatherData.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Weather App");
});

app.post("/weather", getWeatherData);

export default app;
