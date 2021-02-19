//Import data
const appointmentService = require('../services/appointment')

//Module exports
module.exports = {
  create: async (req, res) => {
    const { body, user } = req;

    //insert appointment
    const newAppointments = {
      ...body,
      user: user._id
    }
    try{
      const savedAppointment = await appointmentService.add(newAppointments, user._id)
      res.send({status: 200,data: savedAppointment})
    }catch(err){
      res.status(400).json({ error: err.message });
    }
  }
};