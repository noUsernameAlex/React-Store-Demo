import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products : [],
    detailProduct : detailProduct,
    cart : [],
    modelOpen: false,
    modelProduct: detailProduct,
    cartSubtotal: 0,
    cartTax : 0,
    cartTotal : 0,
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

  addToCart = (id) => {
    let tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getItem(id));
    const product = tempProduct[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState({
      products : tempProduct,
      cart : [...this.state.cart, product],
      detailProduct: this.state.detailProduct,
    });
    console.log('clicked');
  }

  openModel = (id) => {
    const product = this.getItem(id);
    this.setState({
      modelProduct : product,
      modelOpen : true
    });
  }

  closeModel = () => {
    this.setState({
      modelOpen : false
    });
  }

  increment = (id) => {
    console.log('increment');
  }


  decrement = (id) => {
    console.log('decrement');
  }

  removeItem = (id) => {
    console.log('remove item');
  }

  clearCart = (id) => {
    console.log('cart was cleared');
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail : this.handleDetail,
        addToCart : this.addToCart,
        openModel : this.openModel,
        closeModel : this.closeModel,
        increment : this.increment,
        decrement : this.decrement,
        removeItem : this.removeItem,
        clearCart : this.clearCart,
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
