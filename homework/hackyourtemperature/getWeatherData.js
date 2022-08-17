import express from "express";
import fetch from "node-fetch";
import keys from "../sources/keys.js";
const app = express();
export const getWeather = async (req, res) => {
  const { cityName } = req.body;

  if (cityName) {
    try {
      const weatherDataResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`
      );
      const weatherData = await weatherDataResponse.json();
      res.status(400);
      res.send({ weatherMessage: "Please enter a valid city name." });
    } catch (err) {
      res.status(404);
      res.send({ errorMessage: "Please provide Valid City name" });
    }
  } else {
    res.status(404);
    res.send({ errorMessage: "Oooops There is something Wrong, Please try again later !!" });
  }
};
