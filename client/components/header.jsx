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
      <h3 className="col-8 p-0 m-0"><i className="fas fa-gamepad mr-2"></i>Game <span className="text-yellow">City<i className="fas fa-city ml-2"></i></span></h3>
      <div className="p-0 col-4 d-flex justify-content-end align-items-end">
        <div
          className="d-flex justify-content-end align-items-end on-hover"
          onClick={() => props.setView('cart', {})}
        >
          <h6>{itemNumber}</h6>
          <i className="px-2 h3 fas fa-shopping-cart"></i>
        </div>
      </div>
    </>
  );
}
