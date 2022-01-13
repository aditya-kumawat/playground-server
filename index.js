const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
const port = 3001

app.post('/transform', (req, res) => {
  const code = req.body.code;
  
  const transformed = require("@babel/core").transformSync(code, {
    // "presets": ["@babel/preset-typescript"],
    plugins: [
        '@babel/plugin-transform-react-jsx',
        ["@babel/plugin-transform-typescript", {
            allExtensions: true,
            isTSX: true,
        }]
    ],
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(transformed);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})