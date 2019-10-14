const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('./auth.model');

const createTokenSendResponse = (user, res, next) => {
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
    active: user.active,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    }, (err, token) => {
      if (err) {
        res.status(422);
        const error = Error('Unable to login');
        next(error);
      } else {
      // login all good
        res.json({ token });
      }
    },
  );
};

const get = (req, res) => {
  res.json({
    message: 'Hello Auth! 🔐',
  });
};

const signup = async (req, res, next) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 12);
    const newUser = {
      username: req.body.username,
      password: hashed,
      role: 'user',
      active: true,
    };
    const insertedUser = await users.insert(newUser);
    createTokenSendResponse(insertedUser, res, next);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.loggingInUser.password,
    );
    if (result) {
      createTokenSendResponse(req.loggingInUser, res, next);
    } else {
      res.status(422);
      throw new Error('Unable to login');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    next(error);
  }
};

module.exports = {
  get,
  login,
  signup,
};
