const express = require('express')

const router = express.Router()
const Poll = require('../../models/poll')

router.get('/', (req, res) => {
    Poll.find()
      .select('title pollId owner creationDate deleted') // voterList
      .sort('-creationDate')
      .then(pollList => {
        res.status(200).json(pollList)
      })
      .catch(err => {
        res.status(400).send(err)
      })
})

router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401)
  }
  let poll = new Poll()
  poll.title = req.body.title
  poll.owner = req.body.owner
  req.body.optionsCommaSep.split(',').map((option) => {
    poll.options.push({ text: option.trim() })
  })
  poll.save().then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

module.exports = router
