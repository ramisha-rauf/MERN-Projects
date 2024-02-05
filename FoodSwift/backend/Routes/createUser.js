const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecretKey = "!MySecondNameIs#Misha%"

//SIGNUP LOGIC
router.post(
  "/signup",
  body("email", "Email is invalid").isEmail(),
  body("name", "There must be 5 characters").isLength({ min: 5 }),
  body("password", "Incorrect Password").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      let securePswd = await bcrypt.hash(req.body.password,salt);

      await User.create({
        name: req.body.name,
        password: securePswd,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);


//LOGIN LOGIC
router.post(
  "/login",
  body("email", "Email is invalid").isEmail(),
  body("password", "Incorrect Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct email" });
      }
     const comapredPswd = await bcrypt.compare(req.body.password,userData.password)
      if (!comapredPswd) {
        return res.json({errors:"Try logging with correct password" });
      }

      const data = {
        user:{
            id:userData.id
        }
      }

      const authToken = jwt.sign(data,jwtSecretKey)
      return res.json({success:true, authToken:authToken})
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
