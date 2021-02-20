//Import model
const { serviceTypeModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await serviceTypeModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
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
  getPagination: async (page, limit) => {
    const totalItem = await serviceTypeModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
