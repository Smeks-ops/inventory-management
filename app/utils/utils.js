/* eslint-disable no-console */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({
      auth: false,
      code: 400,
      message: 'No token provided.',
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      console.log('Failed to verify token. Invalid token provided');
      return res.status(401).send({
        auth: false,
        code: 401,
        message: 'Failed to verify token. Invalid token provided',
      });
    }
    userModel.findOne(decoded.id, async (err, client) => {
      if (err) {
        console.log('There was a problem finding the user.');
        return res.status(500).send({
          code: 500,
          message: 'There was a problem finding the user.',
        });
      } if (!client) {
        console.log('No user found.');
        return res.status(404).send({
          code: 404,
          message: 'No user found.',
        });
      }
      req.decoded = decoded.userData;
      next();
    });
  });
};
