//Import dependencies
const router = require("express").Router();
const passport = require('passport')

//Controller
const userController = require("../controllers/user");
const googleController = require('../controllers/googleController')

//Middleware
// const authMiddleware = require("../middlewares/auth");
// const roleMiddleware = require("../middlewares/role");
const isLoggedIn = require('../middlewares/passportMiddleware')

//Routes
router.use("/users", userController);


//google auth routes
// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
    passport.authenticate('google', 
    { failureRedirect: '/login' }),
    googleController.home
);

//facebook auth routes
router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/login'
		}));


//router masih percobaan
router.get('/logout', googleController.logout)

router.get("/login", (req, res) => {
    res.send("tempat buat login")
})

router.get('/home', isLoggedIn, (req, res) => {
    res.send("masuk home")
})


//Module exports
module.exports = router;
