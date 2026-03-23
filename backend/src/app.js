import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

/* MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

export { app };
