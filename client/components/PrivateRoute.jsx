import React, { Component } from 'react';
import {
  Route, Link, Redirect, withRouter, BrowserRouter, Switch,
} from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  console.log('inside of conditional rendering ', props.authentication);
  return (
    <Route
      {...rest}
      render={(history) => {
        if (props.authentication) {
          return <Component {...rest} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
