//Import model
const { appointmentModel } = require("../../model");
const moment = require("moment");
const timeslot = require("../../model/timeslot");

//Module exports
module.exports = {
  find: async (year, month) => {
    let date = new Date(`${year}-${month}-01`);
    date = moment(date);
    return await appointmentModel
      .find({
        date: { $gte: date.toDate(), $lte: date.endOf("month").toDate() },
      })
      .populate({ path: "user", select: ["firstname", "lastname"] })
      .populate({ path: "timeslot" , select: ["start","end"]})
      .select(["date"]);
  },
};
