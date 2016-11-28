const express = require('express')

const router = express.Router()
const Poll = require('../../models/poll')

router.get('/', (req, res) => {
    Poll.find()
      .select('title pollId owner creationDate deleted')
      .sort('-creationDate')
      .then(pollList => {
        res.status(200).json(pollList)
      })
      .catch(err => {
        res.status(400).send(err)
      })
})

router.post('/', (req, res) => {
  let poll = new Poll()
  poll.title = req.body.title
  poll.owner = req.body.owner
  req.body.optionsCommaSep.split(',').map((option) => {
    poll.options.push({ text: option.trim() })
  })
  poll.save((err) => {
    if (err) {
      res.status(500).send(err)
    }
    res.sendStatus(200)
  })
})

module.exports = router
