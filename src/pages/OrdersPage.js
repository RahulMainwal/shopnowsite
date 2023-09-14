import axios from "axios";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Errorpage from "./Errorpage";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserState = useSelector((state) => {
    return state.users;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (getUserState.loginToken !== "") {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
          loginToken: getUserState.loginToken
        })
        .then((data) => {
          if (data.data.message) {
            setUser(data.data.message.orders.reverse());
            setLoading(false);
          }
        })
        .catch((err) => {
          alert("Server issue & try again!");
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [getUserState]);
  return loading ? (
    <Loader />
  ) : (
    <div style={{ width: "100%" }}>
      <div style={{ marginLeft: "15px" }}>
        <b>Orders</b>
      </div>
      {user.length !== 0 ? (
        <div
          style={{
            maxWidth: "1000px",
            display: "block",
            margin: "auto",
            border: "1px solid light-grey",
            padding: "15px 25px 5px 25px",
            boxShadow: "2px 2px 10px 1px #e5e5df",
            borderRadius: "5px",
            backgroundColor: "white",
            objectFit: "contain"
          }}
        >
          {user.map((x, i) => (
            <div
              key={x._id}
              className="card mb-4"
              style={{
                border: "1px solid grey",
                padding: "10px",
                margin: "0 0 10px 0",
                overflow: "hidden",
                wordWrap: "break-word"
              }}
            >
              <div
                style={{
                  width: "auto",
                  textAlign: "center"
                }}
              >
                {x.products.map((elem, index) => (
                  <div key={elem._id}>
                    <img
                      src={elem.product.Productsimages[0].imageUrl}
                      alt="product"
                      style={{ width: "100px" }}
                    />
                    {x.products[index] === x.products[x.products.length - 1] ? (
                      ""
                    ) : (
                      <hr />
                    )}
                  </div>
                ))}
              </div>
              <br />

              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  width: "100%",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    top: "0",
                    bottom: "0",
                    margin: "auto",
                    textAlign: "center",
                    wordBreak: "break-word"
                  }}
                >
                  <div style={{ color: "green" }}>
                    <b>Order Placed</b>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div>
                      order Id: <br />
                      <b>{x.response.razorpay_order_id}</b>
                    </div>
                    <div>
                      Payment Id: <br />
                      <b>{x.response.razorpay_payment_id}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "35vh 0" }}>
          No order is available!
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
