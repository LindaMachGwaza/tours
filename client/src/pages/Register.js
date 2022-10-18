//import components
import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//Function for the Registration page which allows user to register if is a new user
const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
//show error using toast
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
 //if email and password match then allow user to register and navigate to homepage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
 //Used MDB ui  to create and style the form. If user has no account then can navigate to sign up page
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide confirm password"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {/*if sign in page is loading then show the spinner */}
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already a user ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;

//Sources used include HyperionDev notes, previous tasks, Google, Stackoverflow, Github, YouTube and Google console
