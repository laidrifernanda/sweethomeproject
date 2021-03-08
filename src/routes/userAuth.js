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

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  googleController.profile
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

router.get("/home", isLoggedIn, (req, res) => {
  res.send("masuk home");
});

//Module export
module.exports = router;
