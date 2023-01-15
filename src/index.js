import express from "express";
import morgan from "morgan";
import { default as dotenv } from "dotenv";
import configViewEngine from "./config/viewEngine";
import { engine } from "express-handlebars";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// config data resquest
app.use(express.urlencoded());
app.use(express.json());

// config view engine
configViewEngine(app);

// morgan logger
app.use(morgan("combined"));

// routes
app.get("/", (req, res) => {
  res.render("home");
});

// listenning
app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
