// Import data
const { cancelModel, projectModel } = require("../model");

// Module exports
module.exports = {
  findall: async (page, limit) => {
    return await cancelModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  find: async (cancelId) => {
    return await cancelModel.findById({ _id: cancelId });
  },
  cancel: async (newCancel, projectId) => {
     const project = await projectModel.findById(projectId);
    const cancelData = new cancelModel(newCancel);
    await projectModel.findByIdAndUpdate(
      { _id: projectId },
      { status: "Cancelled" }
    );
    project.cancelPayment.push(cancelData)
    await project.save()
    return await cancelData.save();
  },
  getPagination: async (page, limit) => {
    const totalItem = await cancelModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
};
