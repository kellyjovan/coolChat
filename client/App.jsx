import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    this.revokeToken = this.revokeToken.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  setToken(history, token, username) {
    localStorage.setItem('token', token);
    this.setState({ token, isAuthenticated: true, username }, () => {
      history.push('/chat');
    });
  }

  revokeToken() {
    localStorage.setItem('token', '');
    this.setState({ token: '', isAuthenticated: false, username: '' });
  }

  render() {
    const { username, isAuthenticated, token } = this.state;

    return (
      <div id="app">
        <Header revokeToken={this.revokeToken} username={username} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <AuthContainer
                {...props}
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
                setToken={this.setToken}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/chat"
            isAuthenticated={isAuthenticated}
            component={() => <ChatroomContainer token={token} />}
          />
          <Route path="*" render={() => <div>404 Not found </div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
