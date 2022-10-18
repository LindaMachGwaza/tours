//import modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "test";
//user sign in function.
//check if user has signed up first. If signed up then allow sign in otherwise send an error
//if user already exist then compare password and allow sign in; else send an error
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
//user sign up function
//If user already exists then return an error. Only new user can sign up.
//password hashed for security reasons and has a length of 12 characters. The jwt token expires after an hour
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
//Sign in using google. 
export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }
      //send user details to mongodb
    const result = await UserModel.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

  //Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console