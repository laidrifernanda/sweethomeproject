const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy
const userModel = require('../model/users')

const bcrypt = require('bcrypt')

passport.use(new facebookStrategy({

    clientID        :process.env.FB_CLIENT_ID,
    clientSecret    :process.env.FB_CLIENT_SECRET,
    callbackURL     :process.env.FB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
    console.log(profile, "ini profile")
    // console.log(profile._json, "<<< ini profile email")

    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        userModel.findOne({ 'email' : profile.emails[0].value }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) {
                console.log("user found")
                console.log(user)
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                let newUser = new userModel();
                //hash password
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(process.env.PASSWORD, salt);

                // set all of the facebook information in our user model
                newUser.phoneNumber = null;
                newUser.address = null
                newUser.firstname = profile.name.givenName
                newUser.lastname =  profile.name.familyName
                newUser.email = profile.emails[0].value
                newUser.password = hash
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    console.log("create new user success")
                    return done(null, newUser);
                });
            }

        });

    })

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
        done(err, user);
    });
});