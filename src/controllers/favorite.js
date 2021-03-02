//Import data
const favoriteService = require("../services/favorite");

//Module exports
module.exports = {
  browse: async (req, res) => {
    const { user } = req
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const favorite = await favoriteService.find(user._id, +page, +limit);

      //get total documents
      const pageInfo = await favoriteService.getPagination(user._id, +page, +limit);

      res.status(200).send({ data: favorite, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}