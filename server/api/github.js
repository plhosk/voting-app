var express = require('express')
var passport = require('passport')

var router = express.Router()

router.route('/')
  .get(passport.authenticate('github', {scope: [ 'user:email' ] }))

router.route('/callback')
  .get(passport.authenticate('github', {failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/')
    })

module.exports = router
