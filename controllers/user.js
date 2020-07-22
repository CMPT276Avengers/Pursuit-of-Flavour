const { Pool } = require('pg');
var pool = new Pool({

  // connectionString: 'postgres://postgres:password@localhost/cmpt276project'    
  connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.update_user = (res,req) => {
    console.log("post request for /updateuser");
    var fname=req.body.fname;
    var lname= req.body.lname;
    var username=req.body.username;
    var email=req.body.email;
    var phone=req.body.phone;
    var type=req.body.type;
    var password=req.body.password;


    if(fname != "" && fname !== undefined)
    {
      var update = `UPDATE person SET fname='${fname}' WHERE username='${username}'`;
      pool.query(update,(error,results) =>{
        if(error){
          res.end(error);
          console.log("UPDATE ERROR for first name")
        }
      }
      )
    }
    if(lname != "" && lname !== undefined)
    {
      var update = `UPDATE person SET lname='${lname}' WHERE username='${username}'`;
      pool.query(update,(error,results) =>{
        if(error){
          res.end(error);
          console.log("UPDATE ERROR for last name")
        }
      }
      )
    }

    if(email != "" && email !== undefined)
    {
      var update = `UPDATE person SET email='${email}' WHERE username='${username}'`;
      pool.query(update,(error,results) =>{
        if(error){
          res.end(error);
          console.log("UPDATE ERROR for email")
        }
      }
      )
    }
    if(phone != "" && phone !== undefined)
    {
      var update = `UPDATE person SET phone='${phone}' WHERE username='${username}'`;
      pool.query(update,(error,results) =>{
        if(error){
          res.end(error);
          console.log("UPDATE ERROR for phone")
        }
      }
      )
    }
    if(password != "" && password !== undefined)
    {
      var update = `UPDATE account SET password='${password}' WHERE username='${username}'`;
      pool.query(update,(error,results) =>{
        if(error){
          res.end(error);
          console.log("UPDATE ERROR for password")
        }
      }
      )
    }
  res.render('pages/success');
}
