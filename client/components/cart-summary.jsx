import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  let cartItems;
  if (!props.cartItems.length) {
    cartItems = <h2 className="text-danger mb-5">Your cart is empty!</h2>;
  } else {
    cartItems = props.cartItems.map(cartItem => {
      return (
        <CartSummaryItem
          key={cartItem.productId}
          cartItem={cartItem}
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
        className="btn btn-primary"
      >
        Checkout
      </button>
    );
  }
  return (
    <div className="container">
      <div className="col-md-12 mb-4">
        <p
          className="text-secondary d-inline on-hover"
          onClick={() => props.setView('catalog', {})}>
          <i className="fas fa-chevron-circle-left fa-lg mr-1"></i> Continue Shopping
        </p>
      </div>
      <h1 className="mb-5">My Cart</h1>
      {cartItems}
      <div className="d-flex justify-content-between align-items-baseline">
        <h3 className="mt-3">Item Total ${(totalPrice / 100).toFixed(2)}</h3>
        {checkoutButton}
      </div>
    </div>
  );
}
