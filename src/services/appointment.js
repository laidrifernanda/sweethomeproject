//Import data
const { userModel, appointmentModel } = require("../model");

//Module export
module.exports = {
  find: async (user, page, limit) => {
    return await appointmentModel
      .find({ user: user._id })
      .populate({ path: "locations", select: "name" })
      .populate({ path: "styles", select: "name" })
      .populate({ path: "serviceType", select: "name" })
      .populate({ path: "buildType", select: "name" })
      .populate({ path: "user", select: ["id", "firstname", "lastname"] })
      .populate({ path: "timeslot", select: ["id", "start", "end"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  add: async (newAppointments, userId) => {
    //Create new appointments
    const user = await userModel.findById(userId);
    const appointmentData = new appointmentModel(newAppointments);

    await appointmentData.save();
    user.appointments.push(appointmentData);
    await user.save();
    return appointmentData;
  },
  getPagination: async (user, page, limit) => {
    const totalItem = await appointmentModel
      .find({ user: user._id })
      .countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
