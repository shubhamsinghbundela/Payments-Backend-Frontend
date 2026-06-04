import express from "express";
import authRoute from "./routes/user";
import accountRoute from "./routes/account";
import errorHandler from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.get("/v1/health", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

app.use("/v1/user", authRoute);
app.use("/v1/account", accountRoute);

app.use(errorHandler);

export default app;
