// import React from 'react';
// import '../App.css';
// import { Button } from './Button';
// import './HeroSection.css';

// function HeroSection() {
//   return (
//     <div className='hero-container'>
//       <video src='/videos/video-1.mp4' autoPlay loop muted />
//       <h1>AI NEXUS</h1>
//       <p>Unleashing Language Intelligence</p>
//       <div className='hero-btns'>
//         <Button
//           className='btns'
//           buttonStyle='btn--outline'
//           buttonSize='btn--large'
//         >
//           PUBLICATION
//         </Button>
//         <Button
//           className='btns'
//           buttonStyle='btn--primary'
//           buttonSize='btn--large'
//           onClick={console.log('hey')}
//         >
//           MORE INFO <i className='far fa-play-circle' />
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;
















// HeroSection.js
import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>AI NEXUS</h1>
      <p>Unleashing Language Intelligence</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link="https://drive.google.com/file/d/1cFt_rg0HOCAm-pBBEKGznwqT8ttoyxNM/view?usp=sharing"
        >
          PUBLICATION
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => console.log('hey')}
          link="/more-info" // Link to the More Info page
        >
          MORE INFO <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;

