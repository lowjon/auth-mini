const express = require('express');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');
const app = express()
console.log(typeof config.facebook.clientId);

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))


// facebook strategy

passport.use('facebook', new FacebookStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: []

}, (accessToken, refreshToken, profile, done) => {
done(null, profile)
}))

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((user, done) => {
  return done (null, user)
})

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: 'http://www.cnn.com'}),
(req, res) => {
  console.log(req.session);
  res.redirect('/')
})




app.listen(3000, () => {
  console.log("listening on 3000");
})
