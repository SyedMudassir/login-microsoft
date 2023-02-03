require('dotenv').config()
let MicrosoftStrategy = require('passport-microsoft').Strategy;
    passport.use(new MicrosoftStrategy({
        // Standard OAuth2 options
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/microsoft",
        scope: ['user.read'],

      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile.id)
        // User.findOrCreate({ userId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
      }
    ));