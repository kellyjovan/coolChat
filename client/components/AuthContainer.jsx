import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import {
  Route, Link, Redirect, withRouter, BrowserRouter, Switch,
} from 'react-router-dom';
import { login } from '../schema/mutations';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '400px',
    marginTop: '50px',
    flexDirection: 'column',
    padding: '15px',
  },
  button: {
    flexGrow: 1,
    margin: '5px',
  },
};

class AuthContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordInput: '',
      usernameInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, inputField) {
    const newState = {};
    newState[inputField] = event.target.value;
    this.setState(newState);
    console.log(this.state);
  }

  render() {
    const { handleSignUp, handleLogin, history } = this.props;
    return (
      <div className="auth">
        <form style={styles.container} noValidate autoComplete="off">
          <TextField
            id="usernameInput"
            label="Username"
            margin="normal"
            variant="outlined"
            value={this.state.usernameInput}
            onChange={(event) => {
              this.handleChange(event, 'usernameInput');
            }}
          />

          <TextField
            id="passwordInput"
            label="Password"
            margin="normal"
            variant="outlined"
            value={this.state.passwordInput}
            onChange={(event) => {
              this.handleChange(event, 'passwordInput');
            }}
          />

          <div style={{ display: 'flex' }}>
            <Button
              id="signUp"
              variant="contained"
              color="primary"
              style={styles.button}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Mutation mutation={login}>
              {loginMutation => (
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={() => {
                    loginMutation({
                      variables: {
                        userName: this.state.usernameInput,
                        password: this.state.passwordInput,
                      },
                    })
                      .then((res) => {
                        console.log('response from loginMutation: ', res);
                        if (res.data.login.success) {
                          console.log('user has successfully authenticated');
                          handleLogin(true, history);
                        } else {
                          console.log('username/password not recognized');
                        }
                      })
                      .catch(err => console.log('errorrrrrr: ', err.message));
                    this.setState({ usernameInput: '', passwordInput: '' });
                  }}
                >
                  <Link to="/chat" style={{ color: '#FFF', textDecoration: 'none' }}>
                    Login
                  </Link>
                </Button>
              )}
            </Mutation>
          </div>
        </form>
      </div>
    );
  }
}

AuthContainer.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
};

export default AuthContainer;
