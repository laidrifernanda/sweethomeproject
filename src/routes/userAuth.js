//Import dependencies
const router = require("express").Router();
const passport = require("passport");

//Controller
const googleController = require("../controllers/googleController");

//Middleware
const isLoggedIn = require("../middlewares/passportMiddleware");

//google auth routes
// Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/failed", googleController.failed);

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/failed" }),
//   googleController.profile
// );
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("msrm42app://msrm42app.io?id=" + req.user.id);
  }
);

//facebook auth routes
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

//router masih percobaan
router.get("/logout", googleController.logout);

router.get("/login", (req, res) => {
  res.send("tempat buat login");
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Module export
module.exports = router;
