import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ErrorPage from "./Errorpage";
import { useSelector } from "react-redux";

const RegistrationPage = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpField, setOtpFields] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const getUserState = useSelector((state) => {
    return state.users;
  });

  const registrationHandler = (e) => {
    e.preventDefault();
    const emailValidator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !password || !fName) {
      alert("Please fill all fields!");
    } else {
      if (
        emailValidator.test(email) &&
        fName.length >= 3 &&
        password.length >= 8
      ) {
        setLoading(true);
        axios
          .post(`${process.env.REACT_APP_SERVER_API}/user/sign-up`, {
            fName,
            lName,
            email,
            password
          })
          .then((res) => {
            if (res.data.message === "Success") {
              setOtpFields(true);
              setOtpToken(res.data.otpToken);
              alert("Otp has been sent successful!");
            } else {
              setOtpFields(false);
              alert(res.data.error);
            }
            setLoading(false);
          })
          .catch((err) => {
            alert("Something went wrong try again!");
            setLoading(false);
          });
      } else {
        alert(
          "Please fill correct details as per given instruction just after each input box!"
        );
      }
    }
  };

  const optVerifyHandler = (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please fill OTP fields!");
    } else {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_SERVER_API}/user/otp-verify`, {
          otpToken,
          otp,
          fName,
          lName,
          email,
          password
        })
        .then((res) => {
          if (res.data.message === "Success") {
            alert("Registration Successful!");
            setEmail("");
            setPassword("");
            setFname("");
            setLname("");
            setLoading("");
            setOtp("");
            setOtpFields(false);
            navigate("/sign-in");
          } else {
            alert(res.data.error);
          }
          setLoading(false);
        })
        .catch((err) => {
          alert("Something went wrong try again!");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login-token"))) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, []);
  return getUserState.loginToken === undefined ||
    getUserState.loginToken === "" ||
    getUserState.loginToken === null ? (
    <div style={{ width: "90%", margin: "auto", marginTop: "2vh" }}>
      <div style={{ textAlign: "center", marginBottom: "5vh" }}>
        <b style={{ color: "#0084c7", fontSize: "25px" }}>Welcome</b>{" "}
        <span style={{ fontSize: "20px" }}>to the Registration!</span>
      </div>
      <div
        style={{
          maxWidth: "400px",
          display: "block",
          margin: "auto",
          border: "1px solid light-grey",
          padding: "25px",
          boxShadow: "2px 2px 10px 1px #e5e5df",
          borderRadius: "5px",
          backgroundColor: "white"
        }}
      >
        {otpField ? (
          ""
        ) : (
          <form onSubmit={(e) => registrationHandler(e)}>
            <div className="row mb-4">
              <div className="col">
                <div className="form">
                  <label
                    style={{ color: "black" }}
                    className="form-label"
                    htmlFor="form3Example1"
                  >
                    First name
                  </label>
                  <input
                    onChange={(e) => setFname(e.target.value)}
                    value={fName}
                    type="text"
                    id="form3Example1"
                    placeholder="Enter Your First Name Here!"
                    className="form-control"
                  />
                  <span style={{ color: "grey" }}>Minimum 3 letters!</span>
                </div>
              </div>
              <div className="col">
                <div className="form">
                  <label
                    style={{ color: "black" }}
                    className="form-label"
                    htmlFor="form3Example2"
                  >
                    Last name
                  </label>
                  <input
                    onChange={(e) => setLname(e.target.value)}
                    value={lName}
                    type="text"
                    id="form3Example2"
                    placeholder="Enter Your Last Name Here!"
                    className="form-control"
                  />
                  <span style={{ color: "grey" }}>Minimum 3 letters!</span>
                </div>
              </div>
            </div>

            <div className="form mb-4">
              <label
                style={{ color: "black" }}
                className="form-label"
                htmlFor="form3Example3"
              >
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="form3Example3"
                placeholder="Enter Your Email Address Here!"
                className="form-control"
              />
              <span style={{ color: "grey" }}>Fill proper email formate!</span>
            </div>

            <div className="form mb-4">
              <label
                style={{ color: "black" }}
                className="form-label"
                htmlFor="form3Example4"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="form3Example4"
                placeholder="Enter Your Password Here!"
                className="form-control"
              />
              <p style={{ color: "grey" }}>Minimum 8 character!</p>
            </div>

            <button
              disabled={loading ? true : false}
              onClick={(e) => registrationHandler(e)}
              type="submit"
              className="btn btn-primary btn-block mb-4"
              style={{ backgroundColor: "#0084c7" }}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
          </form>
        )}

        {otpField ? (
          <form onSubmit={(e) => optVerifyHandler(e)}>
            <div className="form mb-4">
              <label
                style={{ color: "black" }}
                className="form-label"
                htmlFor="form3Example6"
              >
                OTP
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="number"
                id="form3Example6"
                placeholder="Enter Your OTP Here!"
                className="form-control"
              />
              <p style={{ color: "grey" }}>Minimum 6 numbers!</p>
            </div>

            <button
              onClick={(e) => optVerifyHandler(e)}
              disabled={loading ? true : false}
              type="submit"
              className="btn btn-primary btn-block mb-4"
              style={{ backgroundColor: "#0084c7" }}
            >
              {loading ? "Loading..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          ""
        )}

        <div className="text-center">
          <p>
            Already registered? <NavLink to="/sign-in">Login</NavLink>
          </p>
        </div>
      </div>
      <br />
    </div>
  ) : (
    <ErrorPage />
  );
};

export default RegistrationPage;
