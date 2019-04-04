const { query } = require('../models/db');

module.exports = {
  messages: async () => {
    const queryText = 'SELECT u.username, m.message, m._id, m.created_at FROM messages as m JOIN users as u ON m.user_id=u._id';

    return (await query(queryText)).rows.reduce((acc, cur) => {
      const {
        _id, username, message, created_at,
      } = cur;

      acc.push({
        id: _id, username, message, created_at,
      });
      return acc;
    }, []);
  },
  users: async () => {
    const queryText = 'SELECT username FROM users';
    return (await query(queryText)).rows.reduce((acc, cur) => {
      acc.push(cur.username);
      return acc;
    }, []);
  },
};
