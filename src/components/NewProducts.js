import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Loader from "./Loader";

export const NewProducts = () => {
  const [fetchProducts, setProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setProducts([]);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/products`)
      .then((res) => {
        const productsArr = [];
        const productIds = [
          "6400e0459232ba5c49f648a5",
          "6400d8719232ba5c49f641af",
          "6400dada9232ba5c49f64487"
        ];

        productIds.filter((element) => {
          const product = res.data.find((elem) => {
            return elem._id === element;
          });
          productsArr.push(product);
        });
        setProducts(productsArr);
      })
      .catch((err) => {
        console.log(err);
      });
    setWindowWidth(window.innerWidth);
  }, []);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  return fetchProducts.length === 0 ? (
    <Loader />
  ) : (
    <div>
      <div
        id={windowWidth < 400 ? "" : "newProductContainer"}
        style={
          windowWidth < 400
            ? {
                backgroundColor: "#0084c7",
                height: "730px",
                width: "100%",
                position: "absolute"
              }
            : {}
        }
      ></div>
      {fetchProducts.length === 0 ? (
        ""
      ) : (
        <div
          style={
            windowWidth < 400
              ? {
                  padding: "20px 15px 20px 15px"
                }
              : {
                  padding: "20px 15px 20px 15px"
                }
          }
        >
          <h5 style={{ color: "white", zIndex: "1" }}>
            New Highlighted Products
          </h5>
          <div>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3 g-3 g-lg-3">
              {fetchProducts.map((x, i) => (
                <Link
                  key={x._id}
                  to={`/product/${x._id}`}
                  style={
                    windowWidth < 400 ? { color: "white" } : { color: "black" }
                  }
                >
                  <div className="col">
                    <div
                      className="card h-100"
                      style={{
                        boxShadow: "0 0 5px 0 white",
                        background: "inherit",
                        backdropFilter: "blur(10px)"
                      }}
                    >
                      <div
                        style={{
                          width: "auto !important",
                          height: "200px",
                          margin: "auto",
                          display: "block",
                          padding: "15px 0",
                          overflow: "none"
                        }}
                      >
                        <img
                          src={x.Productsimages[0].imageUrl}
                          className="card-img-top"
                          alt="product"
                          style={{
                            width: "auto !important",
                            display: "block",
                            borderRadius: "10px",
                            height: "100%",
                            textAlign: "center",
                            margin: "auto",
                            objectFit: "contain",
                            padding: "0 20px"
                          }}
                        />
                      </div>
                      <div style={{ padding: "5px 10px" }}>
                        <h5
                          className="card-title"
                          style={{
                            fontSize: "100%",
                            textTransform: "Capitalize",
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {x.productsName}
                        </h5>
                        <div
                          id="scrollbar"
                          style={{
                            marginTop: "-5px",
                            marginBottom: "10px",
                            display: "flex",
                            overflow: "hidden",
                            overflowX: "auto"
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              textAlign: "start"
                            }}
                          >
                            <p
                              className="card-text"
                              style={{
                                fontSize: "15px"
                              }}
                            >
                              <s style={{ color: "grey" }}>
                                &#8377;
                                {Math.trunc(
                                  (100 * x.productsPrice) /
                                    (100 - x.productsDiscount)
                                )}
                              </s>{" "}
                              <br />
                              &#8377;{x.productsPrice}
                            </p>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              textAlign: "end",
                              fontSize: "12px"
                            }}
                          >
                            {x.productsDiscount}%&nbsp;off
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
