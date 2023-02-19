import express from "express";
import morgan from "morgan";
import configViewEngine from "./config/viewEngine";
import db from "./config/db";
import { configHeader } from "./app/middleWares";
import route from "./routes";
import { default as dotenv } from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// config data resquest
app.use(express.urlencoded());
app.use(express.json());
app.use(configHeader);

// config view engine
configViewEngine(app);

// connect  database
db.connect();

// morgan logger
app.use(morgan("combined"));

// routes
route(app);
process.on("uncaughtException", (err, origin) => {
  console.log(err);
});

// listenning
app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
