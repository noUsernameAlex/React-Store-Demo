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
    }, () => {
      this.addTotals();
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
    let tmpCart = [...this.state.cart];
    const selectedProduct = tmpCart.find(item => item.id === id);
    const index = tmpCart.indexOf(selectedProduct);
    const product = tmpCart[index];
    product.count += 1;
    product.total = product.count * product.price;

    this.setState({
      cart : [...tmpCart]
    }, () => {
      this.addTotals();
    });
  }


  decrement = (id) => {
    let tmpCart = [...this.state.cart];
    const selectedProduct = tmpCart.find(item => item.id === id);
    const index = tmpCart.indexOf(selectedProduct);
    const product = tmpCart[index];
    product.count -= 1;
    product.total = product.count * product.price;

    if (product.count === 0) {
      this.removeItem(id);
      return;
    }

    this.setState({
      cart : [...tmpCart]
    }, () => {
      this.addTotals();
    });
  }

  removeItem = (id) => {
    let tmpProducts = [...this.state.products];
    let tmpCart = [...this.state.cart];
    tmpCart = tmpCart.filter(item =>item.id !== id);
    const index = tmpProducts.indexOf(this.getItem(id));
    let removedProduct = tmpProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState({
      cart : [...tmpCart],
      products : [...tmpProducts],
    }
    , () => {
      this.addTotals();
    });
  }

  clearCart = (id) => {
    this.setState({
      cart : [],
    }, () => {
      this.setProducts();
      this.addTotals();
    });
  }

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => {
      subTotal += item.total;
    });
    const tmpTax = subTotal * 0.1;
    const tax = parseFloat(tmpTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({
      cartSubtotal : subTotal,
      cartTax : tax,
      cartTotal : total
    });
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
