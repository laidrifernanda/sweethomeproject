//Import data
const appointmentService = require("../services/appointmentService");

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    console.log(req.query, "ini quiry")
    const { page = 1 } = req.query;
    try {
      const appointment = await appointmentService.find(page);

      //get total documents
      const pageInfo = await appointmentService.getPagination(page);

      res.status(200).send({ data: appointment, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message});
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await appointmentService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const appointmentData = { ...body };

    try {
      const saveAppointment = await appointmentService.add(appointmentData);
      res.send(saveAppointment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const appointmentData = { ...body };

    try {
      const updateAppointment = await appointmentService.edit(id, appointmentData);
      res.send({message: "Update appointment Success", data: updateAppointment});
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteAppointment = await appointmentService.delete(id);

      res
        .status(200)
        .send({ message: "Delete appointment Success", data: deleteAppointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};