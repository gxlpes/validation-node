const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/cad", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log("Server is running...");
});
