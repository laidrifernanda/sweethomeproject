//Import data
const { paymentModel, projectModel } = require("../model");

//Module exports
module.exports = {
  find: async (paymentId) => {
    return await paymentModel.findById({_id: paymentId});
  },
  upload: async (newPayment, projectId) => {
    const paymentData = new paymentModel(newPayment)
    const projectData = await projectModel.findByIdAndUpdate({_id: projectId}, {status: "On Going"})
    await paymentData.save()
    return paymentData
  },
};
