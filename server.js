const express = require("express");
const app = express();
const axios = require("axios");

const cors = require("cors");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));

app.get("/weather", async (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const API = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  const res = await axios.get(API);

  const movieAPI = `https://api.themoviedb.org/3/search/movie?query=${res.data.data[0].city_name}&api_key=${process.env.MOVIE_API_KEY}`;
  const movieRes = await axios.get(movieAPI);
  console.log(movieRes.data);

  const weatherData = res.data.data.map((place) => {
    return {
      description: place.weather.description,
      date: place.datetime,
      temp: place.temp,
      icon: place.weather.icon,
      title: movieRes.data.results[0].original_title,
      overview: movieRes.data.results[0].overview,
      popularity: movieRes.data.results[0].popularity,
    };
  });

  console.log(weatherData);
  response.json(weatherData);
});
