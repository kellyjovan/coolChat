import React, { Component, useState } from 'react';
import { Query } from 'react-apollo';
import { messageQuery, userQuery } from '../schema/queries';
import { MsgSub, Logged } from '../schema/subscriptions';
import ChatContainer from './ChatContainer';
import OnlineContainer from './OnlineContainer';
import Sidebar from './Sidebar';

const styles = {
  left: {
    width: '50%',
    display: 'inline-block',
  },
  right: {
    width: '50%',
    display: 'inline-block',
  },
};

const ChatroomContainer = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div style={styles.left}>
        <Query query={messageQuery}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p> Error: {error.message} </p>;

            const more = () => subscribeToMore({
              document: MsgSub,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { mutation, message } = subscriptionData.data.messageAdded;

                if (mutation !== 'CREATED') return prev;
                setCount(count + 1);

                return Object.assign({}, prev, {
                  messages: [...prev.messages, message],
                });
              },
            });
            return <ChatContainer data={data} subscribeToMore={more} token={props.token} />;
          }}
        </Query>
      </div>
      <div style={styles.right}>
        <Query query={userQuery}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p> Error: {error.message} </p>;

            const more = () => subscribeToMore({
              document: Logged,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { person } = subscriptionData.data.userLoggedIn;
                {/* const { counter } = this.state; */}

                setCount(count + 1);
                console.log(`${person} is online!`);
                return Object.assign({}, prev, {
                  users: [...prev]
                });
              },
            });
            return <OnlineContainer data={data} subscribeToMore={more} />;
          }}
        </Query>
      </div>
    </div>
  );
};

// class ChatroomContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 0,
//     };
//   }

//   render() {
//     return (
    
//     );
//   }
// }

export default ChatroomContainer;
