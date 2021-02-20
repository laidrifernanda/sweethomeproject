//Import model
const { serviceTypeModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page) => {
    return await serviceTypeModel
      .find()
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
  },
  findId: async (id) => {
    return await serviceTypeModel.findById(id);
  },
  add: async (serviceTypeData) => {
    const serviceType = new serviceTypeModel(serviceTypeData);
    return await serviceType.save();
  },
  edit: async (id, serviceTypeData) => {
    return await serviceTypeModel.findByIdAndUpdate(id, serviceTypeData, {
      new: true,
      runValidators: true
    });
  },
  delete: async (id) => {
    return await serviceTypeModel.findByIdAndDelete(id);
  },
  getPagination: async (page) => {
    const totalItem = await serviceTypeModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / 10);

    return { totalItem, activePage, totalPage };
  },
};
