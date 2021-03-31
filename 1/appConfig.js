const bodyParser = require("body-parser")
const express = require("express")
const app = express()

const appInit = () => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
    app.options("*", (req, res) => {
      res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS")
      res.send()
    })
  })

  return app
}

module.exports = {appInit: appInit}
