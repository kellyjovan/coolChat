import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import { createMessage } from '../schema/mutations';

const styles = {
  container: {
    display: 'flex',
    padding: '10px',
  },
  textField: {
    flexGrow: 9,
  },
  button: {
    flexGrow: 1,
  },
};

class MessageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };

    console.log('token', this.props.token)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const message = event.target.value;
    this.setState({ content: message });
  }

  render() {
    const { content } = this.state;
    // const headers = { authorization: this.props.token };
    return (
      <div className="messageBox" style={styles.container}>
        <Mutation mutation={createMessage} context={{headers: { authorization: this.props.token }}}>
          {(newMsg, { data }) => (
            <TextField
              value={content}
              onChange={this.handleChange}
              style={styles.textField}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  newMsg({
                    variables: {
                      message: content,
                    },
                  });
                  this.setState({ content: '' });
                }
              }}
            />
          )}
        </Mutation>
      </div>
    );
  }
}

export default MessageBox;
