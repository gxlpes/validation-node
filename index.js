const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

// config session
app.use(
  session({
    secret: "ChaveSegredo",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.errorsSession) {
    let arrayErrors = req.session.errorsSession;
    return res.render("index");
  }
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/formData", (req, res) => {
  // getting input form data
  console.log(req.Params.body.name);
  let name = req.body.name;
  let email = req.body.email;
  let exp = req.body.exp;
  let comments = req.body.comments;

  // storing errors
  const errors = [];

  // cleaning inputs
  name = name.trim();
  email = email.trim();
  name = name.replace(/[^A-zÀ-ú\s]/gi, "");

  // verify empty name
  if (name == " " || typeof name == undefined || name == null) {
    errors.push({ msg: "Empty input" });
  }

  // checking if name is valid just letters
  if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/.test(name)) {
    errors.push({ msg: "Invalid name" });
  }

  // checking email
  if (email == " " || typeof email == undefined || email == null) {
    errors.push({ msg: "Empty email input" });
  }

  // checking if email is valid
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push({ msg: "Email input invalid" });
  }

  // checking errors display
  if (errors.length > 0) {
    console.log(errors);
    req.session.errorsSession = errors;
    req.session.successSession = false;
    return res.redirect("/");
  }

  // if success
  console.log("Validação feita!");
  req.session.successSession = true;
});

app.listen(port, () => {
  console.log("Server is running...");
});
