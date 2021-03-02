//Import model
const { projectModel } = require("../model");

//Module exports
module.exports = {
  find: async (userId, page, limit) => {
    return await projectModel
      .find({ user: userId })
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
  findId: async (projectId) => {
    return await projectModel
      .findById(projectId)
      .populate({ path: "packages" })
      .populate({ path: "user", select: ["-appointments"] });
  },
  getPagination: async (userId, page, limit) => {
    const totalItem = await projectModel
      .find({ user: userId })
      .countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
