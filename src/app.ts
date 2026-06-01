import express from "express";

const app = express();

app.use(express.json());

app.get("/v1/health/", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

export default app;
