const { Pool } = require('pg');
var pool = new Pool({

    connectionString: 'postgres://postgres:root@localhost/cmpt276project'
    // connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.viewUpdateUsers = (req,res) => {
    if(req.session.user.usertype == 'admin'){
        
        res.render("pages/adminChangeUserView.ejs");
    } else{
        res.redirect("/login");
    }

}