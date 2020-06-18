import React, { useState } from 'react';

export default function ConfirmRemoveModal(props) {
  const [isClosing, setIsClosing] = useState(false);
  const fadeAnimation = !isClosing ? 'fade-in' : 'fade-out';
  const slideAnimation = !isClosing ? 'slide-in' : 'slide-out';
  const rootClass = props.show ? `modal-overlay ${fadeAnimation}` : 'd-none';
  return (
    <div className={rootClass}>
      <div className={`modal-content p-4 ${slideAnimation}`}>
        <h3>{props.cartItemToRemove.name}</h3>
        <img src={`${props.cartItemToRemove.image}`} className="card-img img-size mb-4" alt="Cart Item Image" />
        <p>Are you sure you want to remove this item from your cart?</p>
        <div className="btn-group w-75">
          <button
            onClick={() => {
              setTimeout(() => {
                props.handleCloseModal();
                setIsClosing(false);
              }, 650);
              setIsClosing(true);
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.removeFromCart(props.cartItemToRemove.cartItemId);
              setTimeout(() => {
                props.handleCloseModal();
                setIsClosing(false);
              }, 650);
              setIsClosing(true);
            }}
            className="btn btn-danger"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
