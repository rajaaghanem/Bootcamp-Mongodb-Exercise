const { LogarithmicScale } = require("chart.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const url = "mongodb://localhost:27017/mongoose";

// { useUnifiedTopology: true, useCreateIndex: true }
mongoose.connect(url, (error, client) => {
  if (error) {
    return console.log("unable to connect to database");
  }
  console.log("connected correctly");
});

const proudctDetails = new Schema({
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  Price: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error("Price most be positive number");
    },
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  array: {
    type: Array,
    minLength: 2,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
});

const Details = mongoose.model("details", proudctDetails);

const Product = mongoose.model("Product", {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  details: [proudctDetails],
});

// const firstProductDetails = new Details({
//   description: "a very stylish blue hat",
//   Price: 100,
//   discount: 20,
//   array: ["blue", "hat"],
//   phone: "0533333333",
// });

// const firstProduct = new Product({
//   name: "Blue hat",
//   category: "clothes",
//   isActive: true,
//   details: firstProductDetails,
// });

// firstProduct
//   .save()
//   .then(() => {
//     console.log(firstProduct);
//   })
//   .catch((error) => {
//     console.log("error");
//   });

const secoundProductDetails = new Details({
    description: "plus size red dress",
    Price: 30,
    discount: 0,
    array: ["red", "plus"],
    phone: "0533333334",
  });

const secoundProduct = new Product({
  name: "Red dress",
  category: "clothes",
  isActive: true,
  details: secoundProductDetails,
});

secoundProduct
  .save()
  .then(() => {
    console.log(secoundProduct);
  })
  .catch((error) => {
    console.log("error");
  });
