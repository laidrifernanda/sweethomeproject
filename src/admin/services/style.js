//Import model
const {stylesModel} = require('../../model');

//Module exports
module.exports = {
  find: async (page , limit) => {
    return await stylesModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
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
    return await stylesModel.findByIdAndUpdate(id, styleData, { new: true, runValidators: true });
  },
  delete: async (id) => {
    const style = await stylesModel.findById(id)
    await stylesModel.deleteOne({ _id: id });
    return style;
  },
  getPagination: async (page, limit) => {
    const totalItem = await stylesModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};