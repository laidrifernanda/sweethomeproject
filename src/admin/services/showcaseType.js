//Import model
const { showcaseTypeModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await showcaseTypeModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findId: async (id) => {
    return await showcaseTypeModel.findById(id);
  },
  add: async (showcaseTypeData) => {
    const showcaseType = new showcaseTypeModel(showcaseTypeData);
    return await showcaseType.save();
  },
  getPagination: async (page, limit) => {
    const totalItem = await showcaseTypeModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
