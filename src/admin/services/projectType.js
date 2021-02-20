//Import model
const { projectTypeModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page) => {
    return await projectTypeModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await projectTypeModel.findById(id);
  },
  add: async (projectTypeData) => {
    const projectType = new projectTypeModel(projectTypeData);
    return await projectType.save();
  },
  edit: async (id, projectTypeData) => {
    return await projectTypeModel.findByIdAndUpdate(id, projectTypeData, { new: true, runValidators: true });
  },
  delete: async (id) => {
    return await projectTypeModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await projectTypeModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};
