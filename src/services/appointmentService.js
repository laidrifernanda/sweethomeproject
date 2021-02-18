//Import model
const {appointmentModel} = require('../model');

//Module exports
module.exports = {
  find: async (page) => {
    return await appointmentModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await appointmentModel.findById(id);
  },
  add: async (appointmentData) => {
    const style = new appointmentModel(appointmentData);
    return await style.save();
  },
  edit: async (id, appointmentData) => {
    return await appointmentModel.findByIdAndUpdate(id, appointmentData, { new: true });
  },
  delete: async (id) => {
    return await appointmentModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await appointmentModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};