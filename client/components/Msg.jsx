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
      <div style={styles.username} color="inherit">
        {username}
      </div>
      <div style={styles.message} color="inherit">
        { message }
      </div>
    </div>
  );
};

Msg.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Msg;
