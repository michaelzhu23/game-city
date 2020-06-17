import React from 'react';

export default function ConfirmRemoveModal(props) {
  let fadeAnimation;
  let slideAnimation;
  if (props.show === true) {
    fadeAnimation = 'fade-in';
    slideAnimation = 'slide-in';
  } else {
    fadeAnimation = 'fade-out';
    slideAnimation = 'slide-out';
  }
  const rootClass = props.show ? `modal-overlay ${fadeAnimation}` : 'd-none';
  return (
    <div className={rootClass}>
      <div className={`modal-content p-4 ${slideAnimation}`}>
        <h3>{props.cartItem.name}</h3>
        <img src={`${props.cartItem.image}`} className="card-img img-size" alt="" />
        <p>Are you sure you want to remove this item from your cart?</p>
        <div className="btn-group w-75">
          <button
            onClick={props.handleCloseModal}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => props.removeFromCart(props.cartItem.productId)}
            className="btn btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
