const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const { resourceUsage } = require('process');
const { Console } = require('console');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var cors = require('cors');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

usernames = [];

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}))

app.use("/",cors());


//Defining path for page directing routes: when user requests /blah it will look into the routes pages file
app.use('/',require('./routes/pages'));

//Defining path for authentication routes: when user requestls /auth/blah it will look into the routes auth file
app.use('/auth',require('./routes/auth'));


// Defining path for browse routes for recipes and ingredients
app.use('/browse', require('./routes/browse'));


//Definining path for add routes /add/blah
app.use('/add',require('./routes/add'));

//Defining path for admin routes
app.use('/admin',require('./routes/admin'));

app.use('/search',require('./routes/searchrecipe'));

app.use('/searchrecipevideos',require('./routes/searchrecipevideos'));


//Defining path for temperary recipe Details page
app.use('/recipes', require('./routes/recipes'));

app.use('/ingredients', require('./routes/ingredients'));

app.use('/cart',require('./routes/cart'));

app.use('/profile', require('./routes/profile'));





// app.get('/message', function(req, res){
// 	res.sendFile(__dirname + '/index.html');
// });

app.use('/message',require('./routes/message'));


io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if(usernames.indexOf(data) != -1){
			callback(false);
		} else {
			callback(true);
			socket.username = data;
			usernames.push(socket.username);
			updateUsernames();
		}
	});

	// Update Usernames
	function updateUsernames(){
		io.sockets.emit('usernames', usernames);
	}

	// Send Message
	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data, user:socket.username});
	});

	// Disconnect
	socket.on('disconnect', function(data){
		if(!socket.username){
			return;
		}

		usernames.splice(usernames.indexOf(socket.username), 1);
		updateUsernames();
	});
});

http.listen(PORT,() => console.log(`Listening on ${ PORT }`));
module.exports = app;

//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
