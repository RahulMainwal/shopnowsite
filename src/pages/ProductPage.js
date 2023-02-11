import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Review from "../components/Review";
// import ReactImageMagnify from "react-image-magnify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";

const ProductPage = ({ key }) => {
  const param = useParams();
  const [getData, setData] = useState([]);
  const [getImagesData, setImagesData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [getImgVal, setImgVal] = useState();
  const [getWindowWidth, setWindowWidth] = useState();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const funcForSetImgVal = (elem) => {
    setImgVal(elem);
  };

  const navigate = useNavigate();

  const getUserState = useSelector((state) => {
    return state.users;
  });

  const addToCartHandler = () => {
    dispatch(
      addToCart({ product: getData, cartQty: quantity > 5 ? 5 : quantity })
    );
  };

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
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/products`)
      .then((res) => {
        const data = res.data;
        setData(data.find((x) => x._id === param.id));
        setImagesData(data.find((x) => x._id === param.id).Productsimages);
        setImgVal(
          data.find((x) => x._id === param.id).Productsimages[0].imageUrl
        );
      })
      .catch((error) => {
        alert("Error");
      });
  }, []);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  return getImagesData.length === 0 ? (
    <Loader />
  ) : (
    <div>
      <div style={{ margin: "15px 15px 30px 15px" }}>
        <div className="card mb-3" style={{ maxWidth: "100%", margin: "auto" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <div
                style={{
                  width: "auto !important",
                  height: "300px",
                  margin: "auto",
                  display: "block",
                  padding: "15px 0",
                  overflow: "none"
                }}
              >
                {getWindowWidth >= 20000 || window.innerWidth >= 20000 ? (
                  <div
                    style={{
                      width: "auto !important",
                      display: "block",
                      borderRadius: "10px",
                      height: "100%",
                      textAlign: "center",
                      margin: "auto"
                    }}
                  >
                    {/* <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "product",
                          isFluidWidth: true,
                          src: getImgVal,
                          srcSet: getImgVal
                        },
                        largeImage: {
                          src: getImgVal,
                          isFluidWidth: true,
                          width: 1200,
                          height: 1800
                        },
                        enlargedImageContainerStyle: {
                          zIndex: "1"
                        }
                      }}
                    ></ReactImageMagnify> */}
                  </div>
                ) : (
                  <img
                    src={getImgVal}
                    alt="product"
                    className="img-fluid rounded-start"
                    style={{
                      width: "auto !important",
                      display: "block",
                      borderRadius: "10px",
                      height: "100%",
                      textAlign: "center",
                      margin: "auto",
                      objectFit: "contain"
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  width: "auto !important",
                  height: "auto",
                  margin: "auto",
                  display: "block"
                }}
              >
                {getImagesData.map((x, i) => (
                  <img
                    src={x.imageUrl}
                    key={i}
                    style={
                      getImgVal === x.imageUrl
                        ? {
                            width: "65px",
                            margin: "5px",
                            border: "3px solid #0084c7",
                            borderRadius: "10px",
                            height: "66px",
                            objectFit: "contain"
                          }
                        : {
                            width: "65px",
                            margin: "5px",
                            height: "65px",
                            cursor: "pointer",
                            border: "3px solid grey",
                            borderRadius: "10px",
                            objectFit: "contain"
                          }
                    }
                    alt="product"
                    onClick={(e) => {
                      e.preventDefault();
                      funcForSetImgVal(x.imageUrl);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#154c9d"
              }}
            ></div> */}

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <span
                    style={{ textTransform: "uppercase", fontSize: "17px" }}
                  >
                    {getData.productsName}
                  </span>{" "}
                  <span
                    style={{ textTransform: "uppercase", fontSize: "17px" }}
                  >
                    - ({getData.productsBrandName} COMPANY)
                  </span>
                </h5>
                <br />
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ textAlign: "start", width: "100%" }}>
                    <h2 className="card-title" style={{ color: "black" }}>
                      <s style={{ color: "grey" }}>
                        &#8377;
                        {Math.trunc(
                          (100 * getData.productsPrice) /
                            (100 - getData.productsDiscount)
                        )}
                      </s>{" "}
                      &#8377;{getData.productsPrice}
                    </h2>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <span
                      style={{
                        color: "black"
                      }}
                    >
                      {getData.productsDiscount}%&nbsp;off
                    </span>
                  </div>
                </div>
                <br />
                <div>
                  <span style={{ color: "black" }}>Color:</span> &nbsp;
                  <span
                    style={{
                      padding: "0 10px",
                      backgroundColor: getData.productsColor,
                      borderRadius: "50%"
                    }}
                  ></span>
                </div>
                <br />
                <div>
                  <span style={{ color: "black" }}>Quantity:</span> &nbsp;
                  <select
                    name="qyt"
                    id="qyt"
                    disabled={getData.productsQuantity === 0 ? true : false}
                    style={{
                      width: "50px",
                      borderRadius: "5px"
                    }}
                    onChange={(e) => {
                      setQuantity(parseInt(e.target.value, 10));
                    }}
                    value={quantity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <br />
                <div>
                  <span style={{ color: "black" }}>Status: </span>
                  {getData.productsQuantity === 0 ? (
                    <span style={{ color: "red" }}>Out of stock</span>
                  ) : (
                    <span>In stock</span>
                  )}
                </div>
                <br />
                <div className="card-text">
                  <p style={{ color: "#154c9d" }}>
                    <span style={{ color: "black" }}>Shipping Charge</span> :{" "}
                    {getData.productsDeliveryCharge === 0 ? (
                      <span> Free </span>
                    ) : (
                      <span>&#8377;{getData.productsDeliveryCharge}</span>
                    )}
                  </p>
                </div>
                <div
                  style={
                    getWindowWidth >= 400 || window.innerWidth >= 400
                      ? {}
                      : {
                          position: "fixed",
                          top: "auto",
                          bottom: "0",
                          margin: "auto",
                          left: "0",
                          width: "100%",
                          padding: "2vh 0",
                          backgroundColor: "white",
                          textAlign: "center",
                          zIndex: "1",
                          boxShadow: "2px 2px 10px 2px #D3D3D3"
                        }
                  }
                >
                  <button
                    type="button"
                    disabled={getData.productsQuantity === 0 ? true : false}
                    className="btn btn-warning"
                    onClick={() => addToCartHandler()}
                    style={{ fontSize: "17px", padding: "6px 25px" }}
                  >
                    Add to Cart
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    type="button"
                    disabled={getData.productsQuantity === 0 ? true : false}
                    className="btn btn-info"
                    style={{
                      backgroundColor: "#0084c7",
                      fontSize: "17px",
                      padding: "6px 25px"
                    }}
                    onClick={
                      user
                        ? () => {
                            navigate("/address-select");
                            addToCartHandler();
                          }
                        : () => {
                            navigate("/sign-in");
                          }
                    }
                  >
                    Buy Now
                  </button>
                </div>
                {getWindowWidth >= 400 || window.innerWidth >= 400 ? (
                  <br />
                ) : (
                  ""
                )}
                <p className="card-text">
                  <span style={{ color: "black" }}>Description</span> :<br />
                  {getData.productsDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Review param={getData} />
    </div>
  );
};

export default ProductPage;
