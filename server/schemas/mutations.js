const pubsub = require('../pubsub');
const { query } = require('../models/db');
const { MSG_ADDED } = require('./constants');

module.exports = {
  // not verifying write to DB; errors unhandled
  createMessage: async (_, { userId, message }) => {
    const queryText = 'INSERT INTO messages(user_id, message) VALUES ($1, $2) RETURNING user_id, message, created_at';
    const values = [userId, message];
    const msg = (await query(queryText, values)).rows.reduce((acc, cur) => {
      const { user_id, message, created_at } = cur;
      acc.push({ username: user_id, message, created_at });
      return acc;
    }, [])[0];
    const usernameQueryText = `SELECT username FROM users WHERE _id=${userId}`;
    const usernameText = await query(usernameQueryText);
    msg.username = usernameText.rows[0].username;
    // publishing new data over subscriptions
    const messageResponse = {
      mutation: 'CREATED',
      message: msg,
    };
    await pubsub.publish(MSG_ADDED, { messageAdded: messageResponse });
    return messageResponse;
  },
  // not verifying write to DB; errors unhandled
  createUser: async (_, { userName, password }) => {
    const queryText = 'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING username';
    const values = [username, password];
    const { username } = (await query(queryText, values)).rows[0];
    return { username, success: true };
  },
  login: async (_, { username, password }) => {
    const result = {
      username: '',
      success: false,
      token: '',
      error: '',
    };

    const passwordQuery = `SELECT password FROM users WHERE username='${username}'`;
    const user = (await query(passwordQuery)).rows[0];
    if (!user) {
      result.error = 'Username does not exist.';
      return result;
    }

    if (user.password === password) {
      result.success = true;
      result.token = 1;
      result.username = username;
    } else {
      result.error = 'Invalid Password.';
    }

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
      const queryText = 'INSERT INTO users(username, password) VALUES ($1, $2)';
      const values = [username, password];
      await query(queryText, values);
      result.success = true;
      result.username = username;
    } else {
      result.error = 'username already exists';
    }
    return result;
  },
};
