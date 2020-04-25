/* eslint-disable no-console */

import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return null;
  }
}
