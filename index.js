const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const { resourceUsage } = require('process');
const { Console } = require('console');

var pool = new Pool({
  // connectionString: 'postgres://postgres:password@localhost/ass2'
  connectionString: process.env.DATABASE_URL
});
var app = express();
app.use(express.json());
// app.use(express.bodyParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Default route, should redirect user to home page
app.get('/', (req, res) => res.render('pages/main'))

//renders the login page
app.get('/login',(req,res) => {
  res.render('pages/login');
})

//post route that handles the login form
app.post('/login',(req,res) => {
})



app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


