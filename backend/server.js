const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  DOB: Date,
  phone: Number,
  gender: String,
});

const FormData = mongoose.model("FormData", FormDataSchema);

app.post("/submit-form", async (req, res) => {
  const { name, email, DOB, phone, gender } = req.body;

  const newFormData = new FormData({
    name,
    email,
    DOB,
    phone,
    gender,
  });

  try {
    await newFormData.save();
    res.status(200).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Error saving data");
  }
});

app.get("/get-data", async (req, res) => {
  try {
    const allFormData = await FormData.find();
    res.status(200).json(allFormData);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});


app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    res.status(200).send("Successfully logged in");
  } else {
    res.status(401).send("Invalid credentials");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
