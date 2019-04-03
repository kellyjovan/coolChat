const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.hash = function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

module.exports.verify = function verify(password, hashedPass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPass, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
