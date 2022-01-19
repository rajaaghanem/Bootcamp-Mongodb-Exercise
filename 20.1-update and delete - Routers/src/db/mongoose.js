const { LogarithmicScale } = require("chart.js");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/mongoose";

mongoose.connect(url, (error, client) => {
  if (error) {
    return console.log("unable to connect to database");
  }
  console.log("connected correctly");
});
