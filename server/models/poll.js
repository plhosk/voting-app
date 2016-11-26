var mongoose = require('mongoose')
var AutoIncrement = require('mongoose-sequence')

var pollSchema = mongoose.Schema({
  title: String,
  owner: String,
  creationDate: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  options: [{
    text: String,
    votes: { type: Number, default: 0 },
    optionDate: { type: Date, default: Date.now }
  }]
})

pollSchema.plugin(AutoIncrement, {inc_field: 'pollId'})

module.exports = mongoose.model("Vote-Poll", pollSchema)
