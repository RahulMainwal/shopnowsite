import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import {
  deleteAllFromCart,
  removeFromCart,
  changeCartQty
} from "../store/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const [getProductData, setProductData] = useState([]);
  const [filterProductData, setFilterProductData] = useState([]);
  const [countQuantity, setCountQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const getCartData = useSelector((state) => {
    return state.carts;
  });

  const getUserState = useSelector((state) => {
    return state.users;
  });

  const removeFromCartHandler = (index) => {
    dispatch(removeFromCart(index));
  };

  const deleteAllFromCartHandler = () => {
    dispatch(deleteAllFromCart());
  };

  const changeCartQtyHandler = ({ cartQty, index }) => {
    dispatch(changeCartQty({ cartQty, index }));
  };

  useEffect(() => {
    setLoading(true);
    setProductData(getCartData);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/products`)
      .then((res) => {
        const data = res.data;
        // setFilterProductData(res.data);
        const filteredData = getCartData.map((x) => {
          return {
            cartProduct: data.find((elem) => {
              return elem._id === x.product._id;
            }),
            cartQty: x.cartQty
          };
        });
        let sum = 0;
        filteredData.map((x) => {
          return (sum =
            sum +
            (x.cartProduct.productsPrice * x.cartQty +
              x.cartProduct.productsDeliveryCharge));
        });
        setLoading(false);
        setFilterProductData(sum);
      })
      .catch((err) => {
        console.log(err);
      });

    let countQty = 0;
    getCartData.map((x) => {
      return (countQty = countQty + x.cartQty);
    });
    setCountQuantity(countQty);
  }, [getCartData]);

  useEffect(() => {
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
  }, [getUserState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return loading ? (
    <Loader />
  ) : getProductData.length === 0 ? (
    <div style={{ margin: "15px" }}>
      <div>Shopping Cart</div>
      <br />
      <div className="card mb-3" style={{ padding: "20px 0" }}>
        <img
          src="https://statementclothing.net/images/cart.gif"
          alt="cart"
          style={{ width: "200px", left: "0", right: "0", margin: "auto" }}
        />
        <h6 style={{ textAlign: "center" }}>
          Your Cart is Empty! Please add something in your cart
        </h6>
        <br />
        <hr />
        <div>
          <div className="text-end" style={{ padding: "0 15px" }}>
            Subtotal (1 item):{" "}
            <b style={{ color: "black", fontSize: "20px" }}>
              &#8377;{filterProductData}
            </b>
          </div>
          <br />
          <br />
          <div className="text-end" style={{ padding: "0 15px" }}>
            <button type="button" className="btn btn-warning">
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ margin: "15px" }}>
      <div>Shopping Cart</div>
      <br />
      <div className="card mb-3" style={{ padding: "20px 0" }}>
        <div style={{ textAlign: "end", padding: "0 20px 5px 20px" }}>
          <button
            type="button"
            className="btn"
            style={{
              border: "1px solid black",
              padding: "5px 15px",
              fontSize: "15px"
            }}
            onClick={() => deleteAllFromCartHandler()}
          >
            Clear All
          </button>
        </div>
        <hr />
        <br />
        <div>
          {getProductData.map((x, i) => (
            <div key={i} className="row g-2">
              <div
                className="col-md-2"
                style={{
                  width: "auto !important",
                  height: "150px",
                  margin: "auto"
                }}
              >
                <img
                  src={x.product.Productsimages[0].imageUrl}
                  alt="Product"
                  className="img-fluid rounded-start"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    margin: "auto",
                    display: "block"
                  }}
                />
              </div>
              <div className="col-md-10">
                <div className="card-body">
                  <p>
                    <span>{x.product.productsName}</span>
                  </p>
                  <p>
                    <span style={{ color: "black" }}>Color</span>: &nbsp;
                    <span
                      style={{
                        padding: "0 10px",
                        backgroundColor: x.product.productsColor,
                        borderRadius: "50%"
                      }}
                    ></span>
                  </p>
                  <p>
                    <span style={{ color: "black" }}>Quantity:</span> &nbsp;
                    <select
                      name="qyt"
                      id="qyt"
                      style={{
                        width: "50px",
                        borderRadius: "5px"
                      }}
                      onChange={(e) =>
                        changeCartQtyHandler({
                          cartQty: parseInt(e.target.value, 10),
                          index: i
                        })
                      }
                      value={x.cartQty}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </p>
                  <p>
                    <span style={{ color: "black" }}>Delivery Charge:</span>{" "}
                    &nbsp;
                    <b style={{ color: "black", fontSize: "20px" }}>
                      &nbsp;&#8377;{x.product.productsDeliveryCharge}
                    </b>
                  </p>
                  <p>
                    <span style={{ color: "black" }}>Price:</span> &nbsp;
                    <b style={{ color: "black", fontSize: "20px" }}>
                      &nbsp;&#8377;{x.product.productsPrice}
                    </b>
                  </p>
                  <div>
                    <button
                      className="btn"
                      style={{
                        border: "1px solid black",
                        padding: "3px 10px",
                        fontSize: "15px"
                      }}
                      onClick={() => {
                        removeFromCartHandler(i);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <hr />
            </div>
          ))}
          <div className="text-end" style={{ padding: "0 15px" }}>
            Total Quantity: <b style={{ color: "black" }}>{countQuantity}</b>
          </div>
          <div className="text-end" style={{ padding: "0 15px" }}>
            Subtotal ({getProductData.length} item):{" "}
            <b style={{ color: "black", fontSize: "20px" }}>
              &#8377;{filterProductData}
            </b>
          </div>
          <br />
          <div className="text-end" style={{ padding: "0 15px" }}>
            <Link to={user ? "/address-select" : "/sign-in"}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#0084c7",
                  fontSize: "17px",
                  padding: "6px 25px"
                }}
              >
                Proceed to Buy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
