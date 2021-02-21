//Import data
const { userModel } = require("../model");

//Module Exports
module.exports = {
  update: async (updateUser, userId) => {
		return await userModel.findByIdAndUpdate(userId, updateUser, {
			new: true,
		});
  },
  upload: async (userId, uploadProfile) => {
    return await userModel.findByIdAndUpdate(
      userId,
      { photo: uploadProfile },
      { new: true }
    );
  },
};
