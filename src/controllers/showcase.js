const showcaseService = require("../services/showcaseServices")
//module exports
module.exports = {
  project: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const status = "Completed project"
    try {
      const project = await showcaseService.find(page, limit, status);

      //get total documents  
      const pageInfo = await showcaseService.getPagination(page, limit);

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  profile: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    const status = "Portofolio"
    try {
      const project = await showcaseService.find(page, limit, status);

      //get total documents  
      const pageInfo = await showcaseService.getPagination(page, limit);

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
}