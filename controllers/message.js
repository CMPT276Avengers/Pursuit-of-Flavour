
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const { Pool } = require('pg');
var pool = new Pool({

  connectionString: 'postgres://postgres:root@localhost/cmpt276project'
      // connectionString: process.env.DATABASE_URL
});

exports.message = (req, res)=> {
  console.log("in route now");
  	var type = req.session.user.usertype;
  	res.render("pages/message.ejs", {type:type});
};
