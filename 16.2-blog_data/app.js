const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017";
const ObjectID = mongodb.ObjectId;
const app = express();

MongoClient.connect(url, function (error, client) {
  // use for to connect to the client
  if (error) {
    return console.log("unable to connect to database");
  }
  console.log("connected correctly");

  const db = client.db("blog-test");
  db.collection("users").createIndex({ email: 1 }, { unique: true });
  db.collection("users").insertMany(
    [
      {
        name: "Rajaa",
        email: "Rajaaghanem@gmail.com",
      },
      {
        name: "Adham",
        email: "adham@gmail.com",
      },
      {
        name: "Adham",
        email: "adham@gmail.com",
      }
    ],
    (error, result) => {
      if (error) {
        return console.log("Unable to insert the users");
      }
    }
  );

  db.collection("posts-new").insertMany(
    [
      {
        title: "Bootcamp fun",
        text: "We are having fun here",
        tags: ["fun", "study"],
        owner: ObjectID("61e6aa52970c93135e32d792"),
        comments: [
          {
            id: new ObjectID(),
            text: "amazing!!",
            owner: ObjectID("61e6aa52970c93135e32d793"),
          },
          {
            id: new ObjectID(),
            text: "thank you",
            owner: ObjectID("61e6aa52970c93135e32d792"),
          },
        ],
      },
      {
        title: "winter depression",
        text: "not fun",
        tags: ["winter", "weather"],
        owner: ObjectID("61e6aa52970c93135e32d793"),
        comments: [
          {
            id: new ObjectID(),
            text: "very sad",
            owner: ObjectID("61e6aa52970c93135e32d792"),
          },
          {
            id: new ObjectID(),
            text: "indeed!!",
            owner: ObjectID("61e6aa52970c93135e32d793"),
          },
        ],
      },
    ],
    (error, result) => {
      if (error) {
        return console.log("Unable to insert the post");
      }
    }
  );
});
