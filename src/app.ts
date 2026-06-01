import express from "express";
import authRoute from "./routes/user";

const app = express();

app.use(express.json());

app.get("/v1/health", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

app.use("/v1/user", authRoute);

export default app;
