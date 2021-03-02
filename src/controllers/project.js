//Import data
const projectService = require("../services/project");

//Module exports
module.exports = {
  browse: async (req, res) => {
    const { user } = req
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const project = await projectService.find(user._id ,page, limit);

      //get total documents
      const pageInfo = await projectService.getPagination(page, limit);

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { projectId } = req.params;
      const projectData = await projectService.findId(projectId);

      res.status(200).send({ data: projectData });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
}