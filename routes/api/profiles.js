const express = require("express");
const route = express.Router();

route.get("/test", (req, res) => res.json({ msg: "Profiles API Works" }));

module.exports = route;
