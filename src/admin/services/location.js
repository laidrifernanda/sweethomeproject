//Import model
const { locationModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await locationModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
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
    return await locationModel.findByIdAndUpdate(id, locationData, { new: true, runValidators: true });
  },
  delete: async (id) => {
    const location = await locationModel.findById(id)
    await locationModel.deleteOne({ _id: id });
    return location;
  },
  getPagination: async (page, limit) => {
    const totalItem = await locationModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
