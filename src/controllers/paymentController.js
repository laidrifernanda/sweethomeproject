//Import data
const paymentService = require("../services/payment");

//Module exports
module.exports = {
  upload: async (req, res) => {
    const { file } = req;
    
    try {
      const uploadFile = file.location;
      res
        .status(200)
        .send({ message: "upload receipt success", data: uploadFile });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  payment: async (req, res) => {
    const { body, user } = req;
    const { projectId } = req.params;

    //update user
    const newPayment = {
      ...body,
      project: projectId,
      user: user._id,
    };
    try {
      const savePayment = await paymentService.payment(newPayment, projectId);
      res.send({ status: 200, message: savePayment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
