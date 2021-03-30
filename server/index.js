const express = require('express');
const app = express();
const port = 3000;
const db = require('./database');
var session = require('express-session');  
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

var fs = require("fs");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
app.use(session({
  secret: '!@#G1591O#@!$',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passport.serializeUser(function(user, done) {
  // console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: "361414825701-3tu4606c0n4vooqljg6kpd6ktup21ia2.apps.googleusercontent.com" ,
    clientSecret: "u3pw9G8aMw7ft82tnrMVP3N5",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

app.get(
  "/auth/google",
  passport.authenticate("google", {
     scope: ["profile", "email"]
  })
);
app.get('/auth/google/callback',
	passport.authenticate('google', {
  	failureRedirect: '/login',
  	successRedirect: '/'
}));

var router = require('./router/main')(app, fs);

