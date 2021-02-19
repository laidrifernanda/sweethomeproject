//Import data
const showcaseService = require("../services/showcase");

//Module exports
module.exports = {
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const showcaseData = { ...body };
  
    try {
      const saveShowcase = await showcaseService.add(showcaseData);
      res.send(saveShowcase);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  upload: async (req, res) => {
    const { file } = req;

    //get data from body
    const uploadPhoto = file.location;
    res
      .status(200)
      .send({ message: "Upload photo success", data: uploadPhoto });
  }
}
