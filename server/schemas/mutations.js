const pubsub = require('../pubsub');
const { query } = require('../models/db');
const { MSG_ADDED, USER_LOGGED } = require('./constants');
const { hash, verify } = require('../helpers/hash');
const { createToken } = require('../helpers/token');

module.exports = {
  // not verifying write to DB; errors unhandled
  createMessage: async (_, { message }, context) => {
    const { user } = context;
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in!',
      };
    }

    const queryText = 'INSERT INTO messages(user_id, message) VALUES ($1, $2) RETURNING _id, user_id, message, created_at';
    const values = [user.userId, message];
    const msg = (await query(queryText, values)).rows.reduce((acc, cur) => {
      const { _id, message, created_at } = cur;
      acc.push({
        id: _id, username: user.userId, message, created_at,
      });
      return acc;
    }, [])[0];
    const usernameQueryText = `SELECT username FROM users WHERE _id=${user.userId}`;
    const usernameText = await query(usernameQueryText);
    msg.username = usernameText.rows[0].username;
    // publishing new data over subscriptions
    const messageResponse = {
      mutation: 'CREATED',
      message: msg,
      success: true,
    };
    await pubsub.publish(MSG_ADDED, { messageAdded: messageResponse });
    return messageResponse;
  },
  // not verifying write to DB; errors unhandled
  createUser: async (_, { username, password }) => {
    const queryText = 'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING username';
    const values = [username, await hash(password)];
    const user = (await query(queryText, values)).rows[0];
    return { username: user.username, success: true };
  },
  login: async (_, { username, password }) => {
    const result = {
      username: '',
      success: false,
      token: '',
      error: '',
    };

    const passwordQuery = `SELECT _id, password FROM users WHERE username='${username}'`;
    const user = (await query(passwordQuery)).rows[0];
    if (!user) {
      result.error = 'Username does not exist.';
      return result;
    }

    const isMatched = await verify(password, user.password);
    if (isMatched) {
      result.success = true;
      result.token = createToken({
        userId: user._id,
      });
      result.username = username;
    } else {
      result.error = 'Invalid Password.';
    }
    const obj = { person: result.username }
    await pubsub.publish(USER_LOGGED, { userLoggedIn: obj });
    return result;
  },
  signup: async (_, { username, password }) => {
    const result = {
      username: '',
      success: false,
      token: '',
      error: '',
    };

    const userQuery = `SELECT username FROM users WHERE username='${username}'`;
    const userQueryResult = await query(userQuery);

    if (!userQueryResult.rows.length) {
      const queryText = 'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING _id';
      const values = [username, await hash(password)];
      const user = (await query(queryText, values)).rows[0];
      result.token = createToken({
        userId: user._id,
      });
      result.success = true;
      result.username = username;
      const obj = { person: result.username }
      await pubsub.publish(USER_LOGGED, { userLoggedIn: obj });
    } else {
      result.error = 'username already exists';
    }
    return result;
  },
};
