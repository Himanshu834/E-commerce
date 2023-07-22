

import React, { useEffect } from 'react'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import home from './containers/Home/home';
import signin from './containers/Signin/signin';
import signup from './containers/Signup/signup';
import PrivateRoute from './HOC/PrivateRoute';
import { useSelector,useDispatch } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions';
import products from './containers/products/products';
import orders from './containers/orders/order';
import Page  from './containers/page/page'
import categories from './containers/categories/categories';
import { getAllCategory } from './actions/categories.action';
import { getInitialData } from './actions/initialData.action';

function App() {
  const dispatch = useDispatch();
  const auth=useSelector(state=>state.auth);
    useEffect(()=>{
    if(!auth.authenticate){
        dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
      console.log(dispatch(getInitialData()));
    }
    
},[auth.authenticate]);

  return (
    <div className="App">
          <Switch>
            <PrivateRoute path="/" exact component={home}/>
            <PrivateRoute path="/products" component={products}/>
            <PrivateRoute path="/page" component={Page}/>
            <PrivateRoute path="/orders" component={orders}/>
            <PrivateRoute path="/categories" component={categories}/>
            <Route path="/signin" component={signin}/>
            <Route path="/signup" component={signup}/>
          </Switch>
    </div>
  );
}

export default App;