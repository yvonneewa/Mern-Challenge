const jwt = require('jsonwebtoken');
const { User } = require('./models');

const authMiddleware = async (req) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  if (token) {
    try {
      const { data } = jwt.verify(token, 'your_jwt_secret');
      const user = await User.findById(data._id);
      return { user };
    } catch {
      console.log('Invalid token');
    }
  }

  return {};
};

module.exports = authMiddleware;
