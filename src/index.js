import express from "express";
import morgan from "morgan";
import { default as dotenv } from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("combined"));
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World! back end");
});

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`);
});
