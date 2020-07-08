const { Pool } = require('pg');
var pool = new Pool({
    connectionString: 'postgres://postgres:password@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
                const usern = results.rows[0].username;
                // const token = jwt.sign({id: usern},'secret',{
                //     expiresIn: '90d'
                // });

                

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + 90 * 24 * 60 *60
                    ),
                    httpOnly:true
                }

                res.cookie('userid', usern, cookieOptions);
                res.status(200).redirect("/loggedin");
            }
        })

    } catch (error){
        console.log(error);
    }
}