import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

/* MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/* ROUTE IMPORTS */
import authRouter from "./routes/auth.routes.js";

/* ROUTES */
app.use("/api/auth", authRouter);

export { app };
