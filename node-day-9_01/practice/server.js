require("dotenv").config();

const express = require('express')
const prisma = require("./src/libs/prisma")
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
