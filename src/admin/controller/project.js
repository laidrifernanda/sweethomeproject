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
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const projectData = { ...body };

    try {
      const saveProject = await projectService.add(projectData);
      res.send(saveProject);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  upload: async (req, res) => {
    const { file } = req;
    const { projectId } = req.params;
    //get data from body
    const uploadFile = file.location;
    try {
      const uploadReceipt = await projectService.upload(projectId, uploadFile);

      res
        .status(200)
        .send({ message: "Upload receipt success", data: uploadReceipt });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const orderData = { ...body };

    try {
      const updateProjectType = await projectService.edit(id, orderData);
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

      const deleteProjectType = await projectService.delete(id);

      res.status(200).send({
        message: "Delete Project Type Success",
        data: deleteProjectType,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
