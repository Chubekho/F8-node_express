require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const appRoute = require("./src/routes");
const response = require("./src/middlewares/response.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const notFound = require("./src/middlewares/notFound.middleware");

const allowedOrigins = ["http://localhost:5173", "https://chubekho.github.io"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
const port = process.env.SERVER_PORT;

app.use(cors(corsOptions));

app.use(express.json());
app.use(response);

app.use("/api", appRoute);

//demo error handling voi errorHandlerMiddleware
app.get("/", (req, res) => {
  throw new Error("CRASHED");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on: 127.0.0.1:${port}`);
});
