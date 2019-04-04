import React, { Component, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
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

function MessageBox(props) {
  const [textInput, setText] = useState('');

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <div className="messageBox" style={styles.container}>
      <Mutation mutation={createMessage} context={{ headers: { authorization: props.token } }}>
        {(newMsg, { data }) => (
          <TextField
            className="textInput"
            value={textInput}
            onChange={handleChange}
            style={styles.textField}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                newMsg({
                  variables: {
                    message: textInput,
                  },
                });
                setText('');
              }
            }}
          />
        )}
      </Mutation>
    </div>
  );
}

export default MessageBox;
