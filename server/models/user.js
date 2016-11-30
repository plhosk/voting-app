var mongoose = require("mongoose")
var AutoIncrement = require('mongoose-sequence')
var bcrypt = require("bcrypt-nodejs")

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  displayName: String,
  githubId: String,
})

userSchema.plugin(AutoIncrement, { inc_field: 'userId' })

var SALT_FACTOR = 10

userSchema.pre("save", function (done) {
  var user = this
  if (!user.isModified("password")) {
    return done()
  }

 bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
    if (error) {
      return done(error)
    }
   bcrypt.hash(user.password, salt, null, function (error, passwordHash) {
      if (error) {
        return done(error)
      }
      user.password = passwordHash
      done()
    })
  })
})

userSchema.methods.validatePassword = function (inputPassword, done) {
 bcrypt.compare(inputPassword, this.password, function (error, isValid) {
    done(error, isValid)
  })
}

userSchema.methods.name = function () {
  return this.displayName || this.username
}

userSchema.methods.getId = function () {
  return this._id
}

module.exports = mongoose.model("Vote-User", userSchema)
