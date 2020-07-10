const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const { resourceUsage } = require('process');
const { Console } = require('console');
const cookieParser = require('cookie-parser');
const session = require('express-session');


var pool = new Pool({
  connectionString:'postgres://postgres:9789@localhost/cmpt276project'
})
// var async = require('async');


// var connection =  pool.createConnection( { multipleStatements: true } );

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
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


//Defining path for page directing routes: when user requests /blah it will look into the routes pages file
app.use('/',require('./routes/pages'));

//Defining path for authentication routes: when user requestls /auth/blah it will look into the routes auth file
app.use('/auth',require('./routes/auth'));
//Definining path for add routes /add/blah

//app.use('/add',require('./routes/add'));


  app.post('/updateuser',(req,res)=>{
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
   });
  app.get('/database',(req,res)=> {
      var getUsersQuery=`SELECT * FROM person,account where person.username=account.username`;
// we are trying to get rows from here
      pool.query(getUsersQuery, (error,result)=>{
        if(error)
        res.end(error); // means we are ending the error and sending it as a response
        // if there is no error:
        var results={'rows':result.rows} //result is an object //'rows' is a parameter
        // result.rows is an array that contains the rows in the database table
      res.render('pages/ad',results);//  we are sending the results to the db.ejs
    })
  });
  app.post('/databasee',(req,res)=> {
      var getUsersQuery=`SELECT * FROM person,account where person.username=account.username`;
// we are trying to get rows from here
      pool.query(getUsersQuery, (error,result)=>{
        if(error)
        res.end(error); // means we are ending the error and sending it as a response
        // if there is no error:
        var results={'rows':result.rows} //result is an object //'rows' is a parameter
        // result.rows is an array that contains the rows in the database table
      res.render('pages/ad',results);//  we are sending the results to the db.ejs
    })
  });

     app.post('/adduser',(req,res)=>{
      console.log("post request for /adduser");
      var fname=req.body.fname;
      var lname= req.body.lname;
    var username = req.session.user.username;
      var email=req.body.email;
      var phone=req.body.phone;
      var type=req.body.type;
      var password=req.body.password;

      var adduser = `INSERT INTO person VALUES ('${fname}','${lname}','${username}','${email}','${phone}')`;
      var addaccount=`INSERT INTO account VALUES ('${type}','${password}','${username}')`;
      pool.query(adduser,(error,result)=>{


        if (error){
          console.log(error);
          throw error;
       }
         else{
           pool.query(addaccount,(error,result)=>{
             if (error){
               throw error;
            }
              else{
              console.log("success");

            }
           })
         console.log("success");

       }

      })
       res.render('pages/sd');
    });

    app.post('/deleteuser',(req,res)=>{
      var username=req.body.username;
      var getQuery=`DELETE FROM person WHERE username='${username}'`;
      pool.query(getQuery,(error,result)=>{
        if (error){
          throw error;
       }
       else{
         console.log("success");
       }
      })
    res.render('pages/sd');
    });



    app.post('/viewuser',(req,res)=> {
      var username=req.body.username;
      var getUserQuery=`SELECT * FROM person WHERE username='${username}'`;// we are trying to get rows from here
      pool.query(getUserQuery, (error,result)=>{
        if(error)
        res.end(error);
        var results={'rows':result.rows} //result is an object //'rows' is a parameter
        // result.rows is an array that contains the rows in the database table
      res.render('pages/viewuser',results);//  we are sending the results to the db.ejs
    })
  });


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
    //It means the port which is being used.
    //If in production, we do not have environment port and the file is not on heroku and we are running the local
    //file locally, then the port which we will be using is 5000
