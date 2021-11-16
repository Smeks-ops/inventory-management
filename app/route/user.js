const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const controller = require('../controller/user');
const jwtVerify = require('../utilis/utils');

const user = express.Router();

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: false }));

user.post('/sign-up', asyncHandler((req, res) => controller.createAUser(req, res)));

user.post('/sign-in', asyncHandler((req, res) => controller.signIn(req, res)));

user.put('/update-user/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.updateUser(req, res)));

user.get('/user/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.getUser(req, res)));

user.delete('/user/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.deleteUser(req, res)));

module.exports = user;
