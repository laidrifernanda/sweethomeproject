//Import data
const paymentService = require("../services/payment");

//Module exports
module.exports = {
  create: async (req, res) => {
    const { body, user } = req;

    const newPayment = {
      ...body,
      user: user._id,
    };
    try {
      const savedPayment = await paymentService.add(newPayment);
      res.send({ status: 200, data: savedPayment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  upload: async (req, res) => {
    const { file } = req;
    const {paymentId} = req.params
    const uploadFile = file.location;
    try {
      const uploadPayment = await paymentService.upload(paymentId, uploadFile);
      res
        .status(200)
        .send({ message: "upload receipt success", data: uploadPayment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
