//import components
import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

//Allow only authorized users to perform actions on a dashboard
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return user ? children : <LoadingToRedirect />;
};

export default PrivateRoute;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console

