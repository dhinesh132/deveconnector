const express = require("express");
const route = express.Router();

route.get("/test", (req, res) => res.json({ msg: "Users API Works" }));

module.exports = route;
