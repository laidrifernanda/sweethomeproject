//Import data
const locationService = require("../services/location");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1 , limit = 10} = req.query;
    try {
      const location = await locationService.find(page, limit);

      //get total documents
      const pageInfo = await locationService.getPagination(page, limit);

      res.status(200).send({ data: location, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await locationService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const locationData = { ...body };

    try {
      const saveLocation = await locationService.add(locationData);
      res.send(saveLocation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const locationData = { ...body };

    try {
      const updateLocation = await locationService.edit(id, locationData);
      res.send({ message: "Update location Success", data: updateLocation });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteLocation = await locationService.delete(id);

      res
        .status(200)
        .send({ message: "Delete location Success", data: deleteLocation });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
