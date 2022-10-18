import express from "express";
const router = express.Router();

//import controllers
import { signup, signin, googleSignIn } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);

export default router;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
