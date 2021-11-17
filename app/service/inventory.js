/* eslint-disable consistent-return */
/* eslint-disable no-console */
const inventoryModel = require('../model/inventory');

module.exports = {

  async saveInventory(data) {
    try {
      const result = await inventoryModel.create(data);
      return result;
    } catch (e) {
      console.log('an error occurred while saving inventory', e);
      return null;
    }
  },

  async getInventories() {
    try {
      const inventoryData = await inventoryModel.find({ isDeleted: false });
      console.log('inventoryData', inventoryData);
      return inventoryData;
    } catch (e) {
      console.log('an error occurred while getting an inventory', e);
    }
  },

  async getInventoryById(id) {
    try {
      return inventoryModel.findOne({ _id: id, isDeleted: false });

    } catch (e) {
      console.log('an error occurred while getting an inventory', e);
    }
  },

  async updateInventory(id, payload) {
    try {
      const inventoryData = await inventoryModel.findByIdAndUpdate(id, payload, { new: true });
      return inventoryData;
    } catch (e) {
      console.log('an error occurred', e);
      return e;
    }
  },

  async isExist(id) {
    return inventoryModel.findById(id);
  }
  
};
