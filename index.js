const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const signup = require("./routes/signup");
const login = require("./routes/login");
const user=require('./routes/user');
const post=require('./routes/post');

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(cors());

// connecting to mongodb
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch((e) => console.log(e));

app.use("/signup", signup);
app.use("/login", login);
app.use("/user", user);
app.use("/post",post);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
