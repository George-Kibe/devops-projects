import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello from a container: Acquisitions API",
    service: "hello Node",
    pod: process.env.POD_NAME || "Not specified",
    time: new Date().toISOString(),
  });
});

app.get("/ready", (req, res) => {
  res.json({
    message: "Application is ready, up and running",
    service: "hello Node",
    status: 200,
    pod: process.env.POD_NAME || "Not specified",
    time: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    message: "Application health status is OKAY",
    status: 200,
    time: new Date().toISOString(),
  });
});

export default app;
