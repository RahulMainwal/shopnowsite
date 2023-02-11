import axios from "axios";
import ErrorPage from "./Errorpage";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLoginToken } from "../store/slices/UserSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserState = useSelector((state) => {
    return state.users;
  });

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields!");
    } else {
      setLoading(true);
      axios
        .put(`${process.env.REACT_APP_SERVER_API}/user/login`, {
          email,
          password
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            if (res.data.message) {
              dispatch(addLoginToken(res.data.message));
              localStorage.setItem(
                "login-token",
                JSON.stringify(res.data.message)
              );
              navigate(-1);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          alert("Something went wrong & try again!");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (getUserState.loginToken !== "") {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, []);
  return JSON.parse(localStorage.getItem("login-token")) === undefined ||
    JSON.parse(localStorage.getItem("login-token")) === "" ||
    JSON.parse(localStorage.getItem("login-token")) === null ? (
    <div style={{ width: "90%", margin: "auto", marginTop: "2vh" }}>
      <div style={{ textAlign: "center", marginBottom: "5vh" }}>
        <b style={{ color: "#0084c7", fontSize: "25px" }}>Welcome</b>{" "}
        <span style={{ fontSize: "20px" }}>to the Login Page!</span>
      </div>
      <form
        onSubmit={(e) => loginHandler(e)}
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
        <div className="mb-4">
          <label
            style={{ color: "black" }}
            className="form-label"
            htmlFor="form2Example1"
          >
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            type="email"
            id="form2Example1"
            placeholder="Enter Your Email Address Here!"
            className="form-control"
            autoComplete="off"
            pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
          />
        </div>

        <div className=" mb-4">
          <label
            style={{ color: "black" }}
            className="form-label"
            htmlFor="form2Example2"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            id="form2Example2"
            placeholder="Enter Your Password Here!"
            className="form-control"
          />
        </div>

        {/* <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example34"
              />
              <label className="form-check-label" htmlFor="form2Example34">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col">
            <NavLink to="">Forgot password?</NavLink>
          </div>
        </div> */}

        <button
          type="submit"
          disabled={loading ? true : false}
          className="btn btn-primary btn-block mb-4"
          style={{ backgroundColor: "#0084c7" }}
          onClick={(e) => {
            loginHandler(e);
          }}
        >
          {loading ? "loading..." : "Sign in"}
        </button>

        <div className="text-center">
          <p>
            Not a member? <NavLink to="/sign-up">Register</NavLink>
          </p>
        </div>
      </form>
      <br />
    </div>
  ) : (
    <ErrorPage />
  );
};

export default LoginPage;
