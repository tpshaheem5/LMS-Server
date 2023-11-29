const express = require("express");
const app = express();
const userSchema = require("../Model/userDatabase");
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")
require("dotenv").config()
const signup = async (req, res) => {
  console.log(req.body);

  try {
    const password=req.body.password
    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new userSchema({
      firstname: req.body.firstname,
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      address: req.body.address
    
    });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error while saving user data:", error);
    res.status(500).json({ error: "Failed to register user", message: error.message });
  }
};

//****************** user login ***************** */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await userSchema.findOne({ email: email });
    console.log("check the user",checkUser)

    if (!checkUser) {
      return res.status(404).json({ status: "failure", message: "Invalid email" });
    }

    // Use bcrypt.compareSync instead of bcrypt.compare
    if (!bcrypt.compareSync(password, checkUser.password)) {
      return res.status(404).json({ status: "failure", message: "Invalid password" });
    }

    const user_id = checkUser._id;
    const token = jwt.sign({id:user_id},process.env.SECRET_KEY);

    res.json({
      status: "success",
      message: "Successfully logged in",
      email: email,
      token: token,
      User: checkUser,
      user_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failure", message: "Something went wrong...", error_message: error.message });
  }
};


module.exports = { signup,login };
