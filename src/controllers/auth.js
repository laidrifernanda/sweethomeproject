//Import dependencies
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Import data
const { SALT_KEY, SECRET_KEY_TOKEN } = process.env;
const authService = require("../services/auth");

//Module.export
module.exports = {
  register: async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    //Bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //Find exist email in database
    const isEmailValid = await authService.findEmail(email);
    if (isEmailValid) return res.status(400).send("This Email already used");

    //Create user
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPass,
    };
    try {
      const saveUser = await authService.register(newUser);
      res.send(saveUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //Checking if the user already in database
      const isUser = await authService.findEmail(email);
      const isAdmin = await authService.findAdmin(email);
      if (!isUser && !isAdmin) return res.status(400).send("Invalid email");

      //Checking if password is correct
      const hashedPass = isAdmin ? isAdmin.password : isUser.password;
      const isPassValid = await bcrypt.compare(password, hashedPass);
      if (!isPassValid) return res.status(400).send("Invalid password");

      //Get token
      let token;
      if (isAdmin) {
        //Create and assign a token
        const payload = {
          _id: isAdmin.id,
        };
        token = jwt.sign(payload, SECRET_KEY_TOKEN, { expiresIn: "1800s" });
        res.status(200).send({ info: "LOGIN", data: { token, role: "ADMIN" } });
      } else {
        //Create and assign a token
        const payload = {
          _id: isUser.id,
        };
        token = jwt.sign(payload, SALT_KEY);
        // {
        //   expiresIn: "1800s";
        // }
        isUser.activity = new Date();
        res.status(200).send({ info: "LOGIN", data: { token, role: "USER" } });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
};
