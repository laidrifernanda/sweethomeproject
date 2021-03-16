require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SALT_KEY } = process.env;
const service = require("../services/findUser");

module.exports = {
  profile: async (req, res, next) => {
    const { user } = req;
    if (!user.userId) {
      const email = user.email;
      const isUser = await service.findId(email);
      const payload = {
        _id: isUser.id,
      };
      let token = jwt.sign(payload, SALT_KEY);
      req.token = token;
      next();
    } else {
      const payload = {
        _id: user.userId,
      };
      let token = jwt.sign(payload, SALT_KEY);
      req.token = token;
      next();
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
