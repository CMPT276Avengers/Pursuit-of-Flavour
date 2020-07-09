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