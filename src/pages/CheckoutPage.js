import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { changeCartQty, deleteAllFromCart } from "../store/slices/CartSlice";

const CheckoutPage = () => {
  const param = useParams();
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [getProductData, setProductData] = useState([]);
  const [filterProductData, setFilterProductData] = useState([]);
  const [countQuantity, setCountQuantity] = useState(0);
  const [success, setSuccess] = useState(false);
  const [paymentRes, setPaymentRes] = useState("");
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const getCartData = useSelector((state) => {
    return state.carts;
  });

  const getUserState = useSelector((state) => {
    return state.users;
  });

  const changeCartQtyHandler = ({ cartQty, index }) => {
    dispatch(changeCartQty({ cartQty, index }));
  };

  const paymentHandler = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/user/create-order`,
        {
          amount: filterProductData
        }
      );

      initPayment(data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: data.description,
      order_id: data.id,
      handler: async (response) => {
        try {
          const resData = await axios.post(
            `${process.env.REACT_APP_SERVER_API}/user/payment-verify`,
            {
              response,
              products: getCartData,
              loginToken: getUserState.loginToken
            }
          );

          if (resData) {
            axios
              .post(
                `${process.env.REACT_APP_SERVER_API}/user/orders/save`,
                resData.data
              )
              .then((res) => {
                if (res.data.message) {
                  setSuccess(true);
                  window.scrollTo(0, 0);
                  setPaymentRes(resData.data.response);
                  dispatch(deleteAllFromCart());
                }
                if (res.data.error) {
                  alert(res.data.error);
                }
              })
              .catch((err) => {
                alert("Someting Went wrong try & Contact Customer support!");
              });
          }
        } catch (error) {
          alert("Somthing went wrong & try again!");
          setSuccess(false);
        }
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    setLoading(true);
    setProductData(getCartData);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/products`)
      .then((res) => {
        const data = res.data;
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
    setSuccess(false);
    if (getCartData.length === 0) {
      navigate("/");
    }
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
      navigate("/");
    }
  }, [getUserState]);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
        loginToken: getUserState.loginToken
      })
      .then((data) => {
        setUserAddress(
          data.data.message.address.find((elem) => {
            return elem._id === param.id;
          })
        );
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
    window.scrollTo(0, 0);
  }, []);
  return loading ? (
    <Loader />
  ) : success ? (
    <div className="card" style={{ padding: "20px 0" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src="https://www.cntraveller.in/wp-content/themes/cntraveller/images/check-circle.gif"
          alt="tansection-logo"
          style={{ width: "30%", textAlign: "center" }}
        />
      </div>
      <div style={{ textAlign: "center" }}>Transection Successful!</div>
      <div style={{ textAlign: "center" }}>
        Order Id: <b>{paymentRes.razorpay_order_id}</b>
      </div>
      <div style={{ textAlign: "center" }}>
        Order Id: <b>{paymentRes.razorpay_payment_id}</b>
      </div>
      <br />
      <div style={{ width: "100%", textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "#0084c7"
          }}
          className="btn btn-primary"
          onClick={() => {
            navigate("/orders");
          }}
        >
          Go To Orders
        </button>
      </div>
    </div>
  ) : (
    <div style={{ fontSize: "20px", margin: "15px 0 10px 0" }}>
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
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ width: "100%", textAlign: "start" }}>Deliver here:</div>
          <div style={{ width: "100%", textAlign: "end" }}>
            <button
              style={{
                backgroundColor: "#0084c7"
              }}
              className="btn btn-primary"
              onClick={() => {
                navigate("/address-select");
              }}
            >
              Change
            </button>
          </div>
        </div>
        <div className="vstack gap-5">
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
                {userAddress.name}
              </div>
              <div>
                <b style={{ fontSize: "17px" }}>Phone: </b> {userAddress.phone}
              </div>
              {userAddress.email === "" ? (
                ""
              ) : (
                <div>
                  <b style={{ fontSize: "17px" }}>Email: </b>
                  {userAddress.email}
                </div>
              )}
              <div>
                <b style={{ fontSize: "17px" }}>Address: </b>{" "}
                {userAddress.house}, {userAddress.address},{userAddress.city}
              </div>
              <div>
                <b style={{ fontSize: "17px" }}>State: </b> {userAddress.state}{" "}
                - {userAddress.pincode}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
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
                      padding: "0 12px",
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
                    disabled
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
        <div style={{ textAlign: "end" }}>
          <button
            type="button"
            className="btn btn-warning"
            style={{
              fontSize: "17px",
              padding: "6px 25px"
            }}
            onClick={() => {
              paymentHandler();
            }}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
