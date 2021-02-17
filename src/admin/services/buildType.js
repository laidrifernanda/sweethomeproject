//Import model
const { buildTypeModel } = require("../../models");

//Module exports
module.exports = {
  find: async (page) => {
    return await buildTypeModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await buildTypeModel.findById(id);
  },
  add: async (buildTypeData) => {
    const buildType = new buildTypeModel(buildTypeData);
    return await buildType.save();
  },
  edit: async (id, buildTypeData) => {
    return await buildTypeModel.findByIdAndUpdate(id, buildTypeData, { new: true });
  },
  delete: async (id) => {
    return await buildTypeModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await buildTypeModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};
