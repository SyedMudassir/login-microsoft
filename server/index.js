const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');
const app = express();
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Signin With Google</a>')
// })

const isLoggedIn = (req, res, next)=> {
  req.user ? next() : res.sendStatus(401);
}

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/failure'
  }));

app.get('/dashboad', isLoggedIn,(req, res) => {
  res.redirect('http://localhost:3000/dashboard');
})

app.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('http://localhost:3000');
  });
});

app.listen(4000, () => {
  console.log('listening on 4000');
})