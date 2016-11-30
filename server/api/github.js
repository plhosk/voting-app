var express = require('express')
var passport = require('passport')

var router = express.Router({ mergeParams: true })

router.route('/')
  .get(passport.authenticate('github', {scope: [ 'user:email' ] }))

module.exports = router
