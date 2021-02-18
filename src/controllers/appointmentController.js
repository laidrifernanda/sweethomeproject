//Import data
const appointmentService = require("../services/appointmentService");
const model = require('../model')
const jwt = require('jsonwebtoken')

//Module exports
module.exports = {
  browse: async (req, res) => {
    // destructure page and limit and set default values
    console.log(req.query, "ini quiry")
    const { page = 1 } = req.query;
    try {
      const appointment = await appointmentService.find(page);

      //get total documents
      const pageInfo = await appointmentService.getPagination(page);

      res.status(200).send({ data: appointment, ...pageInfo });
    } catch (err) {
      res.status(400).json({ error: err.message});
    }
  },
  read: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await appointmentService.findId(id);

      res.status(200).send({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  add: async (req, res) => {
    const { body } = req;

    //Create new category
    const appointmentData = { ...body };

    try {
      const saveAppointment = await appointmentService.add(appointmentData);
      res.send(saveAppointment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  edit: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    //Update category
    const appointmentData = { ...body };

    try {
      const updateAppointment = await appointmentService.edit(id, appointmentData);
      res.send({message: "Update appointment Success", data: updateAppointment});
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleteAppointment = await appointmentService.delete(id);

      res
        .status(200)
        .send({ message: "Delete appointment Success", data: deleteAppointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  create: async (req, res) => {
      const authorization = req.headers.authorization

      if(!authorization) {
          res.send({
              status: 400,
              message: "no token",
              data: []
          })
      }

      const verifyToken = jwt.verify(authorization, 'Sw33thom3!')
      console.log(verifyToken, '<<< veryfyToken User')

      if(verifyToken) {
          const {userId} = req.params
          const payload = req.body

          const user = await model.userModel.findById({_id:userId})
          console.log(user, "ini user")
          payload.user = user._id
          
          //insert appointment
          const newAppointments = new model.appointmentModel(payload)
          await newAppointments.save()

          user.appointments.push(newAppointments)
          await user.save()

          res.send({
              status: 200,
              data: newAppointments
          })
      } else {
          return res.send({
              status:400,
              message: "Invalid token",
              data: []
          })
      }
  }
};