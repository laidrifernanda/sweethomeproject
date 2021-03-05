const feedbackService = require("../services/feedback");

// Module exports
module.exports = {
  feedback: async (req, res) => {
    const { body, user } = req;
    const { projectId } = req.params;

    // Update user
    const newFeedback = {
      ...body,
      project: projectId,
      user: user._id,
    };
    try {
      const saveFeedback = await feedbackService.feedback(newFeedback);
      res.send({ status: 200, message: saveFeedback });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
