const {showcaseModel, showcaseTypeModel} = require("../model")

module.exports = {
  find: async (page, limit, status) => {
    const idShowcaseType = await showcaseTypeModel
      .findOne({name:status})
      return await showcaseModel
      .find({showcaseType: idShowcaseType["id"]})
      .populate({path: "showcaseType", select:["name"]})
      .populate({path: "project",
      populate:[
          {
            path:"packages",
            select:["duration","area","price","location","projectType"],
            populate:[
              {path:"location", select:["name"]},
              {path:"projectType", select:["name"]}
            ]
          },
          {
            path: "user",
            select:["address","firstname","lastname","email"]
          },
          {
            path:"appointment",
            select:["buildType","budget", "serviceType", "duration","address","user"],
            populate:[
              {path:"buildType", select:["name"]},
              {path:"serviceType", select:["name"]},
              {path:"user",select:["address","firstname","lastname","email"]}
            ]
          }]
        })
      .populate({path: "projectTypes", select:["name"]})
      .populate({path: "styles", select:["name"]})
      .populate({path: "gallery"})
      .populate({path: "favorites"})
      .populate({path: "user", select:["address","firstname","lastname","email"]})
      .populate({path: "admin", select:["name", "email"]})
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  },
  getPagination: async (page, limit) => {
    const totalItem = await showcaseModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);
    return { totalItem, activePage, totalPage };
  }
}