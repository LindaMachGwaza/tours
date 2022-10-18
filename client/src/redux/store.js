import { configureStore } from "@reduxjs/toolkit";
//import reducers
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console