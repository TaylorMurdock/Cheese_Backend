// This file sets up the server, database connection, and routes.

// Import necessary dependencies.
require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Establish a connection to the MongoDB database.
mongoose.connect(DATABASE_URL);
mongoose.connection
  .on("open", () => console.log("you are connected to mongoose"))
  .on("close", () => console.log("you are NOT connected to mongoose"))
  .on("error", (error) => console.log(error));

// Use middleware for logging, JSON parsing, and enabling CORS.
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Define the schema for the 'Cheese' model.
const cheeseSchema = new mongoose.Schema({
  name: String,
  countryOfOrigin: String,
  image: String,
});

// Create the 'Cheese' model based on the schema.
const Cheese = mongoose.model("Cheese", cheeseSchema);

app.get("/", (req, res) => {
  res.redirect("/cheese");
});

// Define routes for CRUD operations related to cheese items.
app.get("/cheese", async (req, res) => {
  const cheese = await Cheese.find({});
  res.json(cheese);
});

app.post("/cheese", async (req, res) => {
  const cheese = await Cheese.create(req.body);
  res.json(cheese);
});

app.get("/cheese/:id", async (req, res) => {
  const id = req.params.id;
  const cheese = await Cheese.findById(id);
  res.json(cheese);
});

app.put("/cheese/:id", async (req, res) => {
  const id = req.params.id;
  const cheese = await Cheese.findByIdAndUpdate(id, req.body, { new: true });
  res.json(cheese);
});

app.delete("/cheese/:id", async (req, res) => {
  const id = req.params.id;
  const cheese = await Cheese.findByIdAndDelete(id);
  res.json(cheese);
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
