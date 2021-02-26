//Import data
const paymentService = require("../services/payment");

//Module exports
module.exports = {
  find: async (req, res) => {
    const {paymentId} = req.params
    try {
      const paymentData = await paymentService.find(paymentId);
      res
      .status(200)
      .send({message: "Success get data", data: paymentData});
    } catch (err) {
      res.status(400).json({error: err.message})
    }
  },
  upload: async (req, res) => {
    const { body, file, user } = req;
    const {projectId} = req.params;
    const uploadFile = file.location;
    const newPayment = {
      ...body,
      receipt: uploadFile,
      user: user._id
    }
    try {
      const uploadPayment = await paymentService.upload(newPayment, projectId);
      res
        .status(200)
        .send({ message: "upload receipt success", data: uploadPayment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
