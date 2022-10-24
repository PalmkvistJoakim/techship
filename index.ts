require("express-async-errors");
import error from "./middleware/error";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import application from "./routes/application";
import user from "./routes/user";
import auth from "./routes/auth";
import nodemail from "./routes/nodemail";
import videoask from "./routes/videoAsk";
const app = express();
const Port = 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/application", application);
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/sendemail", nodemail);
app.use("/api/videoask", videoask);
app.use(error);

mongoose
  .connect("mongodb://localhost/techship")
  .then(() => console.log("Connected to Mongodb..."))
  .catch((err) => console.log("Could not connect to Mongodb...", err));

app.listen(Port, () => console.log(`App listen on http://127.0.0.1:${Port}`));
