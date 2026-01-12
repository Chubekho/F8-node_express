const express = require("express");
const appRoute = require("./src/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", appRoute);

app.listen(port, () => {
  console.log("Server is listening on port: ", port);
});
