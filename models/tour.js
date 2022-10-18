import mongoose from "mongoose";
//tour Schema
const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const TourModel = mongoose.model("Tour", tourSchema);

export default TourModel;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console

