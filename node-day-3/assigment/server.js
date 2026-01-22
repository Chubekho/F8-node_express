const express = require("express");
const responseFormat = require("./src/middleware/responseFormat.middleware");
const notFoundHandler = require("./src/middleware/notFoundHandler.middleware");
const exceptionHander = require("./src/middleware/exceptionHandler.middleware");

const port = 3000;

const app = express();
app.use(express.json());

app.use(responseFormat);

//apply route
app.get("/test-success", (_, res) => {
  res.success({ message: "Hello World" });
});

app.get("/test-error", () => {
  throw Error("Test exception");
});

app.use(notFoundHandler);
app.use(exceptionHander);

app.listen(port, () => {
  console.log(`Server is running on: 127.0.0.1:${port}`);
});
