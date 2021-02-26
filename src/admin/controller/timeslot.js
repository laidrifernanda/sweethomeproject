//Import data
const timeslotService = require("../services/timeslot");

//Module exports
module.exports = {
  browse: async (req, res) => {
    const { serviceTypeId } = req.params;
    // destructure page and limit and set default values
    const { page = 1, limit= 10 } = req.query;
    try {
      const timeslot = await timeslotService.find(serviceTypeId, page, limit);

      //get total documents
      const pageInfo = await timeslotService.getPagination(page, limit);

      res.status(200).send({ data: timeslot, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;
    const { serviceTypeId } = req.params;

    //Create new category
    const timeslotData = { ...body };

    try {
      const saveTimeslot = await timeslotService.add(serviceTypeId, timeslotData);
      res.send(saveTimeslot);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const timeslotData = { ...body };

    try {
      const updateTimeslot = await timeslotService.edit(id, timeslotData);
      res.send({ message: "Update Timeslot Success", data: updateTimeslot });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteTimeslot = await timeslotService.delete(id);

      res
        .status(200)
        .send({ message: "Delete Timeslot Success", data: deleteTimeslot });
    } catch (err) {
      if (err instanceof RefConstraintError === true) {
        res.status(400).json({message: "Cannot delete"})
      }
      res.status(400).json({ error: err.message});
    }
  },
};
