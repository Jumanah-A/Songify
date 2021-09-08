require('dotenv/config');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const express = require('express');
// const session = require('express-session');
const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;
// const spotify = require('spotify');

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
const authCallbackPath = '/auth/spotify/callback';
const app = express();

// passport.use(new SpotifyStrategy(
//   () => {}
// ))

// homepage redirect
app.get('/');
// spotify auth page redirect
app.get('/auth/spotify', passport.authenticate('spotify',
  {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  }));

// auth callback routing
app.get(authCallbackPath,
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/welcome');
  }
);

// logout  routing
app.get('/logout', (req, res) => {
  req.logout();
  // redirect to the homepage/root
  res.redirect('/');
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
