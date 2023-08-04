// DEPENDENCIES

// get .env
require("dotenv").config();

//pull port from .env and give it port 3000
const { PORT = 3000 } = process.env;

//import express
const express = require("express");

//app object
const app = express();

// ROUTES

// test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
