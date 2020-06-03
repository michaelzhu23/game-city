import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div
        onClick={() => {
          props.setProductView('details', { productId: props.product.productId });
        }}
        className="card card-size on-hover grow">
        <img src={`${props.product.image}`} className="card-img-top img-size" alt=""/>
        <div className="card-body">
          <h5 className="card-title mb-4">{props.product.name}</h5>
          <h6 className="card-subtitle mb-3 text-muted">{'$' + (props.product.price / 100).toFixed(2)}</h6>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
