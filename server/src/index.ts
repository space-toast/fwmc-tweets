import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes";
import { AppDataSource } from "./data/connection";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err);
  });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});