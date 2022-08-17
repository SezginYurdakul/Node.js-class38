import express from "express";
import fetch from "node-fetch";
import temperatureConvert from "./tempConverter.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Weather Application");
});


app.post("/weather", async (req, res) => {
  const keyAPI = "76fe2b5ed1b39fda8363602df1c72d33";
  const cityName = req.body.cityName;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keyAPI}`;
  try {
    if (!cityName) {
      res.status(400);
      res.send({ weatherMessage: "Please enter a valid city name." });
    }
    const response = await fetch(URL);
    const weatherData = await response.json();

    if (weatherData.cod === "404") {
      res.status(404);
      res.send({ weatherText: weatherData.message });
    } else {
      res.status(200);
      res.send({
        weatherMessage: `The temperature in ${cityName} is ${temperatureConvert(
          weatherData.main.temp
        )} °C!`,
      });
    }
  } catch (err) {
    res.status(500).json({ err: "Ooooops,it seems something is wrong" });
  }
});

export default app;
