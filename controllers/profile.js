const { Pool } = require('pg');
var pool = new Pool({
    // connectionString: 'postgres://postgres:root@localhost/cmpt276project'
    connectionString: process.env.DATABASE_URL
})
const session = require('express-session');


exports.update = (req, res) => {

	// var username = req.session.user.username;

	var username = req.session.user.username;
	var type = req.session.user.usertype;
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var phone = req.body.phone;
	var password = req.body.password;

	person_param = [fname, lname, username, email, phone, username];
	acc_param = [type, username, password, username];

	// console.log(person_param);
	// console.log(acc_param);



    var personQuery = `UPDATE person SET fname=$1, lname=$2, username=$3, email=$4, phone=$5 WHERE username=$6`;
    var accQuery = `UPDATE account SET type=$1, username=$2, password=$3 WHERE username=$4`;

    pool.query(personQuery, person_param, (error, result) =>{
    	if (error) { 
            res.status('401').redirect('/userview');
        }

    	pool.query(accQuery, acc_param, (error, result) =>{
    		if (error) { 
                res.status('401').redirect('/userview');
            }
            
    		res.status('200').redirect('/profile');
    	})
    })
}
