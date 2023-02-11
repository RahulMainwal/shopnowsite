import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Search = () => {
  const [getData, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState(null);
  const navigate = useNavigate();

  const searchInputHandler = (elem) => {
    if (elem !== "") {
      const data = getData.filter((x) => {
        return x.productsName.toLowerCase().includes(elem.toLowerCase());
      });
      setSearchedData(data);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/products`)
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((error) => {
        alert("Error");
      });
  }, []);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          position: "fixed",
          zIndex: "1",
          width: "100%"
        }}
      >
        <div
          className="container-fluid"
          style={{ marginTop: "5px", width: "500px" }}
        >
          <div className="input-group rounded" id="search-wrapper">
            <span className="input-group-text border-0" id="search-addon">
              <i
                onClick={() => navigate(-1)}
                style={{ fontSize: "30px" }}
                className="fa-solid fa-arrow-left-long"
              ></i>
            </span>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              autoComplete="off"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                searchInputHandler(e.target.value);
              }}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i style={{ fontSize: "22px" }} className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </nav>
      {getData.length === 0 ? (
        <Loader />
      ) : searchValue === "" ? (
        <div
          style={{
            height: "100vh",
            width: "100%"
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              marginTop: "35vh"
            }}
          >
            Try to search your favorable.
            <br />
            Hey! this is search page.
          </div>
        </div>
      ) : searchedData.length === 0 ? (
        <div>
          <div
            style={{
              marginTop: "30vh",
              marginBottom: "50vh",
              textAlign: "center",
              zIndex: "inherit"
            }}
          >
            No search found!
          </div>
        </div>
      ) : (
        <div style={{ margin: "5vh 0", padding: "0 10px" }}>
          {searchedData.map((x, i) => (
            <Link
              key={x._id}
              to={`/product/${x._id}`}
              style={{ color: "black" }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  width: "100%",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 2px 1px #e5e5df",
                  display: "flex"
                }}
              >
                <div>
                  <div
                    style={{
                      width: "50px",
                      height: "50px"
                    }}
                  >
                    <img
                      src={x.Productsimages[0].imageUrl}
                      alt="Product"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        margin: "auto",
                        display: "block"
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    padding: "0 10px",
                    margin: "auto",
                    marginTop: "10px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textAlign: "start",
                    justifyContent: "start"
                  }}
                >
                  {x.productsName}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <i
                    style={{ color: "#606060" }}
                    onClick={() => navigate(-1)}
                    className="fa-solid fa-arrow-trend-up"
                  ></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
