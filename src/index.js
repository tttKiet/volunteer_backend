import express from "express";
import morgan from "morgan";
import configViewEngine from "./config/viewEngine";
import db from "./config/db";
import { configHeader } from "./app/middleWares";
import route from "./routes";
import cors from "cors";
import { default as dotenv } from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// config data resquest
app.use(express.urlencoded());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // chỉ cho phép truy cập từ domain này []
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // chỉ cho phép sử dụng các phương thức này
    // allowedHeaders: ["Content-Type"], // chỉ cho phép sử dụng các header này
  })
);

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
