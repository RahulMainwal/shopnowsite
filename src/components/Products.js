import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Products = () => {
  const [fetchProducts, setProducts] = useState([]);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      localStorage.setItem("scrollTop", JSON.stringify(window.pageYOffset));
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/products`)
      .then((res) => {
        setProducts(res.data);
        if (fetchProducts) {
          setTimeout(() => {
            window.scrollBy(0, JSON.parse(localStorage.getItem("scrollTop")));
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return fetchProducts.length === 0 ? (
    // <Loader />
    ""
  ) : (
    <div style={{ margin: "50px 15px 20px 15px" }}>
      <h5 style={{ textAlign: "center", fontSize: "30px" }}>Products</h5>
      <div>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-2 g-lg-3">
          {fetchProducts.map((x, i) => (
            <Link
              key={x._id}
              to={`/product/${x._id}`}
              style={{ color: "black" }}
            >
              <div className="col">
                <div className="card h-100">
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
  );
};

export default Products;
