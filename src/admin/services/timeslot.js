//Import data
const { serviceTypeModel, timeslotModel } = require("../../model");

//Module exports
module.exports = {
  find: async (serviceTypeId, page, limit) => {
    return await timeslotModel
      .find({ serviceType: serviceTypeId })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  add: async (serviceTypeId, timeslotData) => {
    //Create new timeslot
    const serviceType = await serviceTypeModel.findById(serviceTypeId);
    const timeslot = new timeslotModel({
      ...timeslotData,
      serviceType: serviceTypeId,
    });
    serviceType.timeslots.push(timeslot);
    await serviceType.save();
    return await timeslot.save();
  },
  edit: async (id, timeslotData) => {
    return timeslotModel.findByIdAndUpdate(id, timeslotData, { new: true });
  },
  delete: async (id) => {
    return timeslotModel.findByIdAndRemove(id);
  },
  getPagination: async (page, limit) => {
    const totalItem = await timeslotModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
