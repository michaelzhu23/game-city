/* eslint-disable no-console */

import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParamsState.productId}`)
      .then(response => response.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product) {
      return (
        <div className="card details-card ">
          <div className="col-md-12 my-4">
            <p
              className="text-secondary d-inline on-hover"
              onClick={() => {
                this.props.setProductView('catalog', {});
              }}>
              &#60; Back to catalog
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
                  onClick={() => this.props.addProductToCart(this.props.viewParamsState)}
                  type="button"
                  className="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 my-3">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      );
    }
    return null;
  }
}
