const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error);

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "678ae5a2109025b2e7367627",
//   };
//   next();
// });

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
