//Import data
const { paymentModel } = require("../model");

//Module exports
module.exports = {
  findId: async (id) => {
    return await paymentModel.findById(id);
  },
  add: async (newPayment) => {
    const paymentData = new paymentModel(newPayment);
    await paymentData.save();
    return paymentData;
  },
  upload: async (paymentId, uploadReceipt) => {
    return await paymentModel.findByIdAndUpdate(paymentId,
      { receipt: uploadReceipt },
      { new: true }
    );
  },
};
