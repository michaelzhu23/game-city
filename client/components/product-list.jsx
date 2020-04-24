import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  render() {
    return (
      <div className="container">
        <div className="row row-cols-3">
          {
            this.state.map(product => {
              return (
                <ProductListItem
                  key={product.id}
                  product={product}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
