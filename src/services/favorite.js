//Import model
const { favoriteModel, showcaseModel } = require("../model");

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
        select: ["populate", "project", "show", "name", "address"],
      })
      .populate({ path: "user", select: ["firstname", "lastname", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    },
  searchFav: async (query, userId) => {
    const favorites = await favoriteModel.find({user: userId})
    return await showcaseModel.aggregate([
      {
        $search: {
          autocomplete: {
            query: query,
            path: "name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          gallery: 1,
          address: 1,
          showcaseType: 1,
          show: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $lookup: {
          from: "galery",
          localField: "gallery",
          foreignField: "_id",
          as: "gallery",
        },
      },
      {
        $lookup: {
          from: "showcaseType",
          localField: "showcaseType",
          foreignField: "_id",
          as: "showcaseType",
        },
      },
      {
        $match: {
          _id: { $in: favorites.map((favorite) => favorite.showcase) },
        },
      },
    ]);
  },
  getPagination: async (userId, page, limit) => {
    const totalItem = await favoriteModel
      .find({ user: userId })
      .countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
