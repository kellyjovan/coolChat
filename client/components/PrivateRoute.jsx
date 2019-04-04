import React, { Component } from 'react';
import {
  Route, Link, Redirect, withRouter, BrowserRouter, Switch,
} from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, isAuthenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(history) => {
        if (isAuthenticated) {
          return <Component {...rest} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
