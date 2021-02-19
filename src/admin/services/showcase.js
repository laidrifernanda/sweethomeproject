//Import model
const { showcaseModel, galeryModel } = require("../../model");

//Module exports
module.exports = {
  add: async (showcaseData) => {
      const showcase = new showcaseModel({
        ...showcaseData,
        gallery: [],
      });
      await showcase.save();
      for(data of showcaseData.gallery){
        const galery = new galeryModel({...data, showcase:showcase._id})
        await galery.save()
        showcase.gallery.push(galery)
      }
      return await showcase.save();
    }
}