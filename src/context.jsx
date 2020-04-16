import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products : [],
    detailProduct : detailProduct,
  };

  componentDidMount () {
    this.setProducts();
  }

  // js use reference, so this is preventing from shallow copy,
  // this is using deep copy
  setProducts = () => {
    let tmpProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tmpProducts = [...tmpProducts, singleItem];
    });
    this.setState({
      products : tmpProducts,
    });
  }

  getItem = (id) => {
    const item = this.state.products.find((product) => {
      return product.id === id;
    });
    return item;
  }

  handleDetail = (id) => {
    this.setState({
      detailProduct : this.getItem(id),
    });
  }

  addToCart = () => {

  }
  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail : this.handleDetail,
        addToCart : this.addToCart,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
