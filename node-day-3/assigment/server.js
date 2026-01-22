const express = require("express");
const responseFormat = require("./src/middleware/responseFormat.middleware");
const notFoundHandler = require("./src/middleware/notFoundHandler.middleware");
const exceptionHander = require("./src/middleware/exceptionHandler.middleware");
const {
  apiRateLimiter,
  createRateLimiter,
} = require("./src/middleware/rateLimiter");

const appRoute = require("./src/routes");

const port = 3000;

const app = express();
app.use(express.json());

app.use(responseFormat);
app.use(apiRateLimiter);

//apply route
app.use("/api", appRoute);
app.get(
  "/test-success",
  createRateLimiter({
    windowMs: 10 * 60 * 1000,
    maxRequests: 20,
    message: "Try again after 15mins",
  }),
  (_, res) => {
    res.success({ message: "Hello World" });
  },
);

app.get("/test-error", () => {
  throw Error("Test exception");
});

app.get(
  "/test-limit",
  createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    message: "Try again after 15mins",
  }),
  (req, res) => {
    res.success({ message: "test limit" });
  },
);

app.use(notFoundHandler);
app.use(exceptionHander);

app.listen(port, () => {
  console.log(`Server is running on: 127.0.0.1:${port}`);
});
