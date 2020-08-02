const session = require('express-session');
const axios = require("axios");
const fetch = require('node-fetch');

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
