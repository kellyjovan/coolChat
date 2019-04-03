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
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(status, history) {
    console.log('app props and history from within handleLogin', this.props, history);
    history.push('/chat');
  }

  handleSignUp() {
    console.log('Signup', this);
  }

  handleLogout() {
    console.log('Logout', this);
  }

  render() {
    return (
      <div id="app">
        <Header handleLogOut={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            // use render props to pass props down with react router:
            render={props => (
              <AuthContainer
                {...props}
                handleLogin={this.handleLogin}
                handleSignUp={this.handleSignUp}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/chat"
            component={ChatroomContainer}
            authentication={this.state.authenticated}
          />
          <Route path="*" render={() => <div>'404 Not found' </div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
