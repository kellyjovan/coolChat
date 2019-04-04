import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Msg from './Msg';
import MessageBox from './MessageBox';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
};

class ChatContainer extends Component {
  componentDidMount() {
    const { subscribeToMore } = this.props;
    subscribeToMore();
  }

  render() {
    const { data, token } = this.props;
    const { messages } = data;
    // messages.splice(0, messages.length - 10);
    return (
      <div id="chatContainer" style={styles.container}>
        <div id="allMsgs" style={{ height: '90%' }}>
          {messages
            && messages.reduce((acc, cur) => {
              acc.push(<Msg username={cur.username} key={`Message-${cur.id}`} message={cur.message} />);
              return acc;
            }, [])}
        </div>
        <MessageBox token={token} />
      </div>
    );
  }
}

ChatContainer.propTypes = {
  subscribeToMore: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default ChatContainer;
