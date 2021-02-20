//Import data
const projectTypeService = require("../services/projectType");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const projectType = await projectTypeService.find(page, limit);

      //get total documents
      const pageInfo = await projectTypeService.getPagination(page, limit);

      res.status(200).send({ data: projectType, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await projectTypeService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const projectTypeData = { ...body };

    try {
      const saveProjectType = await projectTypeService.add(projectTypeData);
      res.send(saveProjectType);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const projectTypeData = { ...body };

    try {
      const updateProjectType = await projectTypeService.edit(
        id,
        projectTypeData
      );
      res.send({
        message: "Update Project Type Success",
        data: updateProjectType,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteProjectType = await projectTypeService.delete(id);

      res
        .status(200)
        .send({
          message: "Delete Project Type Success",
          data: deleteProjectType,
        });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
