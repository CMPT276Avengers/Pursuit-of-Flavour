const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app =express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

const { Pool }=require('pg');
var pool;
pool=new Pool({
  connectionString:'postgres://postgres:9789@localhost/cmpt276project'
})

  app.get('/', (req, res) => res.render('pages/index'));


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

     app.post('/adduser',(req,res)=>{
      console.log("post request for /adduser");
      var fname=req.body.fname;
      var lname= req.body.lname;
      var username=req.body.username;
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
