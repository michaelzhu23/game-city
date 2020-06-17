import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import DisclaimerModal from './disclaimer-modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      introModal: {
        show: true,
        displayNone: false
      },
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.toggleIntroModal = this.toggleIntroModal.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  addToCart(product) {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', request)
      .then(response => response.json())
      .then(data => {
        const cartItems = this.state.cart.slice();
        cartItems.push(data);
        this.setState({ cart: cartItems });
      })
      .catch(err => console.error(err));
  }

  removeFromCart(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          const cart = this.state.cart.slice();
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].cartItemId === cartItemId) {
              cart.splice(i, 1);
              this.setState({ cart: cart });
            }
          }
        }
      })
      .catch(err => console.error(err));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }));
  }

  placeOrder(customerInfo) {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerInfo)
    };
    fetch('/api/orders', request)
      .then(response => {
        if (response.ok) {
          this.setState({ cart: [] });
          this.setView('catalog', {});
        }
      })
      .catch(err => console.error(err));
  }

  toggleIntroModal(event) {
    event.preventDefault();
    this.setState({
      introModal: {
        show: false,
        displayNone: false
      }
    });
    setTimeout(() => {
      this.setState({
        introModal: {
          show: false,
          displayNone: true
        }
      });
    }, 650);
  }

  render() {
    let page;
    switch (this.state.view.name) {
      case 'catalog':
        page = <ProductList setProductView={this.setView} />;
        break;
      case 'details':
        page = <ProductDetails addProductToCart={this.addToCart} viewParamsState={this.state.view.params} setProductView={this.setView} />;
        break;
      case 'cart':
        page = <CartSummary removeFromCart={this.removeFromCart} cartItems={this.state.cart} setView={this.setView} />;
        break;
      case 'checkout':
        page = <CheckoutForm placeOrder={this.placeOrder} cartItems={this.state.cart} setView={this.setView} />;
    }
    return (
      <>
        <section className="col-12 p-3 background-black text-white">
          <div className="row heading col-12 p-0 d-flex justify-content-between">
            <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          </div>
        </section>
        <main className="py-5">
          {page}
        </main>
        {
          this.state.introModal.displayNone
            ? null
            : <DisclaimerModal introModal={this.state.introModal} toggleIntroModal={this.toggleIntroModal} />
        }
      </>
    );
  }
}
