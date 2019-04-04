const { MSG_ADDED, USER_LOGGED } = require('./constants');
const pubsub = require('../pubsub');

module.exports = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator([MSG_ADDED]),
  },
  userLoggedIn: {
    subscribe: () => pubsub.asyncIterator([USER_LOGGED])
  }
};
