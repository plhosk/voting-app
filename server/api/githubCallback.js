var express = require('express')
var passport = require('passport')

var router = express.Router({ mergeParams: true })

router.route('/')
  .get(passport.authenticate('github', {failureRedirect: '/login' }),
    (req, res) => {
      console.log('succeeded')
      res.redirect('/')
    })
    
module.exports = router
