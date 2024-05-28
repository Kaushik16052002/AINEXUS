import React from "react";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-logo-container">
        <h1>Logo</h1>
      </div>
      <div className="navbar-links-container">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
