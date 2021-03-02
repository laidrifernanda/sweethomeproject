//Import data
const appointmentService = require("../services/appointment");

//Module exports
module.exports = {
  browse: async (req, res) => {
    const { user } = req;
    const { page = 1, limit = 10 } = req.query;
    try {
      const appointment = await appointmentService.find(user, +page, +limit);

      //get total documents
      const pageInfo = await appointmentService.getPagination(
        user,
        +page,
        +limit
      );
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
  create: async (req, res) => {
    const { body, user } = req;

    //insert appointment
    const newAppointments = {
      ...body,
      user: user._id,
    };
    try {
      const savedAppointment = await appointmentService.add(
        newAppointments,
        user._id
      );
      res.send({ status: 200, data: savedAppointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
