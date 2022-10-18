//import models
import TourModel from "../models/tour.js";
import mongoose from "mongoose";

//add/create tour function and save to database
export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {        
  //save new tour to database
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

//Get tours from the database
export const getTours = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModel.countDocuments({});
    //find tours in the database. Display 6 tours on a page; if more than 6 the show on next page.
    const tours = await TourModel.find().limit(limit).skip(startIndex);
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Get a single tour
export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Show tours for a specific user. If no tours for that user then show error
export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTours = await TourModel.find({ creator: id });
  res.status(200).json(userTours);
};
//Delete tour from database. Only authorized user can perform this action
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tours exist for user: ${id}` });
    }
    await TourModel.findByIdAndRemove(id);
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Update tour. Authorized users only can perform this action
export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tours exist for user: ${id}` });
    }

    const updatedTour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await TourModel.findByIdAndUpdate(id, updatedTour, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Allow user to search for specific tours from the database
export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModel.find({ title });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Get or search for tours using tags
export const getToursByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModel.find({ tags: { $in: tag } });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Show related tours
export const getRelatedTours = async (req, res) => {
  const tags = req.body;
  try {
    const tours = await TourModel.find({ tags: { $in: tags } });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
//Allow user to like a tour. Only a logged in user can access this functionality
//If no tours for user; return an error
export const likeTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User not authorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tours exist for user: ${id}` });
    }

    const tour = await TourModel.findById(id);

    const index = tour.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      tour.likes.push(req.userId);
    } else {
      tour.likes = tour.likes.filter((id) => id !== String(req.userId));
    }

    const updatedTour = await TourModel.findByIdAndUpdate(id, tour, {
      new: true,
    });

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

  //Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console