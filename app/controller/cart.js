/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const cartService = require('../service/cart');
const inventoryService = require('../service/inventory.js');

module.exports = {
  async addToCart(req, res) {
    let messageBody;
    let result;
    try {
      const userObject = req.decoded
      const inventoryData = await inventoryService.getInventoryById(req.body.inventory)
      console.log('inventoryData', inventoryData)
      if (inventoryData.quantity < req.body.quantity) {
        return res.status(400).send({
          error: true,
          code: 400,
          message: `The quantity left for this product is ${inventoryData.quantity}`,
        });
      } else {
        const quantityRemaining = inventoryData.quantity - req.body.quantity
        req.body.user = userObject._id
        result = await cartService.addToCart(req.body);
        await inventoryService.updateInventory(inventoryData._id, {
          quantity: quantityRemaining
        })
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
      }

    } catch (error) {
      console.log('error', error);
      return res.status(400).send({
        status: 'error',
        data: null,
      });
    }
  },


}