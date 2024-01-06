const express = require('express')
const app = express()
const port = 3000
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors")

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "gowns1093@@",
	database: "w2",
});

connection.connect()

const userRouter = require("./routes/userRouter");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Express Listening @ ${port}`);
});

app.use("/user", userRouter);
