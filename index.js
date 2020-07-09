const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const { resourceUsage } = require('process');
const { Console } = require('console');
const cookieParser = require('cookie-parser');
const session = require('express-session');


var pool = new Pool({
  connectionString: 'postgres://postgres:password@localhost/cmpt276project'
  // connectionString: process.env.DATABASE_URL
});
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}))


//Defining path for page directing routes: when user requests /blah it will look into the routes pages file
app.use('/',require('./routes/pages'));

//Defining path for authentication routes: when user requestls /auth/blah it will look into the routes auth file
app.use('/auth',require('./routes/auth'));



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))