//import components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//If user is not logged in; will be redirected to login page after 5sec
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div style={{ marginTop: "100px" }}>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console

