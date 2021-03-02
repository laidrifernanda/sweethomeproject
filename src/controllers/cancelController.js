const cancelService = require("../services/cancel");

// Module exports
module.exports = {
  cancel: async (req, res) => {
    const { body, user } = req;
    const { projectId } = req.params;

    // Update user
    const newCancel = {
      ...body,
      project: projectId,
      user: user._id,
    };
    try {
      const saveCancel = await cancelService.cancel(newCancel, projectId);
      res.send({ status: 200, message: saveCancel });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
