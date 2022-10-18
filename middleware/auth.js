import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "test";
//Find and verify user and set credentials and actions of tour creation
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //check if user is logged in using email and name
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      //check if user is signed up using google
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await UserModel.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
