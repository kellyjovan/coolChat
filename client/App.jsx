import React, { Component } from 'react';
import {
  Route, Link, Redirect, withRouter, BrowserRouter, Switch,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthContainer from './components/AuthContainer';
import Header from './components/Header';
import ChatroomContainer from './components/ChatroomContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: true };
    // this.handleLogin = this.loginHandle.bind(this);
    // this.signUpHandle = this.signUpHandle.bind(this);
  }

  // loginHandle() {
  //   console.log('Login');
  // }

  // signUpHandle() {
  //   console.log('Signup');
  // }

  render() {
    return (
      <div id="app">
        <Header />
        <Switch>
          <Route exact path="/" component={AuthContainer} />
          {/* <Route path="/chat" component={ChatroomContainer} /> */}
          <PrivateRoute
            exact
            path="/chat"
            component={ChatroomContainer}
            authentication={this.state.authenticated}
          />
          <Route path="*" render={() => <div>'404 Not found' </div>} />
        </Switch>
      </div>
      // <AuthContainer handleLogin={this.handleLogin} handleSignUp={this.signUpHandle} />
    );
  }
}

export default App;
