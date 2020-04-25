import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  render() {
    return (
      <>
        <section className="p-3 bg-dark text-white">
          <div className="heading">
            <Header />
          </div>
        </section>
        <main className="py-5 bg-light">
          <ProductList/>
        </main>
      </>
    );
  }
}
