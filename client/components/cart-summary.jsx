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
  return (
    <div className="container d-flex flex-column justify-content-around">
      <div className="col-md-12 mb-4">
        <p
          className="text-secondary d-inline on-hover"
          onClick={() => props.setView('catalog', {})}>
        &#60; Back to catalog
        </p>
      </div>
      <h1 className="mb-5">My Cart</h1>
      {cartItems}
      <h3 className="mt-3">Item Total ${(totalPrice / 100).toFixed(2)}</h3>
    </div>
  );
}
