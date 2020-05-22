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
        <h1 className="mb-4">Checkout</h1>
        <h5 className="mb-5 text-secondary">Order Total ${(totalPrice / 100).toFixed(2)}</h5>
        <form>
          <div className="form-group">
            <label htmlFor="customerName">Name</label>
            <input required type="text" className="form-control" id="customerName"/>
          </div>
          <div className="form-group">
            <label htmlFor="creditCardNumber">Credit Card</label>
            <input required type="number" className="form-control" id="creditCardNumber"/>
          </div>
          <div className="form-group">
            <label htmlFor="customerShippingAddress">Shipping Address</label>
            <textarea required className="form-control" id="customerShippingAddress" rows="4"></textarea>
          </div>
        </form>
        <div className="col-md-12 mt-5 p-0 d-flex justify-content-between">
          <p
            className="text-secondary d-inline on-hover"
            onClick={() => this.props.setView('catalog', {})}>
            &#60; Continue Shopping
          </p>
          <button type="submit" className="btn btn-primary">Primary</button>
        </div>
      </div>
    );
  }
}
