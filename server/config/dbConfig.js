const fs = require("fs");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const password_data = fs.readFileSync("./password.json");
const password = JSON.parse(password_data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: password.password,
  port: conf.port,
  database: conf.database,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL server");
  //console.log("MySQL client version:", connection.client.serverVersion);
});

module.exports = connection;
