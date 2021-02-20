//Import data
const {adminModel} = require("../../model");

//Module exports
module.exports = {
  browse: async (page, limit) => {
    return await adminModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findEmail: async (email) => {
    return await adminModel.findOne({ email });
  },
  register: async (adminData) => {
    //Create new user
    const user = new adminModel(adminData);
    return await user.save();
  },
  getPagination: async (page, limit) => {
    const totalItem = await adminModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
