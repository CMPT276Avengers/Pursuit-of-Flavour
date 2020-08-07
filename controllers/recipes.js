const session = require('express-session');
const axios = require("axios");
const fetch = require('node-fetch');
const { Pool } = require('pg');
var pool = new Pool({
  //connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
connectionString: process.env.DATABASE_URL
})

exports.getRecipeDetails = (req,res) => {

        var recipeId = req.query.recipeId;

        axios({
            "method":"GET",
            "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/information",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":"bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423",
            "useQueryString":true
            }
        })
        .then((response1)=>{
              var recipeInformation = response1.data;


              axios({
                "method":"GET",
                "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/analyzedInstructions",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key":"bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423",
                "useQueryString":true
                }
              })
              .then((response2)=>{
                  var recipeInstructions = response2.data;


                  res.send({recipeInfo: recipeInformation,recipeInstructions: recipeInstructions});


               })
               .catch((error)=>{
                  console.log(error);
                  res.sendStatus(404);
                })

        })
        .catch((error)=>{
              console.log(error);
              res.sendStatus(404);
        })



}

// API call to get recipe instructions
exports.texttoSpeech = (req,res) =>{

  var recipeId = req.query.recipeId;

  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/analyzedInstructions", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
    }
  })
  .then(response => {
      console.log(response);
      return response.json();
  })

  .then(function(data){
    res.send(data)
    console.log(data)

  })
  .catch(err => {
      console.log(err);
      res.send(404)
  });

};

exports.makeRecipe = (req,res) => {
  var username = req.session.user.username;
  var ing_id = req.body.data.id;
  var amt = req.body.data.amount;

  var getIngAmount = 'SELECT * FROM has WHERE username = $1 and ingredient_id = $2';
  pool.query(getIngAmount,[username,ing_id],(error,resp) => {
    if(error){
      console.log("ing not found!");
    } else{
      var oldAmount = resp.rows[0].amount;
      var newAmount = parseFloat(oldAmount,10) - parseFloat(amt,10);
      var update_user_ing =  'UPDATE has SET amount = $1 WHERE username=$2 and ingredient_id = $3';

      pool.query(update_user_ing,[newAmount,username,ing_id],(error,results) => {
          if(error){
              console.log("updating of ing failed!");
              res.sendStatus(404)
          }
          else{
              res.sendStatus(202);
          }
      })
    }
  })


}
