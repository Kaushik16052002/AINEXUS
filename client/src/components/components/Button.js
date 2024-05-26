// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Button = ({
//   children,
//   type,
//   onClick,
//   buttonStyle,
//   buttonSize,
//   linkTo
// }) => {
//   const checkButtonStyle = buttonStyle || 'btn--primary';
//   const checkButtonSize = buttonSize || 'btn--medium';

//   return (
//     <a href="https://drive.google.com/file/d/1cFt_rg0HOCAm-pBBEKGznwqT8ttoyxNM/view?usp=sharing" target="_blank" rel="noopener noreferrer">
//       <button
//         className={`btn ${checkButtonStyle} ${checkButtonSize}`}
//         onClick={onClick}
//         type={type}
//       >
//         {children}
//       </button>
//     </a>
//   );
// };













// Button.js
import React from 'react';

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  link
}) => {
  const checkButtonStyle = buttonStyle || 'btn--primary';
  const checkButtonSize = buttonSize || 'btn--medium';

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          type={type}
        >
          {children}
        </button>
      </a>
    );
  }

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
