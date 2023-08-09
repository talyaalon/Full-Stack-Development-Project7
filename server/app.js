const express = require("express");
const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

const userRouter = require("./routes/users");
const milkRouter = require("./routes/milk");
const fruitRouter = require("./routes/fruit");
const frozenRouter = require("./routes/frozen");
const cleaningRouter = require("./routes/cleaning");
const basicRouter = require("./routes/basic");

app.use("/users", userRouter);
app.use("/milk", milkRouter);
app.use("/fruit", fruitRouter);
app.use("/frozen", frozenRouter);
app.use("/cleaning", cleaningRouter);
app.use("/basic", basicRouter);

app.listen(3000);
