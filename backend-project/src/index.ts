import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import './controller/index';

import { router } from "./router";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["tripper"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(router);

app.listen(7010, () => {
  console.log("server is running");
});
