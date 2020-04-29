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
      <h2 className="col-6 p-0"><i className="fas fa-dollar-sign mr-2"></i>Wicked Sales</h2>
      <div className="px-2 col-6 d-flex justify-content-end align-items-end">
        <h6>{itemNumber}</h6>
        <i className="px-2 h3 fas fa-shopping-cart"></i>
      </div>
    </>
  );
}
