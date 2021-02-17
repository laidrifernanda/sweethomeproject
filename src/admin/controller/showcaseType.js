//Import data
const showcaseTypeService = require("../services/showcaseType");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit=10 } = req.query;
    try {
      const showcaseType = await showcaseTypeService.find(page, limit);

      //get total documents
      const pageInfo = await showcaseTypeService.getPagination(page, limit);

      res.status(200).send({ data: showcaseType, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await showcaseTypeService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const showcaseTypeData = { ...body };

    try {
      const saveStyle = await showcaseTypeService.add(showcaseTypeData);
      res.send(saveStyle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
