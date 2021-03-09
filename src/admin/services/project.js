//Import model
const { projectModel, packageModel } = require("../../model");

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
        select: ["populate", "duration","area","price"],
      })
      .populate({ path: "user", select: ["firstname", "lastname","photo"] })
      .limit(limit)
      .skip((page - 1) * limit)
      .select([
        "totalDuration",
        "totalArea",
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
      .populate({
        path: "packages",
        populate: [
          { path: "location", select: ["name"] },
          { path: "projectType", select: ["name"] },
        ],
        select: ["populate", "duration", "area", "price"],
      })
      .populate({ path: "user", select: ["firstname", "lastname", "photo", "phone", "email"] })
      .select("-appointment")
    .exec()
  },
  add: async (projectData) => {
    const totalDuration = projectData.packages.reduce(
      (a, b) => a + b.duration,
      0
    );
    const totalPrice = projectData.packages.reduce((a, b) => a + b.price, 0);
    const totalArea = projectData.packages.reduce((a, b) => a + b.area, 0);
    const project = new projectModel({
      ...projectData,
      packages: [],
      totalDuration,
      totalArea,
      totalPrice
    });
    await project.save();
    for (data of projectData.packages) {
      const package = new packageModel({ ...data, project: project._id });
      await package.save();
      project.packages.push(package);
    }
    return await project.save();
  },
  upload: async (projectId, uploadReceipt) => {
    return await projectModel.findByIdAndUpdate(
      projectId,
      { receipt: uploadReceipt },
      { new: true }
    );
  },
  status: async (id, statusData) => {
    return await projectModel.findByIdAndUpdate(id, statusData, {
      new: true,
      runValidators: true,
    });
  },
  edit: async (id, projectTypeData) => {
    return await projectModel.findByIdAndUpdate(id, projectTypeData, {
      new: true,
      runValidators: true,
    });
  },
  delete: async (id) => {
    return await projectModel.findByIdAndDelete(id);
  },
  getPagination: async (page, limit) => {
    const totalItem = await projectModel.countDocuments();
    const activePage = page;
    const totalPage = Math.ceil(totalItem / limit);

    return { totalItem, activePage, totalPage };
  },
};
