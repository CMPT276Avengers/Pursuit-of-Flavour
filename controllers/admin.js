const { Pool } = require('pg');
var pool = new Pool({

    // connectionString: 'postgres://postgres:password@localhost/cmpt276project'
    connectionString: process.env.DATABASE_URL
});

const session = require('express-session');

exports.viewUpdateUsers = (req,res) => {
    if(req.session.user.usertype == 'admin'){

        res.render("pages/adminChangeUserView.ejs");
    } else{
        res.redirect("/login");
    }

}

exports.deleteUsers = (req,res) => {
    if(req.session.user.usertype == 'admin'){
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
res.render('pages/ad2.ejs');
}
else{
    res.redirect("/login");
}

};

exports.addUsers=(req,res)=>{
  if(req.session.user.usertype == 'admin'){
    var fname=req.body.fname;
    var lname= req.body.lname;
    var username = req.body.username;
    var email=req.body.email;
    var phone=req.body.phone;
    var type=req.body.type;
    var password=req.body.password;

    var adduser = `INSERT INTO person VALUES ('${fname}','${lname}','${username}','${email}','${phone}')`;
    var addaccount=`INSERT INTO account VALUES ('${type}','${password}','${username}')`;
    pool.query(adduser,(error,result)=>{
      us=[];
      ob={'f':fname,'l':lname,'u':username,'e':email,'p':phone,'t':type,'p':password};
      us.push(ob);
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
  res.render('pages/ad2.ejs');
}
else{
    res.redirect("/login");
}

};

exports.viewUsers = (req,res) => {
  if(req.session.user.usertype == 'admin'){
      var username=req.body.username;
      var getUserQuery=`SELECT * FROM person,account WHERE person.username=$1 and account.username=$2`;
      pool.query(getUserQuery,[username,username], (error,result)=>{
        if(error)
        res.end(error);
        var results={'rows':result.rows}
        res.render('pages/viewspecific.ejs',results);
      })

  } else{
      res.redirect("/login");
  }

}
