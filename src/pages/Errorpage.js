import React, { useEffect } from "react";

function Errorpage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "200px" }}
        src="https://innoludic.com/images/bg_404.png"
        alt="error"
      />
    </div>
  );
}

export default Errorpage;
