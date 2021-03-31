const {appInit} = require("./appConfig")
const {dbInit} = require("./dbConfig")

const app = appInit()
const bd = dbInit()

const PORT = 1006

// GET ALL
app.get("/api/frutas", (req, res) => {
  bd.query("SELECT * FROM frutas", (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// GET ONE
app.get("/api/frutas/:id", (req, res) => {
  bd.query(`SELECT * FROM frutas WHERE id=${req.params.id}`, (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// GET PAGINADO OFFSET
app.get("/api/pageoffset/frutas/", (req, res) => {
  const {limit, offset} = req.body
  const sql = `SELECT * FROM frutas LIMIT ${limit} OFFSET ${offset}`
  bd.query(sql, (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// GET PAGINADO CON PAGE
app.get("/api/page/frutas/", (req, res) => {
  const {page} = req.body
  const CINCO = 5
  const sql = `SELECT * FROM frutas LIMIT ${page * CINCO - CINCO} OFFSET ${CINCO}`
  bd.query(sql, (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// POST
app.post("/api/frutas", (req, res) => {
  const {name, h, w, color, qty} = req.body
  bd.query(
    `INSERT INTO frutas (name, h, w, color, qty) VALUES("${name}", ${h}, ${w}, "${color}", ${qty})`,
    (err, data) => {
      if (err) res.send({status: "fail", result: err})
      else res.send({status: "success", result: data})
    }
  )
})
// PUT
app.put("/api/frutas/:id", (req, res) => {
  const {name, h, w, color, qty} = req.body
  const {id} = req.params
  const sql = `UPDATE frutas SET name=${name},qty=${qty},h=${h},w=${w},color=${color} WHERE id=${id}`
  bd.query(sql, (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// PUT COMPLEJO
app.put("/api/frutas/complejo/:id", (req, res) => {
  const {name, h, w, color, qty} = req.body
  const {id} = req.params
  const sql = `UPDATE frutas SET name = ?, qty = ? WHERE id = ?`
  // la array de abajo sustilulle las ? por orden
  bd.query(sql, [name, qty, id], (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// PUT AVANZADO
app.put("/api/frutas/avanzado/:id", (req, res) => {
  const sql = `UPDATE frutas SET ? WHERE id = ?`

  // al ponerse req.body, solo cojera los parametros que existan
  //por lo que no dara error
  bd.query(sql, [req.body, req.params], (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
// DELETE
app.delete("/api/frutas/:id", (req, res) => {
  const sql = `DELETE FROM frutas WHERE id = ${req.params.id}`
  bd.query(sql, (err, data) => {
    if (err) res.send({status: "fail", result: err})
    else res.send({status: "success", result: data})
  })
})
app.listen(PORT, () => {
  console.log(`api corriendo en el localhost:${PORT}`)
})
