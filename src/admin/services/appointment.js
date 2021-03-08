//Import data
const { appointmentModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await appointmentModel
      .find()
      .populate({ path: "buildType", select: "name" })
      .populate({ path: "locations", select: "name" })
      .populate({ path: "serviceType", select: "name" })
      .populate({ path: "user", select: ["id", "firstname", "lastname"] })
      .populate({ path: "timeslot", select: ["id", "start", "end"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findId: async (id) => {
    return await appointmentModel
      .findById(id)
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "serviceType", select: ["name"] })
      .populate({
        path: "user",
        select: ["id", "firstname", "lastname", "email"],
      })
      .populate({ path: "buildType", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "timeslot" });
  },
  status: async (id, statusData) => {
    return await appointmentModel.findByIdAndUpdate(id, statusData, {
      new: true,
      runValidators: true,
    });
  },
  getPagination: async (page, limit) => {
    const totalItem = await appointmentModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
