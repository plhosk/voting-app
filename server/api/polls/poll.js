const express = require('express')
const router = express.Router({ mergeParams: true })
const Poll = require('../../models/poll')

router.get('/', (req, res) => {
    Poll.findOne({ 'pollId': req.params.pollId })
      .then(poll => {
        res.status(200).json(poll)
      })
      .catch(err => {
        res.status(400).send(err)
      })
})

module.exports = router
