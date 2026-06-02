import express from "express";
import authRoute from "./routes/user";
import errorHandler from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/v1/health", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

app.use("/v1/user", authRoute);

app.use(errorHandler);

export default app;
