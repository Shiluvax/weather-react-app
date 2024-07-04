import React from "react";
import "./Footer.js";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
