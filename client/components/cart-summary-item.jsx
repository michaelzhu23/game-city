import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className="card details-card mb-4">
      <div className="row no-gutters">
        <div className="col-md-5 mb-3">
          <img src={`${props.cartItem.image}`} className="card-img img-size" alt="" />
        </div>
        <div className="col-md-7 d-flex align-items-center">
          <div className="card-body">
            <h2 className="card-title mb-3">{props.cartItem.name}</h2>
            <h5 className="card-subtitle mb-2 text-muted">{'$' + (props.cartItem.price / 100).toFixed(2)}</h5>
            <p className="card-text">{props.cartItem.shortDescription}</p>
            <p
              onClick={() => props.handleOpenModal(props.cartItem)}
              className="text-danger montserrat-semi-bold on-hover d-inline-block hvr-icon-sink-away"
            >
              <i className="fas fa-times-circle hvr-icon mr-1"></i>
            Remove item
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
