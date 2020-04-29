import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
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

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }));
  }

  render() {
    let page;
    if (this.state.view.name === 'catalog') {
      page = <ProductList setProductView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      page = <ProductDetails viewParamsState={this.state.view.params} setProductView={this.setView}/>;
    }
    return (
      <>
        <section className="col-12 p-2 bg-dark text-white">
          <div className="row heading">
            <Header cartItemCount={this.state.cart.length}/>
          </div>
        </section>
        <main className="py-5">
          {page}
        </main>
      </>
    );
  }
}
