import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: ''
    };
  }

  render() {
    let totalPrice = 0;
    for (let i = 0; i < this.props.cartItems.length; i++) {
      totalPrice += this.props.cartItems[i].price;
    }
    return (
      <div className="container">
        <h1 className="mb-5">Checkout</h1>
        <h3 className="mt-3">Item Total ${(totalPrice / 100).toFixed(2)}</h3>
        <div className="col-md-12 mb-4">
          <p
            className="text-secondary d-inline on-hover"
            onClick={() => this.props.setView('catalog', {})}>
            &#60; Continue Shopping
          </p>
        </div>
      </div>
    );
  }
}
