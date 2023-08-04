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

// mongoose import
const mongoose = require("mongoose");

// middleware imports
const cors = require("cors");
const morgan = require("morgan");

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
// MODELS
///////////////////
const CheeseSchema = new mongoose.Schema({
  name: String,
  countryOfOrigin: String,
  image: String,
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

///////////////////
// MIDDLEWARE
///////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////
// ROUTES
///////////////////

// test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// CHEESE INDEX ROUTE
app.get("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.find({}));
  } catch (error) {
    res.send(400).json(error);
  }
});

// CHEESE CREATE ROUTE
app.post("/cheese", async (req, res) => {
  try {
    res.json(await CheeseSchema.create(req.body));
  } catch (error) {
    res.send(400).json(error);
  }
});

// EDIT CHEESE ROUTE
app.put("/cheese/:id", async (req, res) => {
  try {
    res.json(
      await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE CHEESE ROUTE
app.delete("/cheese/:id", async (req, res) => {
  try {
    res.json(await Cheese.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

///////////////////
// LISTENER
///////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
