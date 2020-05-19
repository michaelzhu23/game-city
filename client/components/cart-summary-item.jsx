import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className="card details-card mb-4">
      <div className="row no-gutters">
        <div className="col-md-5 pl-3">
          <img src={`${props.cartItem.image}`} className="card-img img-size-detail" alt="" />
        </div>
        <div className="col-md-7 d-flex align-items-center">
          <div className="card-body">
            <h2 className="card-title mb-3">{props.cartItem.name}</h2>
            <h5 className="card-subtitle mb-2 text-muted">{'$' + (props.cartItem.price / 100).toFixed(2)}</h5>
            <p className="card-text">{props.cartItem.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
