import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import { login, signup } from '../schema/mutations';

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
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(event, inputField) {
    const newState = {};
    newState[inputField] = event.target.value;
    this.setState(newState);
  }

  login(loginMutation) {
    const { usernameInput, passwordInput } = this.state;
    const { handleLogin, history, setToken } = this.props;

    loginMutation({
      variables: {
        username: usernameInput,
        password: passwordInput,
      },
    })
      .then((res) => {
        const { success, error, token } = res.data.login;
        if (success) {
          setToken(history, token);
        } else {
          console.log('username/password not recognized');
        }
      })
      .catch(err => console.log('errorrrrrr: ', err.message));
    this.setState({ usernameInput: '', passwordInput: '' });
  }

  signup(signupMutation) {
    const { usernameInput, passwordInput } = this.state;
    const { handleSignup, history } = this.props;

    signupMutation({
      variables: {
        username: usernameInput,
        password: passwordInput,
      },
    }).then((res) => {
      const { success, error, token } = res.data.signup;
      if (success) {
        handleSignup(true, history, res);
      } else {
        console.log('Err:', error);
      }
    }).catch(err => console.log('errorrrrrr: ', err.message));
    this.setState({ usernameInput: '', passwordInput: '' });
  }

  render() {
    const { usernameInput, passwordInput } = this.state;
    return (
      <div className="auth">
        <form style={styles.container} noValidate autoComplete="off">
          <TextField
            id="usernameInput"
            label="Username"
            margin="normal"
            variant="outlined"
            value={usernameInput}
            onChange={(event) => {
              this.handleChange(event, 'usernameInput');
            }}
          />

          <TextField
            id="passwordInput"
            label="Password"
            margin="normal"
            variant="outlined"
            value={passwordInput}
            onChange={(event) => {
              this.handleChange(event, 'passwordInput');
            }}
          />

          <div style={{ display: 'flex' }}>
            <Mutation mutation={signup}>
              {signupMutation => (
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={() => this.signup(signupMutation)}
                >
                  Signup
                </Button>
              )}
            </Mutation>
            <Mutation mutation={login}>
              {loginMutation => (
                <Button
                  variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={() => this.login(loginMutation)}
                >
                  Login
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
  handleSignup: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default AuthContainer;
