//Import data
const { userModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await userModel
      .find()
      .populate({ path: "appointments", select: "createdAt" })
      .limit(limit)
      .skip((page - 1) * limit)
      .select(["id", "firstname", "lastname", "email", "activity"])
      .exec();
  },
  findId: async (id) => {
    return await userModel.findById(id).populate({ path: "appointment" });
  },
  getPagination: async (page, limit) => {
    const totalItem = await userModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
