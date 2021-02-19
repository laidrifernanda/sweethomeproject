//Import data
const {userModel} = require("../model")

//Module exports
module.exports = {
  findEmail: async (email) => {
    return await userModel.findOne({ email });
  },
  register: async (newUser) => {
    //Create new user
    const user = new userModel(newUser);
    return await user.save();
  },
};