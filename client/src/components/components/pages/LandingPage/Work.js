import React from "react";
import Prophet from "./landingimages/prophet.jpg";
import lstm from "./landingimages/lstm.png";
import ctgan from "./landingimages/ctgan.png";
import huggingface from "./landingimages/huggingface.png";
import './Total.css';


const Work = () => {
  const workInfoData = [
    {
      image: Prophet,
      title: "",
      text: "The Prophet model is an open-source forecasting tool developed by Facebook, designed for accurate and scalable time series forecasting, capable of handling seasonality, holidays, and missing data with ease.",
    },
    {
      image: lstm,
      title: "",
      text: "It is a type of recurrent neural network (RNN) that excels in financial forecasting by effectively capturing long-term dependencies and patterns in time series data, making it highly suitable for predicting stock prices, market trends, and financial anomalies.",
    },
    {
      image: ctgan,
      title: "",
      text: "It is a deep learning framework that leverages generative adversarial networks to generate synthetic data, particularly excelling in producing high-quality, realistic tabular data for various applications.",
    },
    {
      image: huggingface,
      title: "",
      text: "Hugging Face models leverage state-of-the-art natural language processing techniques to enable powerful, versatile applications in text generation, sentiment analysis, translation, and more.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Tech Stack</p>
        <h1 className="primary-heading">What Technologies and models are used</h1>
        <p className="primary-text">
        Our platform utilizes advanced machine learning algorithms, large language models, and predictive analytics to streamline supply chain processes and enhance financial decision-making.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data, index) => (
          <div className="work-section-info" key={index}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
