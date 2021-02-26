//Import model
const { projectModel } = require("../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await projectModel
      .find()
      .populate({
        path: "packages",
        populate: [
          { path: "location", select: ["name"] },
          { path: "projectType", select: ["name"] },
        ],
        select: ["populate"],
      })
      .populate({ path: "user", select: ["firstname", "lastname"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .select([
        "totalDuration",
        "totalPrice",
        "createdAt",
        "updatedAt",
        "status",
      ])
      .exec();
  },
  findId: async (id) => {
    return await projectModel
      .findById(id)
      .populate({ path: "packages" })
      .populate({ path: "user", select: ["-appointments"] });
  },
  getPagination: async (page, limit) => {
    const totalItem = await projectModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};