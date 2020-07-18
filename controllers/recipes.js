const session = require('express-session');
const axios = require("axios");
exports.getRecipeDetails = (req,res) => {

        var recipeId = req.query.recipeId;

        // axios({
        //     "method":"GET",
        //     "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/information",
        //     "headers":{
        //     "content-type":"application/octet-stream",
        //     "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        //     "x-rapidapi-key":"bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423",
        //     "useQueryString":true
        //     }
        // })
        // .then((response)=>{
        //       var data = response;

        // })
        // .catch((error)=>{
        //       console.log(error)
        // })

        res.send({name: "lampchops"});


}