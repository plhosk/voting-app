const express = require('express')

const router = express.Router({ mergeParams: true })
const Poll = require('../../models/poll')

router.route('/')
  .get((req, res) => {
    Poll.findOne({ 'pollId': req.params.pollId })
      .then(poll => {
        if (!poll) {
          return res.sendStatus(400)
        }
        res.status(200).json(poll)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  })
  .delete((req, res) => {
    Poll.remove({ 'pollId': req.params.pollId })
      .then(poll => {
        if (!poll) {
          return res.sendStatus(400)
        }
        res.sendStatus(200)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  })

module.exports = router
