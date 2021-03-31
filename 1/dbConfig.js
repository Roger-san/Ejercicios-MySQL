const mysql = require("mysql")

const dbInit = () => {
  const bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mokompolk",
    database: "bbdd",
  })

  bd.connect((err) => {
    if (err) console.error(err)
    else console.log("Conexion MYSQL correcta")
  })
  return bd
}
module.exports = {dbInit: dbInit}
