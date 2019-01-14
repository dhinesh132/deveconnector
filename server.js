const express = require("express");
const moongose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();
//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Connection
const db = require("./config/keys").mongoURI;

moongose
  .connect(db)
  .then(() => console.log("db Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running Port ${port}`));
