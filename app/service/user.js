/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

const generateToken = (userData) => jwt.sign({ userData },
  process.env.SECRET_KEY, { expiresIn: 86400 });
module.exports = {

  // hash the password before saving to the db
  async hashPassword(data) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data, salt, function(err, hash) {
          resolve(hash);
        });
      });
    });
  },

  async createAUser(data) {
    try {
      data.password = await this.hashPassword(data.password);
      const result = await userModel.create(data);
      const token = await generateToken(result);
      return { result, token };
    } catch (e) {
      console.log('an error occurred');
      if (e.name === 'MongoError' && e.code === 11000) {
        return false;
      }
      return e;
    }
  },

  async getOneData(model, data, param) {
    try {
      if (param) {
        const result = await model.findOne({ _id: data });
        return result;
      }
      const result = await model.findOne({ email: data });
      return result;
    } catch (e) {
      return null;
    }
  },

  async validateUser(param, yet) {
    if (param === null) {
      console.log('Data gotten');
      return null;
    }
    // Load hash from your password DB.
    return bcrypt.compare(yet, param.password).then(async (result) => {
      if (param && result === true) {
        const user = param.toObject();
        const token = await generateToken(user);
        delete user.password;
        return { user, token };
      }
      return result;
    });
  },

  async updateUser(param, data) {
    if (param.password) {
      param.password = await this.hashPassword(param.password);
    }
    try {
      console.log('daaa', param);
      return await userModel.findByIdAndUpdate(data, param, { new: true });
    } catch (e) {
      console.log('an error occurred', e);
      if (e.name === 'MongoError' && e.code === 11000) {
        return false;
      }
      return false;
    }
  },

  async getUser(param) {
    try {
      const userData = await userModel.find({ _id: param });
      const user = userData[0].toObject();
      delete user.password;
      return user;
    } catch (e) {
      console.log('an error occurred while getting a user', e);
    }
  },

  async deleteUser(param) {
    try {
      return await userModel.findOneAndDelete({ _id: param });
    } catch (e) {
      console.log('an error occurred while deleting a user', e);
    }
  },

};
