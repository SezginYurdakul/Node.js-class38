import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";
import temperatureConverter from "./tempConverter.js";
const app = express();
app.use(express.json());

export const getWeatherData = async (req, res) => {
  const { API_KEY } = keys;
  const { cityName } = req.body;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`;

  try {
    if (!cityName) {
      res.status(404);
      res.send({ errorMessage: "Please provide City name" });
    } else {
      const weatherResponse = await fetch(URL);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod === "404") {
        res.status(404);
        res.send({
          weatherAppMessage: `${weatherData.message.toUpperCase()}, Please check your City Name`,
        });
      } else {
        res.status(200);
        const tempKelvin = weatherData.main.temp;
        const tempCelsius = temperatureConverter(tempKelvin);
        res.send({
          weatherMessage: `The temperature in ${weatherData.name} is ${tempCelsius} °C !`,
        });
      }
    }
  } catch (err) {
    res.status(500);
    res.send({
      errorMessage: "There is something wrong, please try again later.",
    });
  }
};
