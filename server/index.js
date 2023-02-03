const express = require("express")
const cors = require("cors")
require('dotenv').config()
const port = process.env.PORT 
const app = express()
const passport=require('passport')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json()) 

var MicrosoftStrategy = require('passport-microsoft').Strategy;
    passport.use(new MicrosoftStrategy({
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: "/auth/microsoft",
        scope: ['user.read'],
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('inside index.js 3');
        // User.findOrCreate({ userId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
      }
    ));

    app.get('/auth/microsoft',
    passport.authenticate('microsoft', {
      prompt: 'select_account',
    }));

  app.get('/auth/microsoft/callback', 
    passport.authenticate('microsoft', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/dashboard');
    });


app.listen(port,()=>{
    console.log(`localhost:${port}`)
})