//Import data
const userService = require("../services/customer");

//Modules exports
module.exports = {
  browse: async (req, res) => {
    const { page = 1 , limit= 10} = req.query;
    try {
      const user = await userService.find(+page, +limit);

      //get total documents
      const pageInfo = await userService.getPagination(+page, +limit);
      res.status(200).send({ data: user, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
}