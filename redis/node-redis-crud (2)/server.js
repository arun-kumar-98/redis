const cors = require("cors");
const body_parser = require("body-parser");

require("dotenv").config();

const express = require("express");
const app = express();

const user_che = require("./src/entity/user");

const db = require("./database");
const e = require("express");
const router = require("./src/router/router");

app.use(cors());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use("/", router);

//checking db connection establishing
db.sync({ alter: true })
  .then(function () {
    console.log("database connected!");
  })
  .catch(function () {
    message: "unable to connect to db";
    console.log(message);
  });

async function run() {
  try {
    await db.authenticate();
    app.listen(process.env.port, () => {
      console.log(`server listening at port ${process.env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();
