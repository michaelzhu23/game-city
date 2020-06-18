/* eslint-disable no-console */

import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      snackBar: {
        addedToCart: false,
        isShowing: false
      }
    };
    this.fadeOutTimer = null;
    this.displayTimer = null;
  }

  handleAddToCart() {
    this.setState({
      snackBar: {
        addedToCart: true,
        isShowing: true
      }
    });
    this.fadeOutTimer = setTimeout(() => this.setState({
      snackBar: {
        addedToCart: true,
        isShowing: false
      }
    }), 2000);
    this.displayTimer = setTimeout(() => this.setState({
      snackBar: {
        addedToCart: false,
        isShowing: false
      }
    }), 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.fadeOutTimer);
    clearTimeout(this.displayTimer);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParamsState.productId}`)
      .then(response => response.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product) {
      const longDescription = this.state.product.longDescription.split('\n').map((line, index) => {
        return (
          <p key={index}>{line}</p>
        );
      });
      const display = this.state.snackBar.addedToCart ? '' : 'd-none';
      const animation = this.state.snackBar.isShowing ? 'fade-in' : 'fade-out';
      return (
        <div className="container">
          <div className={`snackbar ${animation} ${display}`}><i className="fas fa-check fa-lg mr-2"></i>{`${this.state.product.name} has been added to your cart!`}</div>
          <div className="card details-card ">
            <div className="col-md-12 my-4">
              <p
                className="text-gray d-inline on-hover hvr-icon-back"
                onClick={() => {
                  this.props.setProductView('catalog', {});
                }}>
                <i className="fas fa-chevron-circle-left hvr-icon fa-lg"></i> Back to products page
              </p>
            </div>
            <div className="row no-gutters">
              <div className="col-md-5 pl-3">
                <img src={`${this.state.product.image}`} className="card-img img-size-detail" alt=""/>
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h2 className="card-title mb-3">{this.state.product.name}</h2>
                  <h5 className="card-subtitle mb-2 text-muted">{'$' + (this.state.product.price / 100).toFixed(2)}</h5>
                  <p className="card-text">{this.state.product.shortDescription}</p>
                  <button
                    onClick={() => {
                      this.props.addProductToCart(this.props.viewParamsState);
                      this.handleAddToCart();
                    }}
                    type="button"
                    className="btn background-yellow montserrat-semi-bold hvr-icon-pulse-grow">
                    <i className="pr-2 m-0 h5 fas fa-shopping-cart hvr-icon"></i>
                  Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 my-3">
              <h3>Description</h3>
              {longDescription}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
