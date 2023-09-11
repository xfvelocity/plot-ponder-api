const bcrupt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrupt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrupt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashedPassword) => {
  return bcrupt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
