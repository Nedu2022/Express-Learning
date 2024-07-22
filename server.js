const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var operation = req.body.operation;
  var result;

  if (operation === 'add') {
    result = num1 + num2;
  } else if (operation === 'subtract') {
    result = num1 - num2;
  } else if (operation === 'multiply') {
    result = num1 * num2;
  } else if (operation === 'divide') {
    result = num1 / num2;
  } else {
    return res.status(400).send("Invalid operation");
  }

  res.send("The result of the calculation is " + result);

});

app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator.html", function(req,res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  
  var result = weight / (height * height);
  res.send(`Your BMI is ${result}`);
}) 


app.listen(3000, function() {
  console.log("Server is running on port 3000")
});
