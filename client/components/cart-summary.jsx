import React, { useState } from 'react';
import CartSummaryItem from './cart-summary-item';
import ConfirmRemoveModal from './confirm-remove-modal';

export default function CartSummary(props) {
  let cartItems;
  const [showModal, setShowModal] = useState(false);
  const [cartItemToRemove, setCartItemToRemove] = useState({});
  const handleOpenModal = cartItem => {
    setShowModal(true);
    setCartItemToRemove(cartItem);
  };
  if (!props.cartItems.length) {
    cartItems = <h2 className="text-danger mb-5">Your cart is empty!</h2>;
  } else {
    cartItems = props.cartItems.map((cartItem, index) => {
      return (
        <CartSummaryItem
          key={index}
          cartItem={cartItem}
          handleOpenModal = {handleOpenModal}
        />
      );
    });
  }
  let totalPrice = 0;
  for (let i = 0; i < props.cartItems.length; i++) {
    totalPrice += props.cartItems[i].price;
  }
  let checkoutButton;
  if (props.cartItems.length) {
    checkoutButton = (
      <button
        onClick={() => props.setView('checkout', {})}
        type="button"
        className="btn background-yellow montserrat-semi-bold"
      >
        Checkout
      </button>
    );
  }
  return (
    <>
      <div className="container">
        <div className="col-md-12 mb-4 p-0">
          <p
            className="text-gray d-inline on-hover hvr-icon-back"
            onClick={() => props.setView('catalog', {})}>
            <i className="fas fa-chevron-circle-left hvr-icon fa-lg"></i> Continue Shopping
          </p>
        </div>
        <h1 className="mb-5">My Cart</h1>
        {cartItems}
        <div className="d-flex justify-content-between align-items-baseline">
          <h3 className="mt-3">Cart Total ${(totalPrice / 100).toFixed(2)}</h3>
          {checkoutButton}
        </div>
      </div>
      <ConfirmRemoveModal
        show={showModal}
        cartItemToRemove={cartItemToRemove}
        handleCloseModal={() => setShowModal(false)}
        removeFromCart={props.removeFromCart}
      />
    </>
  );
}
