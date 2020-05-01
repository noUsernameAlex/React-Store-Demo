import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Details from './components/Details';
import Navbar from './components/Navbar';
import Default from './components/Default';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Model from './components/Model';
import Login from './components/login/loginPage';
import SignUpPage from './components/login/SignUpPage';


function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route component={Default} />
      </Switch>
      <Model />
    </React.Fragment>
  );
}

export default App;
