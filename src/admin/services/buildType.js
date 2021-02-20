//Import model
const { buildTypeModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await buildTypeModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
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
    return await buildTypeModel.findByIdAndUpdate(id, buildTypeData, { new: true, runValidators: true });
  },
  delete: async (id) => {
    return await buildTypeModel.findByIdAndDelete(id);
  },
  getPagination: async (page, limit) => {
    const totalItem = await buildTypeModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
