import mongoose from "mongoose";
//User Schema
const userSchema = mongoose.Schema({
  name: { 
    type: String,
     required: false
    },
  email: { 
    type: String, 
    required: false
  },
  password: { 
    type: String, 
    required: false 
  },
  googleId: { 
    type: String, 
    required: false 
  },
  id: { type: String },
});

export default mongoose.model("User", userSchema);


//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
