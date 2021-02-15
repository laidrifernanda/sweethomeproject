//Import data
const serviceTypeService = require("../services/serviceType");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1 } = req.query;
    try {
      const serviceType = await serviceTypeService.find(page);

      //get total documents
      const pageInfo = await serviceTypeService.getPagination(page);

      res.status(200).send({ data: serviceType, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await serviceTypeService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const serviceTypeData = { ...body };

    try {
      const saveServiceType = await serviceTypeService.add(serviceTypeData);
      res.send(saveServiceType);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const serviceTypeData = { ...body };

    try {
      const updateServiceType = await serviceTypeService.edit(
        id,
        serviceTypeData
      );
      res.send({
        message: "Update ServiceType Success",
        data: updateServiceType,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteServiceType = await serviceTypeService.delete(id);

      res
        .status(200)
        .send({
          message: "Delete Service Type Success",
          data: deleteServiceType,
        });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
