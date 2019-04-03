const jwt = require('jsonwebtoken');

const secret = 'catman';

module.exports.createToken = user => (
  jwt.sign(user, secret)
);

module.exports.verifyToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, secret);
};
