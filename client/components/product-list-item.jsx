import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card col" style="width: 18rem;">
      <img src={`${props.product.image}`} className="card-img-top" alt=""/>
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.product.price}</h6>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}
