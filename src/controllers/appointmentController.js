//Import data
const model = require('../model')
const jwt = require('jsonwebtoken')

//Module exports
module.exports = {
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