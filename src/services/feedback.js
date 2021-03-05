// Import data
const { feedbackModel } = require("../model");

// Module exports
module.exports = {
  findall: async (page, limit) => {
    return await feedbackModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  find: async (feedbackId) => {
    return await feedbackModel.findById({ _id: feedbackId });
  },
  feedback: async (newFeedback) => {
    const feedbackData = new feedbackModel(newFeedback);
    return await feedbackData.save();
  },
  getPagination: async (page, limit) => {
    const totalItem = await feedbackModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
};
