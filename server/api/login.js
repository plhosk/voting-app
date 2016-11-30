var express = require("express")
var passport = require('passport')

var router = express.Router()

router.route('/')
  .post(function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      if (err) {
        return next(err) // will generate error 500
      }
      if (!user) {
        return res.status(401).send({
          message: 'authentication failed'
        })
      }
      req.login(user, function (err) {
        if (err) {
          return next(err)
        }
        return res.send({
          id: user._id,
          username: user.username
        })
      })
    })(req, res, next)
  })

  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send({
        id: req.user._id,
        username: req.user.username
      })
    } else {
      res.sendStatus(204)
    }
  })

module.exports = router
