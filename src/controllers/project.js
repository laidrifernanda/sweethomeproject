//Import data
const projectService = require("../services/project");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const project = await projectService.find(page, limit);

      //get total documents
      const pageInfo = await projectService.getPagination(page, limit);

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await projectService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
}