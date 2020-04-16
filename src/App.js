import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './components/Details';
import Navbar from './components/Navbar';
import Default from './components/Default';
import Cart from './components/Cart';
import ProductList from './components/ProductList';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>

    </React.Fragment>
  );
}

export default App;
