const express = require("express");
const cors = require("cors");
const appRoute = require("./src/routes");

const port = 3000;
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://chubekho.github.io",
];

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
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", appRoute);

app.listen(port, () => {
  console.log(`Server is running on: 127.0.0.1:${port}`);
});
