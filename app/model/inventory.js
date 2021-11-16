const { boolean } = require('joi');
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const inventoryModel = mongoose.model('inventory', inventorySchema);

module.exports = inventoryModel;
