const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
const data = require("./data/weather.json");

function findWeatherByData(lat, lon) {
  return data.find((weather) => weather.lat == lat && weather.lon == lon);
}

app.get("/weather", (request, response) => {
  const latLon = findWeatherByData(request.query.lat, request.query.lon);

  const weatherData = [
    {
      description: latLon.data[0].weather.description,
      date: latLon.data[0].datetime,
    },
    {
      description: latLon.data[1].weather.description,
      date: latLon.data[1].datetime,
    },
    {
      description: latLon.data[2].weather.description,
      date: latLon.data[2].datetime,
    },
  ];
  response.json(weatherData);
});
