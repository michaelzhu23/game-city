import React from 'react';

export default function Header(props) {
  let itemNumber;
  if (props.cartItemCount === 1) {
    itemNumber = `${props.cartItemCount} item`;
  } else {
    itemNumber = `${props.cartItemCount} items`;
  }
  return (
    <>
      <h3
        className="p-0 m-0 on-hover"
        onClick={() => props.setView('catalog', {})}
      >
        <span className="montserrat-black-italic">
          <i className="fas fa-gamepad mr-2"></i>
          GAME
        </span> <span className="text-yellow montserrat-regular">
            CITY
          <i className="fas fa-city ml-2"></i>
        </span>
      </h3>
      <div className="p-0 d-flex justify-content-end align-items-end">
        <div
          className="d-flex justify-content-end align-items-end on-hover hvr-icon-forward"
          onClick={() => props.setView('cart', {})}
        >
          <h5 className="m-0 montserrat-bold">{itemNumber}</h5>
          <i className="pl-1 m-0 h3 fas fa-shopping-cart hvr-icon"></i>
        </div>
      </div>
    </>
  );
}
