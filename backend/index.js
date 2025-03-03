import cookieParser from "cookie-parser";
import cors from "cors";
import express from 'express'
import dotenv from 'dotenv';
import morgan from "morgan";
import routes from './routes/index.js';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express()

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", routes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running");

})