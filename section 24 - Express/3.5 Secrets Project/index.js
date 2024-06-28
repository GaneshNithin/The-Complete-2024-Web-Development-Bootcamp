//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const validPassword = "ILoveProgramming";
const port = 3000;

const app = express();

function authenticator(req, res, next) {
  const password = req.body.password;
  if (password === validPassword) {
    next();
  } else {
    res.redirect("/");
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(authenticator);

app.post("/check", (req, res) => {
  res.sendFile(__dirname + "/public/secret.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
