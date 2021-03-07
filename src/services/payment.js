//Import data
const { paymentModel, projectModel } = require("../model");

//Module exports
module.exports = {
  findAll: async (page, limit) => {
    return await paymentModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  find: async (paymentId) => {
    return await paymentModel.findById({ _id: paymentId });
  },
  payment: async (newPayment, projectId) => {
    const project = projectModel.findById(projectId);
    const paymentData = new paymentModel(newPayment);
    await projectModel.findByIdAndUpdate(
      { _id: projectId },
      { status: "On Going" }
    );
    project.payment.push(paymentData)
    await project.save();
    return await paymentData.save();
  },
  getPagination: async (page, limit) => {
    const totalItem = await paymentModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
};
