//import models
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const app = express();
dotenv.config();
//Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);
//app.get("/", (req, res) => {
// res.send("Welcome to tour API");
//});

const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === 'production') {
   //Save static files
   app.use(express.static(path.join(__dirname, 'client/build')));
   //GET request and return results to frontend
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 5000;

//Connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export default app;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
