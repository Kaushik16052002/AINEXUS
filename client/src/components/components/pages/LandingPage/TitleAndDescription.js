import React from "react";
import BannerBackground from "./landingimages/home-banner-background.png";
import BannerImage from "./landingimages/giphy.gif";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

import './Total.css';

const TitleAndDescription = () => {
  return (
    <div className="home-container">
      
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Background" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            AINEXUS
          </h1>
          <p className="primary-text">
          Optimizing Operations and Financial Strategies through AI Innovation.
          </p>
          {/* <button className="secondary-button">
            Order Now <FiArrowRight /> 
          </button> */}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default TitleAndDescription;
