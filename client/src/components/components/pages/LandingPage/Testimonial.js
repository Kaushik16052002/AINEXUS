import React from "react";
import ProfilePic from "./landingimages/openai.jpg";
import { AiFillStar } from "react-icons/ai";
import './Total.css';

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        OpenAI is an artificial intelligence research laboratory and technology company dedicated to developing and promoting friendly AI for the benefit of humanity.
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="OpenAI" />
        <p>
        OpenAI underscores the transformative impact of artificial intelligence in the finance and supply chain sectors, elucidating its capacity to optimize operations, enhance decision-making processes, and drive strategic insights, thereby empowering companies to achieve greater efficiency and competitiveness.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>OpenAI</h2>
      </div>
    </div>
  );
};

export default Testimonial;
