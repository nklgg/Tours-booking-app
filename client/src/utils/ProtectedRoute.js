import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = useSelector((state) => state.auth);

  console.log(auth.authenticated, auth.loading)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn.authenticated === true || isLoggedIn.loading ? (
          <Component {...props} />
        ) : (
            <Redirect to='/signin' />
          )
      }
    />
  );
};

export default ProtectedRoute;
