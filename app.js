/* Clear Console*/ console.clear();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


var app = express();
app.listen(8080, () => {
  console.log(`Server started on 8080`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).json({ text: "Ok" });
});
app.use("/api", require("./routes/api"));
