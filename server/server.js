require('dotenv').config()
var express = require("express")
var mongoose = require("mongoose")
mongoose.Promise = require('bluebird')
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var session = require("express-session")
const MongoStore = require('connect-mongo')(session)

var passport = require("passport")
var path = require('path')
var favicon = require('serve-favicon')

var app = express()

app.use(favicon(__dirname + '/../public/favicon.ico'))

require("./passport")()

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)


app.set("port", process.env.PORT || 5000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(session({
  secret: "very important secret",
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 315569260000

  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

// app.use('*', function (req, res, next) {
//     if (req.isAuthenticated()) {
//       console.log('user is authenticated')
//         // returns true if a user already logged in.
//     }
//     next();
// });

app.use('/api/signup', require('./api/signup'))
app.use('/api/login', require('./api/login'))
app.use('/api/polls', require('./api/polls'))
app.use('/api/polls/:pollId', require('./api/polls/poll'))

// default route for single-page app
app.use((req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port")) // eslint-disable-line
})
