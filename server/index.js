require('dotenv/config');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
// const { path } = require('dotenv/lib/env-options');
// const spotify = require('spotify');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const authCallbackPath = '/auth/spotify/callback';
const app = express();


const userAccess = {};


//Support persistant login sessions => serialize and deserialize users out of session
// by storing storing userId when serialize and finding userId when deserializing


passport.serializeUser( (user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj))
// Setting the SpotifyStrategy within Passport
// after the user signs in and authorizes the app
// used to retrieve and setup accesstoken
passport.use(
  new SpotifyStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:' + process.env.PORT + authCallbackPath
    },
    function(accessToken, refreshToken, expiresIn, profile, done)
    {
      // the user's spotify profile is returned to
      // represent the logged-in user.
      process.nextTick(
        function () {
          return done(null, profile);
        }
      );
      userAccess.accessToken = accessToken;

    }
  )
);

// setup session middleware to keep track
app.use(
  session({ secret: 'keyboard cat', resave:true,saveUninitialized:true})
);
app.use(express.static(__dirname));

//passport middleware initialization
app.use(passport.initialize());
//acts as a middleware to alter the req object and change the 'user' value that is currently
//the session id (from the client cookie) into the true deserialized user object.
app.use(passport.session());

// app.get('/', (req, res) => {
//   console.log('in the root page function');
//   console.log('hiiii');
//   res.send("hello welcome to teh root page")
//   req.logout();
// })

// app.get('/homepage', (req,res) => {
//   console.log('in the homepage page function');
//   res.render('homepage.html', {user:req.user});
//   console.log('user is', req.user);
// })
// app.get('/welcome', (req, res) => {
//   console.log('in the welcome page function');

//   // res.sendFile(__dirname + "/welcome.html");
//   // res.render({ user: req.user });
//   console.log('user is', req.user);
// })

// app.get(
//   '/auth/spotify',
//   passport.authenticate('spotify', {
//     scope: ['user-read-email', 'user-read-private'],
//     showDialogue: true
//   })
//   );

// app.get(
//   authCallbackPath,
//   passport.authenticate('spotify', {failureRedirect: '/homepage'}),
//   (req,res) => { res.redirect('/welcome')}
//   );


// //make sure that the suer is
// //logged in to spotify to be able to access data

// function ensureAuthenticated(req,res,next)
// {
//   if(req.isAuthenticated())
//   {
//     return next();
//   }
//   res.redirect('/homepage');
// }
















// serve your css as static
// const patyhName = __dirname + '/public';
// pa
// app.use(express.static(patyhName));

// app.get('/homepage', (req,res) =>
// {
//   console.log('in the homepage');
//   res.sendFile(__dirname + "/homepage.html");
// })

app.get('/',(res,req) => {
  console.log('in the root method');
  //rednerign situation
  res.render('index.html', { user: req.user });
  console.log(req.user);
})

app.get('/login', function (req, res) {
  console.log('in the get login function user is', req.user)
  res.redirect('/auth/spotify');
  // res.render('login.html', { user: req.user });

});

app.get('/auth/spotify',passport.authenticate('spotify',
{
  scope:['user-read-email','user-read-private'],
  showDialogue:true
}));


app.get(authCallbackPath,
  passport.authenticate('spotify',{failureRedirect:'/login'}), (req,res) => res.redirect('/'))

app.get('/logout', (res,req) =>
{
  req.logout();
  res.redirect('/')
})


app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

// function ensureAuthenticated(req,res,next)
// {
//   if(req.isAuthenticated())
//   {
//     return next();
//   }
//   res.redirect('/login');
// }
