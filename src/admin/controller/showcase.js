//Import data
const showcaseService = require("../services/showcase");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const project = await showcaseService.find(page, limit);

      //get total documents
      const pageInfo = await showcaseService.getPagination(page, limit);

      res.status(200).send({ data: project, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  search: async (req, res) => {
    // destructure page and limit and set default values
    const { query } = req.query;
    try {
      //get total documents
      const searchData = await showcaseService.search(query);

      res.status(200).send({ data: searchData });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await showcaseService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body, admin } = req;

    //Create new category
    const showcaseData = { ...body, admin: admin._id };

    try {
      const saveShowcase = await showcaseService.add(showcaseData);
      res.send(saveShowcase);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  upload: async (req, res) => {
    const { file } = req;

    //get data from body
    const uploadPhoto = file.location;
    res
      .status(200)
      .send({ message: "Upload photo success", data: uploadPhoto });
  },
};
