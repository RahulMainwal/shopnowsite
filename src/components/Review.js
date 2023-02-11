import React, { useState } from "react";
import "../App.css";

const Review = ({ param }) => {
  const [toggleValue, setToggleValue] = useState("all");
  return (
    <div style={{ margin: "15px" }}>
      <h4>Ratings & Reviews</h4>

      <div className="card  mb-3">
        <div style={{ margin: "10px" }}>
          Rating:{" "}
          {param.productsRatings ? param.productsRatings : "No rating is here"}
          &nbsp;
          <i className="fa fa-star" style={{ color: "#054c9d" }}></i>
        </div>
      </div>

      <div
        id="demo"
        className="card mb-3"
        style={{ maxWidth: "100%", margin: "auto", padding: "20px 10px" }}
      >
        <ul
          id="scrollbar"
          style={{
            display: "flex",
            listStyle: "none",
            padding: "0",
            margin: "10px 0",
            overflow: "hidden",
            overflowX: "scroll"
          }}
        >
          <li
            style={{
              padding: "0 10px",
              cursor: "pointer",
              color: toggleValue === "all" ? "#154c9d" : "grey",
              borderBottom: toggleValue === "all" ? "1px solid #154c9d" : "none"
            }}
            onClick={() => {
              setToggleValue("all");
            }}
          >
            All
          </li>
          <li
            style={{
              padding: "0 20px",
              cursor: "pointer",
              color: toggleValue === "images" ? "#154c9d" : "grey",
              borderBottom:
                toggleValue === "images" ? "1px solid #154c9d" : "none"
            }}
            onClick={() => {
              setToggleValue("images");
            }}
          >
            Images
          </li>
          <li
            style={{
              padding: "0 20px",
              cursor: "pointer",
              color: toggleValue === "reviews" ? "#154c9d" : "grey",
              borderBottom:
                toggleValue === "reviews" ? "1px solid #154c9d" : "none"
            }}
            onClick={() => {
              setToggleValue("reviews");
            }}
          >
            Reviews
          </li>
        </ul>

        <div>
          {toggleValue === "all" ? (
            <div>
              <div className="row row-cols-sm-2 row-cols-sm-3 row-cols-lg-5 g-2 g-lg-3">
                <div>
                  <div>
                    <span className="fw-bold">User, </span> <span> Delhi</span>
                    <br />
                    <span style={{ color: "black" }}>Review</span>:&nbsp; It is
                    amazing product!
                  </div>
                  <div>
                    <img
                      src={
                        param.Productsimages
                          ? param.Productsimages[0].imageUrl
                          : ""
                      }
                      className="img-fluid"
                      alt="product"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="text-muted">Dated: 03-01-2023</div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {toggleValue === "images" ? (
            <div>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-2 g-lg-3">
                {param.Productsimages.map((x, i) => (
                  <div key={i} className="col">
                    <div className="card h-100">
                      <div
                        style={{
                          width: "auto !important",
                          height: "auto",
                          margin: "auto",
                          display: "block",
                          overflow: "hidden"
                        }}
                      >
                        <img
                          src={x.imageUrl}
                          className="card-img-top"
                          alt="product"
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {toggleValue === "reviews" ? (
            <ol className="list-group list-group-light">
              {[0, 0, 0, 0].map((x, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">User</div>
                    <span style={{ color: "black" }}>Review</span>:&nbsp; It is
                    amazing product!
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
