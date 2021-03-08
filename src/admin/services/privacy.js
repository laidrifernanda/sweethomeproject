//Import model
const { privacyModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await privacyModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findId: async (id) => {
    return await privacyModel.findById(id);
  },
  add: async (privacyData) => {
    const privacy = new privacyModel(privacyData);
    return await privacy.save();
  },
  getPagination: async (page, limit) => {
    const totalItem = await privacyModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
