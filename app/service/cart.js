/* eslint-disable consistent-return */
/* eslint-disable no-console */
const cartModel = require('../model/cart');

module.exports = {
  async addToCart(data) {
    try {
      const result = await cartModel.create(data);
      return result;
    } catch (e) {
      console.log('an error occurred while adding to cart', e);
      return null;
    }
  }
}