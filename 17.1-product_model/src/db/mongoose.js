const { LogarithmicScale } = require("chart.js");
const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const url = "mongodb://localhost:27017/mongoose";

mongoose.connect(url, (error, client) => {
  if (error) {
    return console.log("unable to connect to database");
  }
  console.log("connected correctly");
});

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

  details: {
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
      type: [String],
      minItems: 2,
    },
    phone: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, "he-IL"))
          throw Error("not valid phone number");
      },
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
});

const thirdProduct = new Product({
  name: "test",
  category: "clothes",
  isActive: true,
  details: {
    description: "plus size purple dress",
    Price: 30,
    discount: 0,
    array: ["dress", "plus"],
    phone: "0539999999",
  },
});

thirdProduct
  .save()
  .then(() => {
    console.log(thirdProduct);
  })
  .catch((error) => {
    console.log("error, one of the fileds is not correct");
  });
