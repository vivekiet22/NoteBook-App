const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const JWT_TOKEN = "VivekIsAGood$oy";
var fetchuser = require("../middleware/fetchuser")
var jwt = require("jsonwebtoken");


//ROUTE 1: Create a User using :POST "/api/auth/createuser".No login required.

router.post(
  "/createuser",
  [
    body("email", "Enter valid name").isEmail(),
    body("name", "name should be minimum of lenght of 3").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success =false;
    // If there are error, return bad request and teh errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success ,errors: errors.array() });
    }
    // Check whether user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success ,error: "Sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_TOKEN);
      //   console.log(jwtData);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    //       .then(user => res.json(user)).catch(err=>{console.log(err) })
  }
);
//ROUTE 2: Authenticate a User using :POST "/api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success =false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_TOKEN);
      success = true;
    res.json({ success, authtoken })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//ROUTE 3: get logged in user detail using :POST "/api/auth/getuser".login required
router.post("/getuser", fetchuser,async (req, res) => {

  try {
    userId =req.user.id;

    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
