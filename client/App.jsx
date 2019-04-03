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

    this.state = {
      token: localStorage.getItem('token') || '',
      isAuthenticated: false,
      username: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(status, history, serverResponse) {
    console.log('app props and history from within handleLogin', this.props, history);
    const { token, username } = serverResponse.data.login;
    console.log(serverResponse.data.login);
    localStorage.setItem('token', token);
    this.setState({ token, isAuthenticated: true, username });
    history.push('/chat');
  }

  handleSignup(status, history, serverResponse) {
    console.log('not sure this function is necessary', this.props);
  }

  handleLogout() {
    localStorage.setItem('token', '');
    this.setState({ token: '', isAuthenticated: false, username: '' });
    console.log('Logout', this);
  }

  render() {
    const { getToken } = this.props;
    return (
      <div id="app">
        <Header handleLogOut={this.handleLogout} username={this.state.username} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <AuthContainer
                {...props}
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/chat"
            isAuthenticated={this.state.isAuthenticated}
            component={() => <ChatroomContainer token={this.state.token} />}
          />
          <Route path="*" render={() => <div>'404 Not found' </div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
