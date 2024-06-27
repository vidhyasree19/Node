const jwt = require('jsonwebtoken');
const User = require('../model/User');

const generateToken = (user) => {
    const secretKey = 'your_secret_key_here';
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    return token;
  };

module.exports = {
  generateToken
};