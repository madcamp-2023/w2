const express = require('express')
const app = express()
const port = 3000

const userRouter = require("./routes/userRouter");

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Express Listening @ ${port}`);
});

app.use("/user", userRouter);