//Import dependencies
const bcrypt = require("bcrypt");

//Import data
const profileService = require("../services/profile");

//Module exports
module.exports = {
  read: async (req, res) => {
    try {
      const { user } = req;
      const userData = await profileService.findId({ _id: user._id });

      res.status(200).send({ data: userData });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    const { body, user } = req;
    //update user
    const updateUser = { ...body };

    try {
      const saveUpdateUser = await profileService.update(updateUser, user._id);
      res.send({ status: 200, message: saveUpdateUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  updatePass: async (req, res) => {
    const { body, user } = req;
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(body.password, salt);
    //update user
    const updateUser = {
      ...body,
      password: hashedpass,
    };

    try {
      const saveUpdateUser = await profileService.updatePass(updateUser, user._id);
      res.send({ status: 200, message: saveUpdateUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  upload: async (req, res) => {
    const { file, user } = req;
    const uploadFile = file.location;
    try {
      const uploadProfile = await profileService.upload(user._id, uploadFile);
      res
        .status(200)
        .send({ message: "Upload photo success", data: uploadProfile });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
