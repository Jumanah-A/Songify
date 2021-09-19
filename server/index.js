require('dotenv/config');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const Spotify = require('node-spotify-api');

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

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_AUTH_CALLBACK
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
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);
    }
  )
);

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(errorMiddleware);
app.use(staticMiddleware);

app.get(
  '/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'],
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

app.get('/spotify/search/:track/:artist', (req, res) => {
  const { track, artist } = req.params;
  let songId = {};
  const spotify = new Spotify({
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  });
  spotify
    .request(`https://api.spotify.com/v1/search?q=${track}%2C${artist}&type=track%2Cartist&market=US`)
    .then(function (data) {
      if (data.tracks.items.length === 0) {
        throw new ClientError(400, 'The song and artist you have entered do not exist, please try again!');
      } else {
        songId = [data.tracks.items[0]].map(x => ({ SongName: x.name, SongId: x.id, artistName: x.artists[0].name, artistId: x.artists[0].id }))[0];
        res.json(songId);
      }

    })
    .catch(function (err) {
      console.error('Error occurred: ' + err);
    });
});

app.get('/spotify/recs/:artistId/:trackId/:genre', (req, res) => {
  const { artistId, trackId, genre } = req.params;

  const spotify = new Spotify({
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  });
  spotify
    .request(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artistId}&seed_genres=${genre}&seed_tracks=${trackId}`)
    .then(function (data) {
      const extractInfo = data.tracks.map(x =>
        (
          {
            songName: x.name,
            songId: x.id,
            spotifyRedirectUrl: x.external_urls.spotify,
            releaseDate: x.album.release_date,
            imageUrl: x.album.images,
            album: x.album.name,
            artists: x.artists,
            previewUrl: x.preview_url,
            trackUri: x.uri
          }
        ));
      res.json(extractInfo);
    })
    .catch(function (err) {
      console.error('Error occurred: ' + err);
    });
});

app.post('/spotify/create-playlist', (req, res, next) => {
  spotifyApi.createPlaylist('Songify', { description: 'Your Songify recommendation playlist', public: false })
    .then(function (data) {
      // eslint-disable-next-line
      console.log('Created playlist!');
      res.json(data);
    }, function (err) {
      // eslint-disable-next-line
      console.log('Something went wrong!', err);
    });

});
app.post('/spotify/addTracks/:playlistId/:trackId', (req, res, next) => {
  const { playlistId, trackId } = req.params;
  spotifyApi.addTracksToPlaylist(playlistId, trackId.split(','))
    .then(function (data) {
      // eslint-disable-next-line
      console.log('Added tracks to playlist!');
    }, function (err) {
      // eslint-disable-next-line
      console.log('Something went wrong!', err);
    });
});

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
//   res.redirect('/auth/spotify');
// }

app.get('/auth/logout', function (req, res) {
  // eslint-disable-next-line
  console.log('user is logged out');
  req.logout();
  res.clearCookie('userName');
  res.clearCookie('connect.sid');
  res.redirect('/auth/spotify');
});
// test comment
