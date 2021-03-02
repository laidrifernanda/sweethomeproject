//Import data
const buildTypeService = require("../services/buildType");
const { RefConstraintError } = require('mongoose-references-integrity-checker');

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1 , limit = 10} = req.query;
    try {
      const buildType = await buildTypeService.find(+page, +limit);

      //get total documents
      const pageInfo = await buildTypeService.getPagination(+page, +limit);

      res.status(200).send({ data: buildType, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const buildType = await buildTypeService.findId(id);

      res.status(200).send({ data: buildType });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const buildTypeData = { ...body };

    try {
      const saveBuildType = await buildTypeService.add(buildTypeData);
      res.send(saveBuildType);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const buildTypeData = { ...body };

    try {
      const updateBuildType = await buildTypeService.edit(id, buildTypeData);
      res.send({ message: "Update Build Type Success", data: updateBuildType });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteBuildType = await buildTypeService.delete(id);

      res
        .status(200)
        .send({ message: "Delete Build Type Success", data: deleteBuildType });
    } catch (err) {
      if (err instanceof RefConstraintError === true) {
        res.status(400).json({message: "Cannot delete"})
      }
      res.status(400).json({ error: err.message});
    }
  },
};
