//Import model
const {appointementModel} = require('../model');

//Module exports
module.exports = {
  find: async (page) => {
    return await appointementModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await appointementModel.findById(id);
  },
  add: async (appointmentData) => {
    const style = new appointementModel(appointmentData);
    return await style.save();
  },
  edit: async (id, appointmentData) => {
    return await appointementModel.findByIdAndUpdate(id, appointmentData, { new: true });
  },
  delete: async (id) => {
    return await appointementModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await appointementModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};