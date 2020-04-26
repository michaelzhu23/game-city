import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
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
        <section className="p-3 bg-dark text-white">
          <div className="heading">
            <Header />
          </div>
        </section>
        <main className="py-5">
          {page}
        </main>
      </>
    );
  }
}
