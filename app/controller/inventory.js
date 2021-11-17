/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const inventoryService = require('../service/inventory');

module.exports = {
  async saveInventory(req, res) {
    const userData = req.decoded
    if (userData.role !== "admin") {
      return res.status(400).send({
        error: true,
        code: 400,
        message: 'Sorry, you cannot perform this action',
      });
    }

    let messageBody;
    let result;
    try {
      req.body.price = `₦${req.body.price}`
      result = await inventoryService.saveInventory(req.body);
      if (result.result === null) {
        console.log('Internal server error');
        messageBody = 'Internal server error';
        return res.status(500).send({
          error: true,
          code: 500,
          message: messageBody,
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully saved inventory',
        data: result,
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

  async getInventories(req, res) {
    console.log('req.decoded', req.decoded)
    const inventoryData = await inventoryService.getInventories();
    console.log('user successfully fetched');
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'inventory successfully fetched',
      data: inventoryData,
    });
  },

  async updateInventory(req, res) {
    const { id } = req.params;

    if (req.body.price) {
      req.body.price = `₦${req.body.price}`
    }

    const result = await inventoryService.updateInventory(id, req.body);
    if (result === null) {
      return res.status(404).send({
        error: true,
        code: 400,
        message: 'Inventory not found',
      });
    }
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'Inventory data has been updated',
      data: result,
    });
  },

  async deleteInventory(req, res) {
    const { id } = req.params;

    const isExist = await inventoryService.isExist(id);

    if (isExist === null) {
      return res.status(404).send({
        error: true,
        code: 400,
        message: 'Inventory not found',
      });
    }
    const isDeleted = true;
    await inventoryService.updateInventory(id, { isDeleted })
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'Inventory has been deletd',
    });
  },

 };
