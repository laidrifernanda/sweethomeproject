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
        select: ["populate", "duration", "area", "price"],
      })
      .populate({ path: "cancelPayment", select: ["reason"] })
      .populate({ path: "payment" })
      .populate({ path: "user", select: ["firstname", "lastname"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .select([
        "totalDuration",
        "totalPrice",
        "createdAt",
        "updatedAt",
        "status",
        "ticket",
        "cancelPayment",
        "payment",
      ])
      .exec();
  },
  findId: async (projectId) => {
    return await projectModel
      .findById(projectId)
      .populate({
        path: "packages",
        populate: [
          { path: "location", select: ["name"] },
          { path: "projectType", select: ["name"] },
        ],
        select: ["populate", "duration", "area", "price"],
      })
      .populate({ path: "cancelPayment", select: ["reason"] })
      .populate({ path: "payment" })
      .populate({ path: "user", select: ["firstname", "lastname", "email"] })
      .select([
        "totalDuration",
        "totalPrice",
        "createdAt",
        "updatedAt",
        "status",
        "ticket",
        "cancelPayment",
        "payment",
      ]);
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
