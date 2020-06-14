import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCreditCardChange(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder({
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.address
    });
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Name</label>
            <input
              onChange={this.handleNameChange}
              value={this.state.name}
              required
              type="text"
              className="form-control"
              id="customerName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="creditCardNumber">Credit Card</label>
            <input
              onChange={this.handleCreditCardChange}
              value={this.state.creditCard}
              required
              type="number"
              className="form-control"
              id="creditCardNumber"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerShippingAddress">Shipping Address</label>
            <textarea
              onChange={this.handleAddressChange}
              value={this.state.address}
              required
              className="form-control"
              id="customerShippingAddress"
              rows="4"
            >
            </textarea>
          </div>
          <div className="form-check my-5">
            <input required type="checkbox" className="form-check-input" id="acknowledgement" />
            <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that this is a demo application and the information above is not my genuine financial or personal information.</label>
          </div>
          <div className="p-0 d-flex justify-content-between align-items-baseline">
            <p
              className="text-secondary d-inline on-hover"
              onClick={() => this.props.setView('catalog', {})}>
              <i className="fas fa-chevron-circle-left fa-lg mr-1"></i> Continue Shopping
            </p>
            <button type="submit" className="btn background-yellow montserrat-semi-bold">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
