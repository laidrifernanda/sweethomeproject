//Import data
const {userModel, appointmentModel} = require('../model');

//Module export
module.exports = {
  add: async (newAppointments, userId) => {
    //Create new appointments
    const user = await userModel.findById(userId);
    const appointmentData = new appointmentModel(newAppointments)
    
    await appointmentData.save()
    user.appointments.push(appointmentData)
    await user.save()
    return appointmentData
  }
}