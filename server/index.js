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

app.get('/spotify/search', () => {
  // RETURN SONG_ID AND ARTIST_ID
  const Spotify = require('node-spotify-api');

  const spotify = new Spotify({
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  });
  spotify.search({ type: 'track,artist', query: 'Roses,gashi' }, function (err, data) {
    if (err) {
    // eslint-disable-next-line
    return console.log('Error occurred: ' + err);
    }
    // eslint-disable-next-line
  console.log(data.tracks.items[0]);
    // eslint-disable-next-line
  console.log(data.tracks.items.length)
  // const extractInfo = data.tracks.items.map(x => x.artists );
  // console.log(extractInfo);
  });
});
app.get('/spotify/recs', () => {
  const Spotify = require('node-spotify-api');

  const spotify = new Spotify({
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  });
  spotify
    .request('https://api.spotify.com/v1/recommendations?market=US&seed_artists=0JOxt5QOwq0czoJxvSc5hS&seed_genres=pop&seed_tracks=6qc5EODnUU7XX4zn8B4c89')
    .then(function (data) {
      const extractInfo = data.tracks.map(x =>
        (
          {
            songName: x.name,
            songId: x.id,
            spotifyRedirectUrl: x.external_urls.spotify,
            releaseDate: x.album.release_date,
            imageUrl: x.album.images,
            artists: x.artists,
            previewUrl: x.preview_url,
            trackUri: x.uri
          }
        ));
        // eslint-disable-next-line
      console.log(`THE RECOMMENDATIONS ARE HERE SIZE IS ${data.tracks.length}`);
      // eslint-disable-next-line
      console.log(extractInfo);
    })
    .catch(function (err) {
      console.error('Error occurred: ' + err);
    });
});

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
