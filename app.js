const express = require('express');
const { write } = require('fs');
const https = require("https");
// const { url } = require('inspector');
// const { send } = require('process');

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=8f81c83559b24197eccf6178a3efe603&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
     const weatherData = JSON.parse(data)
     const temp = weatherData.main.temp
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
     res.write("<p>The weather is currently" + weatherDescription +"</p>");
     res.write("<h1>The temperature in Lagos "+ temp + " degree Celcius.</h1>");
     res.write("<img src=" + imageURL + ">");



     res.send();
    })
  } )

})








app.listen(3000, function() {
  console.log('Server is running on port 3000');
})
