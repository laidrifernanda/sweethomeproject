//Import data
const {userModel, adminModel} = require("../model")

//Module exports
module.exports = {
  findEmail: async (email) => {
    return await userModel.findOne({ email });
  },
  findAdmin: async (email) =>{
    return await adminModel.findOne({email});
  },
  register: async (newUser) => {
    //Create new user
    const user = new userModel(newUser);
    return await user.save();
  },
};