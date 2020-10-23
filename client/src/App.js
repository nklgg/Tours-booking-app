import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions/index';
import Nav from './components/Nav/Navbar';
import Home from './components/Home/Home';
import Tour from './components/Tour/Tour';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Me from './components/Me/Me';
import ProtectedRoute from './utils/ProtectedRoute';
import Bookings from './components/Bookings/Bookings';
import Review from './components/Review/Review';
import Hamburger from './components/Nav/Hamburger'
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
    console.log('first');
  }, []);
  return (
    <div style={{backgroundColor: '#f5f5f5', }} className="App">
      <Nav />
      {/* <Hamburger /> */}
      <Switch>
        <Route exact path="/" component={Home} />a
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        {auth.authenticated === null ? (
          <div />
        ) : (
          <ProtectedRoute routeName="me" exact path="/me" component={Me} />
        )}
        <Route exact path="/tour/:slug" component={Tour} />
        <Route exact path="/my-tours" component={Bookings} />
        <Route exact path="/review" component={Review} />
      </Switch>
    </div>
  );
}

export default App;
