const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const controller = require('../controller/cart');
const jwtVerify = require('../utilis/utils');

const cart = express.Router();

cart.use(bodyParser.json());
cart.use(bodyParser.urlencoded({ extended: false }));

cart.post('/cart', asyncHandler((req, res, next) => jwtVerify(req, res, next)),  asyncHandler((req, res) => controller.addToCart(req, res)));

module.exports = cart;
