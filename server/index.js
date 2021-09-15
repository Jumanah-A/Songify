require('dotenv/config');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

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

app.use(errorMiddleware);
app.use(staticMiddleware);


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
//'/spotify/search/:track/:artist'
app.get('/spotify/search/:track/:artist', (req,res) => {
  // RETURN SONG_ID AND ARTIST_ID
  // let { track, artist} = req.params;
  const track = '@+my+worst';
  // const track = 'ghost+town';
  const artist = 'blackbear';
  let songId = {};
  const Spotify = require('node-spotify-api');
  const spotify = new Spotify({
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  });
  spotify
    .request(`https://api.spotify.com/v1/search?q=${track}%2C${artist}&type=track%2Cartist&market=US`)
    .then(function (data) {
      if(data.tracks.items.length === 0)
      {
        throw new ClientError(400, 'The song and artist you have entered do not exist, please try again!');
      }else
      {
        // eslint-disable-next-line
        songId = [data.tracks.items[0]].map(x => ({ SongName: x.name, SongId: x.id, artistName: x.artists[0].name, artistId: x.artists[0].id }))[0];
        console.log(songId);
      }

    })
    .catch(function (err) {
      console.error('Error occurred: ' + err);
    });
});
//'/spotify/recs/:artistId/:trackId/:genre'
app.get('/spotify/recs/', (req,res) => {
  // const { artistId, trackId, genre} = req.params;
  const Spotify = require('node-spotify-api');
  const artistId = '2cFrymmkijnjDg9SS92EPM';
  const trackId = '0mHGftgYtmpH4y17T3VZ2E';
  const genre = 'pop';

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
            artists: x.artists,
            previewUrl: x.preview_url,
            trackUri: x.uri
          }
        ));
        // eslint-disable-next-line
      console.log(extractInfo);
    })
    .catch(function (err) {
      console.error('Error occurred: ' + err);
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
