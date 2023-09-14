import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Errorpage from "./Errorpage";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const getUserState = useSelector((state) => {
    return state.users;
  });
  const navigate = useNavigate();

  const updateProfileHandler = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    axios
      .put(`${process.env.REACT_APP_SERVER_API}/user/profile/update`, {
        fisrtName: fName,
        lastName: lName,
        email,
        password,
        avatar,
        loginToken: getUserState.loginToken
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          setBtnLoading(false);
        }
        if (res.data.message) {
          if (res.data.message === "Success") {
            alert("Data updated successfully!");
            setBtnLoading(false);
          }
        }
      })
      .catch((err) => {
        alert(err.error);
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (getUserState.loginToken !== "") {
      axios
        .post(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
          loginToken: getUserState.loginToken
        })
        .then((data) => {
          if (data.data.message === null) {
            setLoading(false);
            setUser("");
            navigate("/");
          } else {
            if (data.data.message) {
              setUser(data.data.message);
              setFname(data.data.message.fisrtName);
              setLname(data.data.message.lastName);
              setEmail(data.data.message.email);
              setPassword("");
              setAvatar(data.data.message.avatar);
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          alert("Server issue & try again!");
          setLoading(false);
        });
    } else {
      setUser("");
      navigate("/");
      setLoading(false);
    }
  }, [getUserState]);
  return loading ? (
    <Loader />
  ) : user === "" ? (
    <Errorpage />
  ) : (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "2vh",
        marginBottom: "50px"
      }}
    >
      <form
        onSubmit={(e) => updateProfileHandler(e)}
        style={{
          maxWidth: "500px",
          display: "block",
          margin: "auto",
          border: "1px solid light-grey",
          padding: "15px 25px 5px 25px",
          boxShadow: "2px 2px 10px 1px #e5e5df",
          borderRadius: "5px",
          backgroundColor: "white"
        }}
      >
        <div className="form mb-4">
          <div style={{ textAlign: "center" }}>
            <b>
              <label
                style={{ color: "black", fontSize: "25px" }}
                className="form-label"
                htmlFor="form3Example1"
              >
                Edit Profile
              </label>
            </b>
          </div>
        </div>

        <div className="form mb-4">
          <label
            style={{ color: "black" }}
            className="form-label"
            htmlFor="form3Example2"
          >
            First Name
          </label>
          <input
            onChange={(e) => setFname(e.target.value)}
            value={fName}
            type="text"
            id="form3Example2"
            placeholder="Enter Your First Name Here"
            className="form-control"
          />
        </div>

        <div className="form mb-4">
          <label
            style={{ color: "black" }}
            className="form-label"
            htmlFor="form3Example3"
          >
            Last Name
          </label>
          <input
            onChange={(e) => setLname(e.target.value)}
            value={lName}
            type="text"
            id="form3Example3"
            placeholder="Enter Your Last Name Here"
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <label
            style={{ color: "black" }}
            className="form-label"
            htmlFor="form2Example4"
          >
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            type="email"
            id="form2Example4"
            placeholder="Enter Your Email Address Here!"
            className="form-control"
            autoComplete="off"
          />
        </div>

        <div className="form mb-4">
          <label
            style={{ color: "black" }}
            className="form-label"
            htmlFor="form3Example5"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="form3Example5"
            placeholder="Enter Your Password Here!"
            className="form-control"
          />
          <p style={{ color: "grey" }}>Minimum 8 character!</p>
        </div>

        <button
          onClick={(e) => updateProfileHandler(e)}
          disabled={btnLoading ? true : false}
          type="submit"
          className="btn btn-primary btn-block mb-4"
          style={{ backgroundColor: "#0084c7" }}
        >
          {btnLoading ? "Loading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
