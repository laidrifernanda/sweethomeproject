const userModel = require("../model/users");

module.exports = {
  findUser: async (email) => {
    email.toUpperCase();
    // console.log(userModel.find({email}))
    return await userModel.find({ email: email });
  },
  findId: async (email) => {
    email.toUpperCase();
    // console.log(userModel.find({email}))
    return await userModel.findOne({ email: email });
  },
};
