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
    callbackURL: "https://voting-app-plhosk.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
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