import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col mb-4">
      <div className="card">
        <img src={`${props.product.image}`} className="card-img-top" alt=""/>
        <div className="card-body">
          <h5 className="card-title mb-4">{props.product.name}</h5>
          <h6 className="card-subtitle mb-3 text-muted">{'$' + (props.product.price / 100).toFixed(2)}</h6>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
