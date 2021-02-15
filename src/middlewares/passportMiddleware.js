// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    console.log(req.user, "<<<ini req user middleware isLoggedin")
    // console.log(req, "<<<ini req mas")
    console.log(req.user.email, "<<<ini email dari req app")
      if (req.user) {
          next();
      } else {
          res.redirect("/login")
      }
  }

  module.exports = isLoggedIn