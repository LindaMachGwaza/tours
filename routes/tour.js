//import models
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

//import controllers
import {
  createTour,
  deleteTour,
  getRelatedTours,
  getTour,
  getTours,
  getToursBySearch,
  getToursByTag,
  getToursByUser,
  likeTour,
  updateTour,
} from "../controllers/tour.js";


//Routes
router.get("/search", getToursBySearch);
//get tour using tags
router.get("/tag/:tag", getToursByTag);
//get related tours
router.post("/relatedTours", getRelatedTours);
//get all tours in database
router.get("/", getTours);
//get single tour
router.get("/:id", getTour);
//create tour
router.post("/", auth, createTour);
//delete tour
router.delete("/:id", auth, deleteTour);
//update tour
router.patch("/:id", auth, updateTour);
//get specific user's tours
router.get("/userTours/:id", auth, getToursByUser);
//Like tours
router.patch("/like/:id", auth, likeTour);

export default router;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
