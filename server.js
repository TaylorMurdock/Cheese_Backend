////////////////////////////
// IMPORT OUR DEPENDENCIES
////////////////////////////
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////
// DATABASE CONNECTION
///////////////////////////
const { PORT = 8000, MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////
// Models
////////////////////////////
const cheeseSchema = new mongoose.Schema({
  name: String,
  image: String,
  countryOfOrigin: String,
});

const Cheeses = mongoose.model("Cheeses", cheeseSchema);

//////////////////////////////
// Middleware
//////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

////////////////////////////
// ROUTES
////////////////////////////
app.get("/cheeses", async (req, res) => {
  try {
    const cheeses = await Cheeses.find({});
    res.json(cheeses);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/cheeses", async (req, res) => {
  try {
    const cheese = await Cheeses.create(req.body);
    res.json(cheese);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/cheeses/:id", async (req, res) => {
  try {
    const cheese = await Cheeses.findById(req.params.id);
    res.json(cheese);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.put("/cheeses/:id", async (req, res) => {
  try {
    const cheese = await Cheeses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(cheese);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete("/cheeses/:id", async (req, res) => {
  try {
    const cheese = await Cheeses.findByIdAndDelete(req.params.id);
    res.status(204).json(cheese);
  } catch (error) {
    res.status(400).json({ error });
  }
});

////////////////////////////
// LISTENER
////////////////////////////
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
