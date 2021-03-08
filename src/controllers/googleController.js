require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SALT_KEY } = process.env;
const service = require("../services/findUser");

module.exports = {
  profile: async (req, res) => {
    const { user } = req;
    if (!user.userId) {
      const email = user.email;
      const isUser = await service.findId(email);
      const payload = {
        _id: isUser.id,
      };
      let token = jwt.sign(payload, SALT_KEY);
      res.status(200).send({ info: "LOGIN", data: { token, role: "USER" } });
    } else {
      const payload = {
        _id: user.userId,
      };
      let token = jwt.sign(payload, SALT_KEY);
      res.status(200).send({ info: "LOGIN", data: { token, role: "USER" } });
    }
  },
  failed: (req, res) => {
    res.send("failed to login");
  },
  logout: (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("api/v1/login");
  },
};
