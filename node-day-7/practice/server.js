require("dotenv").config();
const port = process.env.SERVER_PORT;

const express = require("express");
const app = express();

const appRoute = require("./src/routes");

const response = require("./src/middlewares/response.middleware");
const notFound = require("./src/middlewares/notFound.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");


app.use(express.json());
app.use(response);

app.use("/api", appRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on 127.0.0.1:${port}`);
});
