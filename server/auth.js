const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy({
  // Standard OAuth2 options
  clientID: '838768295949-d2c2gidrikvne89gf5ossof12nm7ssg3.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:4000/auth/google/callback",
  passReqToCallback: true,
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})