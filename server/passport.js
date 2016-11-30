var passport = require("passport")
var User = require("./models/user")

var LocalStrategy = require("passport-local").Strategy

passport.use("login", new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username: username
    }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {
          message: "No user has that username!"
        })
      }
      user.validatePassword(password, function (err, isMatch) {
        if (err) {
          return done(err)
        }
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {
            message: "Invalid password."
          })
        }
      })
    })
  }
))

var GitHubStrategy = require('passport-github2').Strategy

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://voting-app-plhosk.herokuapp.com/api/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ username: profile.id, password: 'secret github password' }, function (err, user) {
    //   return done(err, user);
    // });

    //check user table for anyone with a facebook ID of profile.id
    console.log('finding or creating user. ', profile)
    User.findOne({
      'githubId': profile.id 
    }, function(err, user) {
      if (err) {
        console.log('error finding user.')
        return done(err);
      }
      //No user was found... so create a new user with values from Facebook (all the profile. stuff)
      if (!user) {
        console.log('no user found. crating new user')
        user = new User({
          username: profile.login + '' + Math.floor(Math.random() * 90 + 10),
          password: 'secret github password',
          githubId: profile.id,
        });
        user.save(function(err) {
          if (err) {
            console.log(err);
          }
          console.log('Done saving user')
          return done(err, user);
        });
      } else {
        //found user. Return
        console.log('found user. Return')
        return done(err, user);
      }
    });
  }
));

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}