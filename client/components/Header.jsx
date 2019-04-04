import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Header = (props) => {
  const { username, revokeToken } = props;

  const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

  return (
    <div id="header" style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography id="title" variant="h6" color="inherit" style={styles.grow}>
            Cool Chat
          </Typography>
          {username && (
            <Typography id="username" variant="p" color="inherit">
              {username}
            </Typography>
          )}
          {username && (
            <Button color="inherit" onClick={revokeToken}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogOut: PropTypes.func.isRequired,
};

export default Header;
