require('dotenv/config');
// const errorMiddleware = require('./error-middleware');
// const staticMiddleware = require('./static-middleware');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
// // const { path } = require('dotenv/lib/env-options');
// const spotify = require('spotify');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const authCallbackPath = '/auth/spotify/callback';
const app = express();



// var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   redirectUri: 'http://localhost:' + port + authCallbackPath
// });
// var Spotify = require('node-spotify-api');


const userAccess = {};


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.
// THIS METHOD IS RUN AFTER THE USER SIGNS IN AND AUTHORIZES THE APP
passport.use(
  new SpotifyStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:' + process.env.PORT + authCallbackPath,
    },
    function (accessToken, refreshToken, expiresIn, profile, done) {
      // asynchronous verification, for effect...
      // console.log(refreshToken, accessToken);
      process.nextTick(function () {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
      // spotifyApi.setAccessToken(accessToken);
      userAccess.accessToken = accessToken;
    }
  )
);


app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


// app.get('/', function (req, res) {
//   console.log('in the get root function')
//   res.render('index.html', { user: req.user });
//   if (req.user) {
//     console.log("user is", req.user)
//   }
// });


// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get(
  '/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,})
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  authCallbackPath,
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + process.env.PORT);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.

//UNCOMMENT LATRER ON

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }
