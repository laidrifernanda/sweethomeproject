//Import data
const { appointmentModel, projectModel } = require("../../model");
const moment = require("moment");

//Module exports
module.exports = {
  data: async (defaultDate) => {
    let date = moment(defaultDate).startOf("day");
    const today = await appointmentModel
      .find({
        date: {
          $gte: moment(date).startOf("day").toDate(),
          $lte: moment(date).endOf("day").toDate(),
        },
      })
      .populate({ path: "user", select: ["firstname", "lastname"] })
      .populate({ path: "serviceType", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "timeslot", select: ["start", "end"] })
      .select([
        "-status",
        "-duration",
        "-area",
        "-budget",
        "-address",
        "-note",
        "-styles",
        "-buildType",
        "-ticket",
      ]);

    const tommorow = await appointmentModel
      .find({
        date: {
          $gte: moment(date).add(1, "day").startOf("day").toDate(),
          $lte: moment(date).add(1, "day").endOf("day").toDate(),
        },
      })
      .populate({ path: "user", select: ["firstname", "lastname"] })
      .populate({ path: "serviceType", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "timeslot", select: ["start", "end"] })
      .select([
        "-status",
        "-duration",
        "-area",
        "-budget",
        "-address",
        "-note",
        "-styles",
        "-buildType",
        "-ticket",
      ]);

    const theDayAfterTommorow = await appointmentModel
      .find({
        date: {
          $gte: moment(date).add(2, "day").startOf("day").toDate(),
          $lte: moment(date).add(2, "day").endOf("day").toDate(),
        },
      })
      .populate({ path: "user", select: ["firstname", "lastname"] })
      .populate({ path: "serviceType", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "timeslot", select: ["start", "end"] })
      .select([
        "-status",
        "-duration",
        "-area",
        "-budget",
        "-address",
        "-note",
        "-styles",
        "-buildType",
        "-ticket",
      ]);

    const thisYearAppointment = await appointmentModel.aggregate([
      {
        $match: {
          date: {
            $gte: moment(date).startOf("year").toDate(),
            $lte: moment(date).endOf("year").toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $month: { $toDate: "$date" } },
          count: { $sum: 1 },
        },
      },
    ]);

    const thisYearProject = await projectModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment(date).startOf("year").toDate(),
            $lte: moment(date).endOf("year").toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $month: { $toDate: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      today,
      tommorow,
      theDayAfterTommorow,
      thisYearAppointment,
      thisYearProject,
    };
  },
};
