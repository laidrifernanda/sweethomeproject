//Import dependencies
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Import data
const { SECRET_KEY_TOKEN } = process.env;
const adminService = require("../services/auth");

//Module exports
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //Checking if the user already in database
      const isEmailValid = await adminService.findEmail(email);
      if (!isEmailValid) return res.status(400).send("Invalid email");

      //Checking if password is correct
      const isPassValid = await bcrypt.compare(password, isEmailValid.password);
      if (!isPassValid) return res.status(400).send("Invalid password");

      //Create and assign a token
      const payload = {
        _id: isEmailValid.id,
      };
      const token = jwt.sign(payload, SECRET_KEY_TOKEN);

      res.status(200).send({ info: "WELCOME ADMIN", data: { token } });
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //Find exist email in database
    const isEmailValid = await adminService.findEmail(email);
    if (isEmailValid) return res.status(400).send("This Email already used");

    //Create new user
    const adminData = {
      name: name,
      email: email,
      password: hashedPass,
    };
    try {
      const savedAdmin = await adminService.register(adminData);
      res.send(savedAdmin);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.status(200).send({ message: "Logout Admin" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  browse: async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try {
      const adminInfo = await adminService.browse(+page, +limit);

      //get total documents
      const pageInfo = await adminService.getPagination(+page, +limit);

      res.status(200).send({ data: adminInfo, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    //Hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(body.password, salt);

    //Update category
    const adminData = { ...body, password: hashedpass };

    try {
      const updateAdmin = await adminService.edit(id, adminData);
      res.send({ message: "Update Data Admin Success", data: updateAdmin });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteAdmin = await adminService.delete(id);

      res
        .status(200)
        .send({ message: "Delete Data Admin Success", data: deleteAdmin });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
