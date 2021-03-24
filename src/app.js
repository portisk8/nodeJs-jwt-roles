import express from "express";
import jwt from "jsonwebtoken";
import authController from "./controllers/authController";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authController);

export default app;
