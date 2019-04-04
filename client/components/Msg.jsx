import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
  },
  username: {
    width: '200px',
  },
  message: {
    flexGrow: 3,
  },
};

const Msg = (props) => {
  const { username, message } = props;
  return (
    <div className="message" style={styles.container}>
      <div className="username" style={styles.username} color="inherit">
        <p>{username}</p>
      </div>
      <div className="msg" style={styles.message} color="inherit">
        <p>{message}</p>
      </div>
    </div>
  );
};

Msg.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Msg;
