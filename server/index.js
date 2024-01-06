const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 본문을 위한 파서

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Express Listening @ ${port}`);
});

app.use("/user", userRouter);