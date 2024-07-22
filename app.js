const express = require('express');
const { write } = require('fs');
const https = require("https");
const bodyParser = require('body-parser');
// const { url } = require('inspector');
// const { send } = require('process');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/weather.html")
});

app.post("/", function(req, res) {
const query = req.body.cityName;
  const apiKey = "8f81c83559b24197eccf6178a3efe603";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
     res.write("<p>The weather is currently" + weatherDescription +"</p>");
     res.write(`<h1>The temperature in ${query} ${temp} degree Celcius.</h1>`);
     res.write("<img src=" + imageURL + ">");



     res.send();

        });
  });
});
app.listen(3000, function() {
  console.log('Server is running on port 3000');
})
