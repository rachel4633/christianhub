import React from "react";
import "../css/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* 🔹 CONTACT US */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Email: christianhub@gmail.com</p>
          <p>Phone: +254 700 000 000</p>

          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>

          <p className="mt-2">Reach us through our socials 💬</p>
        </div>

        {/* 🔹 ABOUT US */}
        <div className="footer-col">
          <h4>About Us</h4>
          <p>
           christianhub is the best website to find all the things you will need in christianity and to be able to spread Gods word
          </p>
        </div>

      </div>

      <p className="footer-bottom">© 2026 christianhub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;