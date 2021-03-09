//Import model
const { favoriteModel } = require("../model");

//Module exports
module.exports = {
  find: async (userId, page, limit) => {
    return await favoriteModel
      .find({ user: userId })
      .populate({
        path: "showcase",
        populate: [
          { path: "styles", select: ["name"] },
          { path: "projectTypes", select: ["name"] },
          { path: "locations", select: ["name"] },
          { path: "showcaseType", select: ["name"] },
          { path: "gallery" },
        ],
        select: ["populate", "project","show","name","address"],
      })
      .populate({ path: "user", select: ["firstname", "lastname","email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  getPagination: async (userId, page, limit) => {
    const totalItem = await favoriteModel
      .find({ user: userId })
      .countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
}