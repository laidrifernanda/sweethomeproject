//Import model
const { locationModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page) => {
    return await locationModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await locationModel.findById(id);
  },
  add: async (locationData) => {
    const location = new locationModel(locationData);
    return await location.save();
  },
  edit: async (id, locationData) => {
    return await locationModel.findByIdAndUpdate(id, locationData, { new: true });
  },
  delete: async (id) => {
    return await locationModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await locationModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};
