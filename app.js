let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let http = require('http');
let mongoose = require('mongoose');

let userModel = require('./UserModel');

let app = express();
let encodedParser = bodyParser.urlencoded({ extended: false });

//view engine
app.set('view engine', 'ejs');

//middleware
app.use('/cssfiles', express.static('cssfiles'));
app.use('/imgs', express.static('imgs'));
app.use(cookieParser());
app.use(session({secret:"lottery", cookie: {maxAge:60000}}));

//routing
app.get('/', (req, res) => {
  if(!req.session.nick){
      res.render('index');
  } else {
    res.render('check', { nick: req.session.nick, exists: false });
  }
});

app.post('/register', encodedParser, (req, res) => {
  if(!req.session.nick){
    req.session.nick = req.body.nick;
    res.render('check', { nick: req.session.nick, exists: false });
  } else {
    res.render('check', { nick: req.session.nick, exists: true });
  }
});

app.use((req, res, next) => {
  if(!req.session.nick){
      res.render('index');
  } else {
    res.render('check', { nick: req.session.nick });
  }
});

app.listen(process.env.port || 3000);
