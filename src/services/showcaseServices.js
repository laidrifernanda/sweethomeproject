const { showcaseModel, showcaseTypeModel, favoriteModel } = require("../model");

module.exports = {
  findAll: async (page, limit) => {
    return await showcaseModel
      .find()
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            select: ["duration", "area", "price", "location", "projectType"],
            populate: [
              { path: "location", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  find: async (page, limit, status) => {
    const idShowcaseType = await showcaseTypeModel.findOne({ name: status });
    console.log(page, "ini page");
    return await showcaseModel
      .find({ showcaseType: idShowcaseType["id"] })
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            select: ["duration", "area", "price", "location", "projectType"],
            populate: [
              { path: "location", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findId: async (showcaseId) => {
    return await showcaseModel
      .findById(showcaseId)
      .populate({ path: "styles" })
      .populate({ path: "locations" })
      .populate({ path: "projectTypes" })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            select: ["duration", "area", "price", "location", "projectType"],
            populate: [
              { path: "location", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "ticket",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "admin", select: ["name"] })
      .populate({ path: "showcaseType" });
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
          gallery: 1,
          address: 1,
          showcaseType: 1,
          favorites: 1,
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
    ]);
  },
  findStyle: async (page, limit, status, style) => {
    const idShowcaseType = await showcaseTypeModel.findOne({ name: status });
    return await showcaseModel
      .find({ $and: [{ showcaseType: idShowcaseType["id"] }, style] })
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            select: [
              "duration",
              "area",
              "price",
              "location",
              "style",
              "projectType",
            ],
            populate: [
              { path: "location", select: ["name"] },
              { path: "style", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findLocation: async (page, limit, status, location) => {
    const idShowcaseType = await showcaseTypeModel.findOne({ name: status });
    console.log(location, "ini location di service");
    return await showcaseModel
      .find({ $and: [{ showcaseType: idShowcaseType["id"] }, location] })
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            // match: {location:locationId},
            select: [
              "duration",
              "area",
              "price",
              "location",
              "style",
              "projectType",
            ],
            populate: [
              { path: "location", select: ["name"] },
              { path: "style", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findLocationShowcase: async (page, limit, location) => {
    console.log(location, "ini location di service");
    return await showcaseModel
      .find(location)
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            // match: {location:locationId},
            select: [
              "duration",
              "area",
              "price",
              "location",
              "style",
              "projectType",
            ],
            populate: [
              { path: "location", select: ["name"] },
              { path: "style", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  findStyleShowcase: async (page, limit, style) => {
    return await showcaseModel
      .find(style)
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            select: [
              "duration",
              "area",
              "price",
              "location",
              "style",
              "projectType",
            ],
            populate: [
              { path: "location", select: ["name"] },
              { path: "style", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  both: async (page, limit, status, filter) => {
    const idShowcaseType = await showcaseTypeModel.findOne({ name: status });
    return await showcaseModel
      .find({ $and: [{ showcaseType: idShowcaseType["id"] }, filter] })
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            // match: {location:locationId},
            select: [
              "duration",
              "area",
              "price",
              "location",
              "style",
              "projectType",
            ],
            populate: [
              { path: "location", select: ["name"] },
              { path: "style", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  bothShowcase: async (page, limit, filter) => {
    return await showcaseModel
      .find(filter)
      .populate({ path: "showcaseType", select: ["name"] })
      .populate({
        path: "project",
        populate: [
          {
            path: "packages",
            // match: {location:locationId},
            select: [
              "duration",
              "area",
              "price",
              "location",
              "style",
              "projectType",
            ],
            populate: [
              { path: "location", select: ["name"] },
              { path: "style", select: ["name"] },
              { path: "projectType", select: ["name"] },
            ],
          },
          {
            path: "user",
            select: ["address", "firstname", "lastname", "email"],
          },
          {
            path: "appointment",
            select: [
              "buildType",
              "budget",
              "serviceType",
              "duration",
              "address",
              "user",
            ],
            populate: [
              { path: "buildType", select: ["name"] },
              { path: "serviceType", select: ["name"] },
              {
                path: "user",
                select: ["address", "firstname", "lastname", "email"],
              },
            ],
          },
        ],
      })
      .populate({ path: "projectTypes", select: ["name"] })
      .populate({ path: "styles", select: ["name"] })
      .populate({ path: "locations", select: ["name"] })
      .populate({ path: "gallery" })
      .populate({ path: "favorites" })
      .populate({
        path: "user",
        select: ["address", "firstname", "lastname", "email"],
      })
      .populate({ path: "admin", select: ["name", "email"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  love: async (showcaseId, user) => {
    const showcase = await showcaseModel.findById(showcaseId);
    const favorite = new favoriteModel({
      showcase: showcaseId,
      user: user,
    });

    showcase.favorites.push(favorite);
    await showcase.save();
    return await favorite.save();
  },
  match: async (showcaseId, user) => {
    return await favoriteModel.findOne({ user: user, showcase: showcaseId });
  },
  deleteLove: async (showcaseId, user) => {
    const favorite = await favoriteModel.findOne({
      showcase: showcaseId,
      user: user,
    });
    await favoriteModel.deleteOne({ showcase: showcaseId, user: user });
    return favorite;
  },
  getPagination: async (page, limit) => {
    const totalItem = await showcaseModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
  getPaginationByProject: async (page, limit, status) => {
    const idShowcaseType = await showcaseTypeModel.findOne({ name: status });
    const totalItem = await showcaseModel
      .find({ showcaseType: idShowcaseType["id"] })
      .countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
  getPaginationByFilter: async (page, limit, status, filter) => {
    const idShowcaseType = await showcaseTypeModel.findOne({ name: status });
    const totalItem = await showcaseModel
      .find({ $and: [{ showcaseType: idShowcaseType["id"] }, filter] })
      .countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
  getPaginationByShowcase: async (page, limit, id) => {
    const totalItem = await showcaseModel.find(id).countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  },
};
