// import React from 'react';
// import { Link } from 'react-router-dom';

// function CardItem(props) {
//   return (
//     <>
//       <li className='cards__item'>
//         <Link className='cards__item__link' to={props.path}>
//           <figure className='cards__item__pic-wrap' data-category={props.label}>
//             <img
//               className='cards__item__img'
//               alt='Travel Image'
//               src={props.src}
//             />
//           </figure>
//           <div className='cards__item__info'>
//             <h5 className='cards__item__text'>{props.text}</h5>
//           </div>
//         </Link>
//       </li>
//     </>
//   );
// }

// export default CardItem;














import React from 'react';
import { Link } from 'react-router-dom';

function CardItem({ src, text, label, path, url }) {
  return (
    <li className='cards__item'>
      {path ? (
        <Link className='cards__item__link' to={path}>
          <figure className='cards__item__pic-wrap' data-category={label}>
            <img className='cards__item__img' alt={text} src={src} />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{text}</h5>
          </div>
        </Link>
      ) : (
        <a className='cards__item__link' href={url} target='_blank' rel='noopener noreferrer'>
          <figure className='cards__item__pic-wrap' data-category={label}>
            <img className='cards__item__img' alt={text} src={src} />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{text}</h5>
          </div>
        </a>
      )}
    </li>
  );
}

export default CardItem;
