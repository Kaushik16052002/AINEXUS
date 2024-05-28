import React from 'react';
import './Total.css';
// import Cards1 from '../Cards1';
// import HeroSection from '../HeroSection';
// import Footer from '../../Footer';
import TitleAndDescription from './TitleAndDescription';
import About from './About';
import Work from './Work';
import Testimonial from './Testimonial';
import FooterLanding from './FooterLanding';
import ContactLanding from './ContactLanding';


function HomeLanding() {
  return (
    <>
      {/* <HeroSection /> */}
      <TitleAndDescription />
      <About />
      <Work />
      <Testimonial />
      {/* <ContactLanding /> */}
      {/* <FooterLanding /> */}
    </>
  );
}

export default HomeLanding;
