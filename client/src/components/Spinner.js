//import components
import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

//Function to show spinner when page is loading
const Spinner = () => {
  return (
    <MDBSpinner
      className="me-2"
      style={{ width: "3rem", height: "3rem", marginTop: "100px" }}
    >
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  );
};

export default Spinner;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console

