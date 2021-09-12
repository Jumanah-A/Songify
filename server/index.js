require('dotenv/config');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

const userAccess = {};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_AUTH_CALLBACK
    },
    function (accessToken, refreshToken, expiresIn, profile, done) {

      process.nextTick(function () {
        return done(null, profile);
      });
      userAccess.accessToken = accessToken;
    }
  )
);

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: `http://localhost:${process.env.DEV_SERVER_PORT}` }),
  function (req, res) {
    res.cookie('userName', req.session.passport.user);
    res.redirect('/');
  }
);
app.use(errorMiddleware);
app.use(staticMiddleware);

app.listen(process.env.PORT, function () {
  // eslint-disable-next-line
  console.log('App is listening on port ' + process.env.PORT);
});

// UNCOMMENT LATER ON
// use as authentication middleware for making request to the user data

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// app.get('/auth/logout', function (req, res) {
// console.log('user is logged out')
// res.clearCookie('userName');
// req.session.destroy();
// req.logout();
// res.redirect('/');
// });
// test comment
