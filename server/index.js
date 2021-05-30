const express = require('express');
const app = express();
const config = require('./config.json');
console.log(config);
const db = require('./database');
var session = require('express-session');  
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const port = config.EXPRESS.port;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var fs = require("fs");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
app.use(session({
  secret: config.EXPRESS.seesion_secret,
  resave: false,
  saveUninitialized: false,
  cookie:{maxAge: 7*24*60*60*1000},//7일
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
  async function(accessToken, refreshToken, profile, cb) {
    console.log(refreshToken)
    profile.accessToken = accessToken;
    //db에없으면 회원가입
    console.log(profile);
    if(!global.DB.users.get(profile.id))await db.addUser({id:profile.id,name:profile.displayName});
    db.updataProfilePicture(profile.id,profile._json.picture);
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

var router = require('./router/main')(app, fs, db);

