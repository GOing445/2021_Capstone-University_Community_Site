const express = require('express')
const app = express()
const port = 3000
const db = require('./database')

var fs = require("fs");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

var router = require('./router/main')(app, fs);