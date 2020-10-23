import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, routeName, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = useSelector((state) => state.auth.authenticated);
  console.log('second');
  const renderRoutes = () => {
    if (routeName === 'me') {
      return (
        <Route
          {...rest}
          render={(props) =>
            isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/signin', state: { from: '/me' } }} />
            )
          }
        />
      );
    } else if (routeName === 'signin') {
      return (
        <Route
          {...rest}
          render={(props) =>
            !isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/', state: { from: '/signin' } }} />
            )
          }
        />
      );
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: '/me' } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
