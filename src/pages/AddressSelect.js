import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const AddressSelect = () => {
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserState = useSelector((state) => {
    return state.users;
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
        loginToken: getUserState.loginToken
      })
      .then((data) => {
        setUserAddress(data.data.message.address.reverse());
        setLoading(false);
        if (data.data.message.address.length === 0) {
          navigate("/address");
        }
      })
      .catch((err) => {
        alert("Server issue & try again!");
        setLoading(false);
      });
  }, [getUserState]);

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
            navigate("/");
          } else {
            if (data.data.message) {
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          alert("Server issue & try again!");
          setLoading(false);
        });
    } else {
      navigate("/");
      setLoading(false);
    }
  }, [getUserState]);

  return loading ? (
    <Loader />
  ) : userAddress.length === 0 ? (
    <div>No address</div>
  ) : (
    <div style={{ fontSize: "20px", margin: "15px 15px 10px 15px" }}>
      <b>Select anyone where you want to be delevered!</b>
      <div
        style={{
          maxWidth: "1000px",
          display: "block",
          margin: "auto",
          border: "1px solid light-grey",
          padding: "20px 25px 5px 25px",
          borderRadius: "5px",
          backgroundColor: "white",
          marginTop: "20px"
        }}
      >
        {userAddress.map((elem) => (
          <div key={elem._id} className="vstack gap-5">
            <div
              className=" border"
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
                wordWrap: "break-word"
              }}
            >
              <div style={{ width: "100%" }}>
                <div>
                  <b style={{ fontSize: "17px" }}>Name: </b>
                  {elem.name}
                </div>
                <div>
                  <b style={{ fontSize: "17px" }}>Phone: </b> {elem.phone}
                </div>
                {elem.email === "" ? (
                  ""
                ) : (
                  <div>
                    <b style={{ fontSize: "17px" }}>Email: </b>
                    {elem.email}
                  </div>
                )}
                <div>
                  <b style={{ fontSize: "17px" }}>Address: </b> {elem.house},{" "}
                  {elem.address},{elem.city}
                </div>
                <div>
                  <b style={{ fontSize: "17px" }}>State: </b> {elem.state} -{" "}
                  {elem.pincode}
                </div>
                <div style={{ textAlign: "end" }}>
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#0084c7" }}
                    onClick={() => {
                      navigate(`/checkout/${elem._id}`);
                    }}
                  >
                    Deliver here
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSelect;
