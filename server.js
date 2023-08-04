///////////////////
// DEPENDENCIES
///////////////////

// get .env
require("dotenv").config();

//pull MONGODB_URL and port from .env and give it port 3000
const { PORT = 3000, MONGODB_URL } = process.env;

//import express
const express = require("express");

//app object
const app = express();

// mongoose imort
const mongoose = require("mongoose");

///////////////////
// DATABASE CONNECTION
///////////////////

// making connection to the db
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
//connection events
mongoose.connection
  .on("open", () => console.log("mongoose is connected"))
  .on("close", () => console.log("mongoose is disconnected"))
  .on("error", (error) => console.log(error));

///////////////////
// ROUTES
///////////////////

// test route
app.get("/", (req, res) => {
  res.send("hello world");
});

///////////////////
// LISTENER
///////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
