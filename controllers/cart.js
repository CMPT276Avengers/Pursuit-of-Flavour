const { Pool } = require('pg');
var pool = new Pool({

  connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
// connectionString: process.env.DATABASE_URL
})
const session = require('express-session');

exports.updateCart = (req,res) => {
    var updateInfo = req.body.data;
    // console.log(updateInfo)

    if(updateInfo == undefined){
        req.session.cart.arr = req.session.cart.arr;
    }
    else if(req.session.cart.arr.length == 0){
        req.session.cart.arr = updateInfo;
    }
    else{
        var curCartId = [];
        req.session.cart.arr.forEach(elem => {
            curCartId.push(elem.id);
        })

        updateInfo.forEach(elem => {
            if(!curCartId.includes(elem.id)){
                req.session.cart.arr.push(elem);
                // curCartId.push(elem.id)
            }
            // else{
            //     req.session.cart.arr[curCartId.indexOf(elem.id)].amount += elem.amount;
            // }
        })
    }

    res.sendStatus(202);



}

exports.getUserIng = (req,res) => {
    var username = req.session.user.username;
    var getQuery = "SELECT * from has where username = $1 and amount >0";
    pool.query(getQuery,[username],(error,resp) => {
        if(error){
            res.sendStatus(404);
        }
        else{
            // console.log("queried rows: " + resp.rows);
            res.send({data:resp.rows})
        }
    })
}

exports.deleteFromCart = (req,res) => {
    // console.log("in route")
    var currentCart = req.session.cart.arr;
    var removeItem = req.body.data;
    currentCart.forEach((elem,index) => {
        if(elem.id == removeItem){
            currentCart.splice(index,1);
        }
    })
    req.session.cart.arr = currentCart;

    res.sendStatus("202")
}

exports.checkOutCart = (req,res) => {
    req.session.cart.arr = [];
    res.sendStatus("202");

}
