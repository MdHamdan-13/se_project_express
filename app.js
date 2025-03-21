const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error-handler");
const cors = require("cors");
const indexRouter = require("./routes/index");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

app.use(requestLogger);
app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
