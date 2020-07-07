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


app.get('/', (req, res) => res.render('pages/main'))
app.get('/userview', (req, res) => res.render('pages/mainpage'))


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


