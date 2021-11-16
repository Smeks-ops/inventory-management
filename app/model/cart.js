const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

  inventory: {
    type: mongoose.Schema.Types.ObjectId, ref: 'inventory',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
  },
  quantity: {
    type: Number
  }


});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;
