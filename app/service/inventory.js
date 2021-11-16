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
      // const user = userData[0].toObject();
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

  // async deletePost(param) {
  //   try {
  //     return await postModel.findOneAndDelete({ _id: param });
  //   } catch (e) {
  //     console.log('an error occurred while deleting a post', e);
  //   }
  // },

  // async addLike(data) {
  //   try {
  //     const result = await postReactionModel.create(data);
  //     return result;
  //   } catch (e) {
  //     console.log('an error occurred while liking a post', e);
  //     return null;
  //   }
  // },

  // async removeLike(data) {
  //   try {
  //     const result = await postReactionModel.findOneAndDelete(data);
  //     return result;
  //   } catch (e) {
  //     console.log('an error occurred while unliking a post', e);
  //     return null;
  //   }
  // },

  // async getOneData(model, data, param) {
  //   try {
  //     if (param) {
  //       const result = await model.findOne({ _id: data });
  //       return result;
  //     }
  //     const result = await model.findOne(data);
  //     return result;
  //   } catch (e) {
  //     return null;
  //   }
  // },

  // async getAllLikes(data) {
  //   try {
  //     return postReactionModel.find(data)
  //       .populate('user_id')
  //       .populate('post_id')
  //       .then((result) => result);
  //   } catch (e) {
  //     return null;
  //   }
  // },
};
