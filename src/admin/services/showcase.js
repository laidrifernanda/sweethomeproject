//Import model
const { showcaseModel, galeryModel, adminModel } = require("../../model");
const showcase = require("../../model/showcase");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await showcaseModel
      .find()
      .populate({ path: "styles" })
      .populate({ path: "projectTypes" })
      .populate({ path: "showcaseType", select: "name" })
      .populate({ path: "project", select: "ticket" })
      .populate({ path: "admin", select: "name" })
      .limit(limit)
      .skip((page - 1) * limit)
      .select(["name", "createdAt"])
      .exec();
  },
  findId: async (id) => {
    return await showcaseModel
      .findById(id)
      .populate({ path: "packages" })
      .populate({ path: "user", select: ["-appointments"] });
  },
  add: async (showcaseData) => {
    //Create showcase
    const showcase = new showcaseModel({
      ...showcaseData,
      gallery: [],
    });
    await showcase.save();
    //Create galery
    for (data of showcaseData.gallery) {
      const galery = new galeryModel({ ...data, showcase: showcase._id });
      await galery.save();
      showcase.gallery.push(galery);
    }
    return await showcase.save();
  },
  search: async (query) => {
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
          styles: 1,
          projectTypes: 1,
          showcaseType: 1,
          project: 1,
          admin: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $lookup: {
          from: "projectTypes",
          localField: "projectTypes",
          foreignField: "_id",
          as: "projectTypes",
        },
      },
      {
        $lookup: {
          from: "styles",
          localField: "styles",
          foreignField: "_id",
          as: "styles",
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
        $lookup: {
          from: "admin",
          localField: "admin.name",
          foreignField: "_id",
          as: "admin",
        },
      },
    ]);
  },
  getPagination: async (page, limit) => {
    const totalItem = await showcaseModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
