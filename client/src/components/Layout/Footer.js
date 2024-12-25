import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h3 className="text-center">&copy; 2024 <span className="footer-name">The Reading Room</span> All Right Reserved  </h3>
      <p className="text-center">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
