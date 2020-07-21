const session = require('express-session');
const axios = require("axios");
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
                  res.send(404);
                })

        })
        .catch((error)=>{
              console.log(error);
              res.send(404);
        })



}