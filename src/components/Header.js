import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { removeLoginToken } from "../store/slices/UserSlice";

function Header() {
  const [activeValue, setActiveValue] = useState("/");
  const [user, setUser] = useState("");
  const [windowWidth, setWindowWidth] = useState("");
  const [navbarHeightLoc, setNavbarHeightLoc] = useState(false);
  const getState = useSelector((state) => {
    return state.carts;
  });
  const getUserState = useSelector((state) => {
    return state.users;
  });
  const dispatch = useDispatch();
  const getUrlLocation = useLocation();
  let qtySum = 0;
  for (let i = 0; i < getState.length; i++) {
    qtySum += getState[i].cartQty;
  }

  useEffect(() => {
    setActiveValue(getUrlLocation.pathname);
    if (getUserState.loginToken !== "") {
      axios
        .post(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
          loginToken: getUserState.loginToken
        })
        .then((data) => {
          if (data.data.message) {
            setUser(data.data.message);
          }
        })
        .catch((err) => {
          alert("Server issue & try again!");
        });
    } else {
      setUser("");
    }
  }, [getUrlLocation, getUserState]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(getState));
    localStorage.setItem(
      "login-token",
      JSON.stringify(getUserState.loginToken)
    );
  }, [getState, getUserState]);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 334) {
      setNavbarHeightLoc(true);
    } else {
      setNavbarHeightLoc(false);
    }
  });

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <nav
      className={
        navbarHeightLoc === true
          ? "navbar navbar-expand-lg navbar-light bg-white"
          : "navbar navbar-expand-lg navbar-light"
      }
      id="navbar"
      style={
        getUrlLocation.pathname.toString() === "/"
          ? {
              background: "inherit",
              backdropFilter: "blur(25px)"
            }
          : {
              backgroundColor: "white"
            }
      }
    >
      <div className="container-fluid">
        <Link to="/" style={{ color: "black", marginTop: "8px" }}>
          <h4
            style={
              activeValue === "/"
                ? navbarHeightLoc
                  ? getUrlLocation.pathname.toString() === "/"
                    ? { color: "#0084c7" }
                    : { color: "gray" }
                  : { color: "white" }
                : { color: "gray" }
            }
          >
            Shopnow
          </h4>
        </Link>
        <div className="d-flex align-items-center">
          <Link className="text-reset me-3" to="/search">
            <i
              style={
                activeValue === "/"
                  ? navbarHeightLoc
                    ? getUrlLocation.pathname.toString() === "/"
                      ? { color: "gray" }
                      : { color: "#0084c7" }
                    : { color: "white" }
                  : activeValue === "/search"
                  ? { color: "#0084c7" }
                  : { color: "" }
              }
              className="fa-solid fa-magnifying-glass"
            ></i>
          </Link>

          <div className="dropdown">
            <Link
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              to="/cart"
            >
              <i
                style={
                  activeValue === "/"
                    ? navbarHeightLoc
                      ? getUrlLocation.pathname.toString() === "/"
                        ? { color: "gray" }
                        : { color: "#0084c7" }
                      : { color: "white" }
                    : activeValue === "/cart"
                    ? { color: "#0084c7" }
                    : { color: "" }
                }
                className="fa-solid fa-shopping-cart"
              ></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                {qtySum}
              </span>
            </Link>
          </div>

          {user === "" ? (
            <div className="dropdown">
              <Link to="/sign-in">
                <button
                  style={
                    activeValue === "/"
                      ? navbarHeightLoc
                        ? getUrlLocation.pathname.toString() === "/"
                          ? { color: "gray" }
                          : { color: "#0084c7" }
                        : windowWidth < 400
                        ? {
                            color: "white",
                            border: "2px solid white"
                          }
                        : {
                            backgroundColor: "#0084c7",
                            color: "white",
                            border: "2px solid #0084c7"
                          }
                      : activeValue === "/sign-in"
                      ? {
                          backgroundColor: "#0084c7",
                          color: "white",
                          border: "2px solid #0084c7"
                        }
                      : { color: "" }
                  }
                  id="header-login-btn"
                  type="button"
                  className="btn"
                >
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="dropdown">
              <Link
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                to=""
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <span
                  style={{
                    padding: "0 8px",
                    borderRadius: "50px",
                    backgroundColor: "#0084c7",
                    color: "white"
                  }}
                >
                  {user.fisrtName.charAt(0)}
                </span>
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
                style={{ width: "200px" }}
              >
                <li
                  style={{
                    color: "black",
                    textAlign: "center",
                    padding: "10px 0",
                    fontSize: "20px",
                    borderBottom: "1px solid #d5d5d5"
                  }}
                >
                  <Link className="" to="#">
                    Welcome! {user.fisrtName}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/orders">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/address">
                    Address
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      width: "100%"
                    }}
                    to="#"
                  >
                    <div
                      style={{
                        textAlign: "center",
                        borderTop: "1px solid #d5d5d5"
                      }}
                    >
                      <button
                        onClick={() => {
                          dispatch(removeLoginToken());
                        }}
                        className="btn"
                        style={{
                          backgroundColor: "#0084c7",
                          color: "white",
                          margin: "10px 0"
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
