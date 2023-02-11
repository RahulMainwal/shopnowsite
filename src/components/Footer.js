import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#" id="facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" id="twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" id="instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" id="github">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-muted text-center">Developed by Rahul Mainwal</div>
      <div className="text-muted text-center">copyright&copy;2023</div>
    </footer>
  );
}

export default Footer;
