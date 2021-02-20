//Import model
const { showcaseModel, galeryModel, adminModel } = require("../../model");

//Module exports
module.exports = {
  find: async (page, limit) => {
    return await showcaseModel
      .find()
      .populate({ path: "styles" })
      .populate({ path: "projectTypes" })
      .populate({ path: "gallery" })
      .populate({ path: "favorite" })
      .populate({ path: "showcaseType", select: "name" })
      .populate({ path: "project", select: "ticket" })
      .limit(limit)
      .skip((page - 1) * limit)
      .select(["name", "createdAt", "admin"])
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
  getPagination: async (page, limit) => {
    const totalItem = await showcaseModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
