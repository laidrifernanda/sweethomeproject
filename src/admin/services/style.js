//Import model
const {stylesModel} = require('../../models');

//Module exports
module.exports = {
  find: async (page) => {
    return await stylesModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await stylesModel.findById(id);
  },
  add: async (styleData) => {
    const style = new stylesModel(styleData);
    return await style.save();
  },
  edit: async (id, styleData) => {
    return await stylesModel.findByIdAndUpdate(id, styleData, { new: true });
  },
  delete: async (id) => {
    return await stylesModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await stylesModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};