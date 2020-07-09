const { Pool } = require('pg');
var pool = new Pool({
    connectionString: 'postgres://postgres:password@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
const session = require('express-session');

exports.login = async (req,res) => {
    try{    
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).render('pages/login', {message: 'Please provide an email/password'})
        }

        var selectUsername = 'SELECT * FROM account WHERE username = $1';
        pool.query(selectUsername,[username], async(error,results) => {
            if(results.rows.length == 0 || results.rows[0].password != password){
                res.status(401).render('pages/login', {message: 'Email or Password is incorrect'});
            }
            else{
                // console.log(results.rows[0]);
                const usern = results.rows[0].username;
                const type = results.rows[0].type;

                req.session.user = {
                    username: usern,
                    usertype: type
                };

                res.status(200).redirect("/userview");
            }
        })

    } catch (error){
        console.log(error);
    }
}

exports.logout = (req,res) => {
    req.session.user = null;
    res.status(200).redirect("/login");
}

exports.adduser = (req,res) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;
    var user_type = req.body.user_type;
    var password = req.body.password;
    // parameter for the 'person' database
    person_parameters = [fname,lname,username,email, phone]
    //parameter for the 'account' database 
    add_parameters = [user_type, password, username]
  
    var personquery = `INSERT INTO person(fname,lname,username,email,phone) VALUES ($1,$2,$3,$4,$5);`;
    var addquery = `INSERT INTO account(type,password,username) VALUES ($1,$2,$3);`; 
    
  
    pool.query(personquery, person_parameters,(error, resp)=>{
        if (error){ return res.send(error);}
  
        // if the information is successfully added to the person database
        // add it other info to the account database
        pool.query(addquery, add_parameters,(error, resp)=>{
          if (error){ return res.send(error);}
  
          res.redirect('/login');
  
        });
  
    });      
}