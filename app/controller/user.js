/* eslint-disable no-shadow */
/* eslint-disable no-console */
const userService = require('../service/user');
const { signInSchema, signUpSchema } = require('../schema/user');
const userModel = require('../model/user');

module.exports = {
  async createAUser(req, res) {
    let messageBody;
    let result;

    try {
      // validate the request body
      await signUpSchema.validateAsync(req.body);

      result = await userService.createAUser(req.body);

      if (result === false) {
        console.log('This email already exists, kindly sign in');
        messageBody = 'This email already exists, kindly sign in';
        return res.status(409).send({
          error: true,
          code: 409,
          message: messageBody,
        });
      }
      if (result === null) {
        return res.status(500).send({
          error: true,
          code: 500,
          message: 'An error occurred',
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully signed up',
        data: result.result,
        token: result.token,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async signIn(req, res) {
    let messageBody;
    let error;
    let code;

    try {
      await signInSchema.validateAsync(req.body);
      const data = await userService.getOneData(userModel, req.body.email);
      const isUserExist = await userService.validateUser(
        data,
        req.body.password,
      );

      if (isUserExist === null) {
        error = true;
        code = 404;
        console.log('User does not exist, kindly sign up');
        messageBody = 'User does not exist, kindly sign up';
      } else if (isUserExist === false) {
        console.log('Incorrect password');
        error = true;
        code = 400;
        messageBody = 'Incorrect password';
      } else {
        console.log('Sign in was successful');
        messageBody = 'Sign in was successful';
        return res.status(200).send({
          error: false,
          code: 200,
          message: messageBody,
          data: isUserExist.user,
          token: isUserExist.token,
        });
      }

      return res.status(code).send({
        error,
        code,
        message: messageBody,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    console.log('id', id);

    const result = await userService.updateUser(req.body, id);
    console.log('result from user update', result);

    if (result === null) {
      console.log('user not found');
      return res.status(404).send({
        error: true,
        code: 400,
        message: 'User not found',
      });
    }
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'User data has been updated',
      data: result,
    });
  },

  async getUser(req, res) {
    const { id } = req.params;

    const userData = await userService.getUser(id);
    console.log('user successfully fetched');
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'User successfully fetched',
      data: userData,
    });
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    const thirdParam = 'Yes';

    const isUserExist = await userService.getOneData(userModel, id, thirdParam);
    console.log('isUserExist', isUserExist);

    if (isUserExist) {
      const userData = await userService.deleteUser(id);
      console.log('User successfully deleted');
      return res.status(200).send({
        error: false,
        code: 200,
        message: 'User successfully deleted',
        data: userData,
      });
    }
    console.log('user not found');
    return res.status(404).send({
      error: true,
      code: 404,
      message: 'User not found',
    });
  },
};
