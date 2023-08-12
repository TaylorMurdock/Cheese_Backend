///////////////////////
//IMPORT DEPENDENCIES//
///////////////////////

require("dotenv").config();
const { PORT, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

///////////////////////
//DATABASE CONNECTION//
///////////////////////

mongoose.connect(DATABASE_URL);
mongoose.connection
  .on("open", () => console.log("you are connected to mongoose"))
  .on("close", () => console.log("you are NOT connected to mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////
////MIDDLEWARE/////
///////////////////////
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

///////////////////////
///////MODELS////////
///////////////////////
const cheeseSchema = new mongoose.Schema({
  name: String,
  countryOfOrigin: String,
  image: String,
});

const Cheese = mongoose.model("Cheese", cheeseSchema);

///////////////////////
///////ROUTES//////////
///////////////////////
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

///////////////////////
///////LISTENER////////
///////////////////////
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
