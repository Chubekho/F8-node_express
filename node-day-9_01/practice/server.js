require("dotenv").config();
require("module-alias/register");
require("@root/polyfill");

const express = require("express");
const cors = require("cors");

const rootRoute = require("@/routes");
const customResponse = require("@/middlewares/customResponse");
const errorHandle = require("@/middlewares/errrorHandle");
const notFound = require("@/middlewares/notFoundHandle");

const app = express();
const port = 3000;

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

// Middlewares
app.use(express.json());
app.use(cors());
app.use(customResponse);

// Routes
app.use("/api", rootRoute);

// Error handling
app.use(notFound);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
