//Import data
const styleService = require("../services/style");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1 , limit = 10 } = req.query;
    try {
      const style = await styleService.find(page, limit);

      //get total documents
      const pageInfo = await styleService.getPagination(page, limit);

      res.status(200).send({ data: style, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message});
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await styleService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const styleData = { ...body };

    try {
      const saveStyle = await styleService.add(styleData);
      res.send(saveStyle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const styleData = { ...body };

    try {
      const updateStyle = await styleService.edit(id, styleData);
      res.send({message: "Update style Success", data: updateStyle});
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteStyle = await styleService.delete(id);

      res
        .status(200)
        .send({ message: "Delete Style Success", data: deleteStyle });
    } catch (err) {
      if (err instanceof RefConstraintError === true) {
        res.status(400).json({message: "Cannot delete"})
      }
      res.status(400).json({ error: err.message});
    }
  },
};