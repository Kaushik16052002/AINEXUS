import React from "react";
import AboutBackground from "./landingimages/about-background.png";
import AboutBackgroundImage from "./landingimages/aboutgify.gif";
import { BsFillPlayCircleFill } from "react-icons/bs";
import './About.css';

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="Background" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="Image" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Harnessing AI for Smarter Supply Chain and Financial Management
        </h1>
        <p className="primary-text">
          
Our website showcases AI integration in supply chain and finance, 
using React for frontend, Flask for backend, and Streamlit for chatbot deployment. Modules include Data Generation, Demand and Financial Forecasting, and a CSV Chatbot.
        </p>
        <p className="primary-text">
        Methodology employs Python libraries for robust solutions, enabling informed decision-making. Tagline: "AI-driven Solutions for Smarter Supply Chain and Financial Management."
        </p>
        <div className="about-buttons-container">
          {/* <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default About;
