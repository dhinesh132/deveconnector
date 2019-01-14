const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrybt = require("bcryptjs");
const route = express.Router();

route.get("/test", (req, res) => res.json({ msg: "Users API Works" }));

//@route Post api/users/resiger
//@desc Resigter User
//@access Public
route.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ Email: "Email Already Exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200,
        p: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrybt.genSalt(10, (err, salt) => {
        bcrybt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = route;
