//Import data
const {adminModel} = require("../../model");

//Module exports
module.exports = {
  findEmail: async (email) => {
    return await adminModel.findOne({ email });
  },
  register: async (adminData) => {
    //Create new user
    const user = new adminModel(adminData);
    return await user.save();
  },
};
