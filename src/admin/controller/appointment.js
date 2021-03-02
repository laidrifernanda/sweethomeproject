//Import data
const appointmentService = require("../services/appointment");

//Modules exports
module.exports = {
  browse: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const appointment = await appointmentService.find(+page, +limit);

      //get total documents
      const pageInfo = await appointmentService.getPagination(+page, +limit);
      res.status(200).send({ data: appointment, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await appointmentService.findId(id);

      res.status(200).send({ data: appointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  status: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    //Update category
    const statusData = { status: status };

    try {
      const udpateStatus = await appointmentService.status(id, statusData);
      res.send({ message: "Update status Success", data: udpateStatus });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
