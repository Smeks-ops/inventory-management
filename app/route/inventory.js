const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const controller = require('../controller/inventory');
const jwtVerify = require('../utilis/utils');

const inventory = express.Router();

inventory.use(bodyParser.json());
inventory.use(bodyParser.urlencoded({ extended: false }));

inventory.post('/inventory', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.saveInventory(req, res)));

inventory.put('/inventory/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.updateInventory(req, res)));

inventory.delete('/inventory/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.deleteInventory(req, res)));

inventory.get('/inventory', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.getInventories(req, res)));



module.exports = inventory;
