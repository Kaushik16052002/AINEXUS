import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Applications!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text="Unleash Infinite Possibilities: Generate Tomorrow's Data Today with GANs!"
              label='Augmentation'
              path='/data-generation'
            />
            <CardItem
              src='images/img-2.jpg'
              text="Anticipate Tomorrow's Needs Today: AI-powered Demand Forecasting for Smarter Business Decisions!"
              label='Business'
              path='/demandforecasting'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text="Transform Conversations into Insights: AI-Powered Chat Data Analysis for CSVs!"
              label='Mystery'
              url='https://tablechat.streamlit.app'

            />
            <CardItem
              src='images/img-4.jpg'
              text="Navigate the Future with Confidence: AI-Driven Financial Forecasting for Strategic Decision-Making!"
              label='Finance'
              path='/financialforecasting'
            />
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
