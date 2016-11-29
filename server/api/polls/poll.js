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

  .put((req, res) => {
    if (req.params.pollId != req.body.pollId) {
      res.status(400).send('Poll ID in URL does not match request body')
    }
    Poll.findOne({ 'pollId': req.params.pollId })
      .then(poll => {
        if (!poll) {
          return res.sendStatus(400)
        }
        if (req.body.voteSelector == 'addOption') {
          poll.options.push({
            text: req.body.newOptionText,
            votes: 1
          })
        }
        else {
          poll.options.id(req.body.voteSelector).votes += 1
        }
        return poll.save()
      })
      .then(() => {
        res.sendStatus(200)
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
