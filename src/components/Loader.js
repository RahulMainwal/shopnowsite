import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%"
      }}
    >
      <div
        className="spinner-border"
        style={{
          top: "45vh",
          left: "0",
          right: "0",
          margin: "auto",
          position: "absolute",
          color: "#0084c7"
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
