const express = require('express');
const app = express();
const port = 3000;
const config = require('./config.json');
// console.log(config);
const db = require('./database');
const googleApi = config.googleApi;
var session = require('express-session');  
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');


var fs = require("fs");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
app.use(session({
  secret: config.EXPRESS.seesion_secret,
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
passport.use(new GoogleStrategy(config.GOOGLE,
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
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

