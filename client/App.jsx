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

    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(status, history, serverResponse) {
    console.log('app props and history from within handleLogin', this.props, history);
    localStorage.setItem('token', serverResponse.data.login.token);
    history.push('/chat');
  }

  handleSignup(status, history, serverResponse) {
    console.log('not sure this function is necessary', this.props);
    // localStorage.setItem('token', serverResponse.data.login.token);
    // alert('signup successful');
  }

  handleLogout() {
    console.log('Logout', this);
  }

  render() {
    const { getToken } = this.props;
    getToken();
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
                handleSignup={this.handleSignup}
              />
            )}
          />
          <PrivateRoute exact path="/chat" component={ChatroomContainer} />
          <Route path="*" render={() => <div>'404 Not found' </div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
