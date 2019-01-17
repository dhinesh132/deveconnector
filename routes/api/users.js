const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrybt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const password = require("passport");

//to get secret Key
const keys = require("../../config/keys");

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

route.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //@route Post api/users/login
  //@desc Login User/ creating JWT
  //@access Public

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "User Not Exist" });
    }

    bcrybt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ sucess: "true", token: token });
        });
      } else {
        return res.status(400).json({ message: "Password Incorrect" });
      }
    });
  });
});

//@route Post api/users/current
//@desc Loged-in user details
//@access Private

route.get(
  "/current",
  password.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = route;
