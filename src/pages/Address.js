import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [house, setHouse] = useState("");
  const [address, setAddress] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const getUserState = useSelector((state) => {
    return state.users;
  });
  const navigate = useNavigate();

  const onSubmitAddressSaveHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/user/address/add`, {
        name,
        email,
        phone,
        pincode,
        city,
        state,
        house,
        address,
        loginToken: getUserState.loginToken
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        }
        if (res.data.message) {
          alert(res.data.message);
          setMsg(res.data.message);
          setName("");
          setEmail("");
          setPhone("");
          setPincode("");
          setCity("");
          setAddress("");
          setHouse("");
          setState("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (elem) => {
    setName(elem.name);
    setEmail(elem.email);
    setPhone(elem.phone);
    setPincode(elem.pincode);
    setCity(elem.city);
    setAddress(elem.address);
    setHouse(elem.house);
    setState(elem.state);
    setAddressId(elem._id);
  };

  const deleteSubmitHandler = (addressId) => {
    axios
      .put(`${process.env.REACT_APP_SERVER_API}/user/address/delete`, {
        addressId,
        loginToken: getUserState.loginToken
      })
      .then((res) => {
        if (res.data.message === true) {
          alert("Deleted Successfully!");
          setMsg(res.data);
        }
        if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        alert("Something went wrong & try again!");
      });
  };

  const deleteAllAddressHandler = (e) => {
    e.preventDefault();
    console.log("deleteAllAddressHandler");
    axios
      .put(`${process.env.REACT_APP_SERVER_API}/user/address/delete-all`, {
        loginToken: getUserState.loginToken
      })
      .then((res) => {
        if (res.data.message.acknowledged === true) {
          alert("Deleted Successfully!");
          setMsg(res.data.message);
        }
        if (res.data.error) {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        alert("Something went wrong & try again!");
      });
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_API}/user/address/update`, {
        name,
        email,
        phone,
        pincode,
        city,
        address,
        house,
        state,
        addressId,
        loginToken: getUserState.loginToken
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        }
        if (res.data.message === true) {
          alert("Updated successfull!");
          setMsg(res.data.message);
          setName("");
          setEmail("");
          setPhone("");
          setPincode("");
          setCity("");
          setAddress("");
          setHouse("");
          setState("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
        loginToken: getUserState.loginToken
      })
      .then((data) => {
        setUserAddress(data.data.message.address.reverse());
        setLoading(false);
      })
      .catch((err) => {
        alert("Server issue & try again!");
        setLoading(false);
      });
  }, [msg]);

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
  ) : (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "2vh",
        marginBottom: "50px",
        maxWidth: "1000px",
        display: "block",
        border: "1px solid light-grey",
        padding: "20px 25px 5px 25px",
        boxShadow: "2px 2px 10px 1px #e5e5df",
        borderRadius: "5px",
        backgroundColor: "white"
      }}
    >
      <div style={{ textAlign: "end" }}>
        {" "}
        <button
          className="btn btn-warning"
          onClick={(e) => {
            deleteAllAddressHandler(e);
          }}
        >
          Delete All
        </button>
        &nbsp; &nbsp;
        <button
          style={{ backgroundColor: "#0084c7" }}
          type="button"
          className="btn"
          data-mdb-toggle="modal"
          data-mdb-target="#exampleModal"
          data-mdb-whatever="@mdo"
          onClick={() => {
            setEdit(false);
          }}
        >
          <b>
            <i
              className="fa fa-plus"
              style={{ fontSize: "15px", color: "white" }}
            ></i>
          </b>
        </button>
      </div>
      <hr />
      <div
        style={{
          maxWidth: "1000px",
          display: "block",
          margin: "auto",
          border: "1px solid light-grey",
          padding:
            userAddress.length === 0 ? "5px 25px 5px 25px" : "5px 0 15px 0",
          borderRadius: "5px",
          backgroundColor: "white",
          marginTop: "20px"
        }}
      >
        {userAddress.length === 0 ? (
          <div style={{ textAlign: "center", margin: "30vh 0" }}>
            No Address saved yet!
          </div>
        ) : (
          userAddress.map((elem) => (
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
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <div>
                      <b style={{ fontSize: "17px" }}>Name:</b> {elem.name}
                    </div>
                  </div>
                  <div style={{ textAlign: "end", width: "100%" }}>
                    <i
                      className="fa fa-pencil"
                      data-mdb-toggle="modal"
                      data-mdb-target="#exampleModal"
                      data-mdb-whatever="@mdo"
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit(true);
                        editHandler(elem);
                      }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;
                    <i
                      className="fa fa-trash"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteSubmitHandler(elem._id);
                      }}
                    ></i>
                  </div>
                </div>
                <div>
                  <b style={{ fontSize: "17px" }}>Phone:</b> {elem.phone}
                </div>
                {elem.email === "" ? (
                  ""
                ) : (
                  <div>
                    <b style={{ fontSize: "17px" }}>Email:</b> {elem.email}
                  </div>
                )}
                <div>
                  <b style={{ fontSize: "17px" }}>Address:</b> {elem.house},{" "}
                  {elem.address}, {elem.city}
                </div>
                <div>
                  <b style={{ fontSize: "17px" }}>State:</b> {elem.state} -{" "}
                  {elem.pincode}
                </div>
              </div>
            </div>
          ))
        )}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {edit ? "Update Address" : "Add Address"}
                </h5>
                <button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPincode("");
                    setCity("");
                    setAddress("");
                    setHouse("");
                    setState("");
                  }}
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) =>
                    edit ? editSubmitHandler(e) : onSubmitAddressSaveHandler(e)
                  }
                >
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Full Name (Required)*
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name1" className="col-form-label">
                      Working Phone Numbere (Required)*
                    </label>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="number"
                      className="form-control"
                      id="recipient-name1"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name2" className="col-form-label">
                      Email Id (Optional)
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      className="form-control"
                      id="recipient-name2"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name3" className="col-form-label">
                      Pincode (Required)*
                    </label>
                    <input
                      onChange={(e) => setPincode(e.target.value)}
                      value={pincode}
                      type="number"
                      className="form-control"
                      id="recipient-name3"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name4" className="col-form-label">
                      State (Required)*
                    </label>
                    <input
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                      type="text"
                      className="form-control"
                      id="recipient-name4"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name5" className="col-form-label">
                      City (Required)*
                    </label>
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      type="text"
                      className="form-control"
                      id="recipient-name5"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name6" className="col-form-label">
                      House No., Building Name (Required)*
                    </label>
                    <input
                      onChange={(e) => setHouse(e.target.value)}
                      value={house}
                      type="text"
                      className="form-control"
                      id="recipient-name6"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name7" className="col-form-label">
                      Road Name, Area, Colony (Required)*
                    </label>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      type="text"
                      className="form-control"
                      id="recipient-name7"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-mdb-dismiss="modal"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPincode("");
                    setCity("");
                    setAddress("");
                    setHouse("");
                    setState("");
                  }}
                >
                  Close
                </button>
                {edit ? (
                  <button
                    style={{ backgroundColor: "#0084c7" }}
                    type="button"
                    data-mdb-dismiss="modal"
                    className="btn btn-primary"
                    onClick={(e) => editSubmitHandler(e)}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    style={{ backgroundColor: "#0084c7" }}
                    type="button"
                    data-mdb-dismiss="modal"
                    className="btn btn-primary"
                    onClick={(e) => onSubmitAddressSaveHandler(e)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
