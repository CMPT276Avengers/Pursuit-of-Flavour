const { Pool } = require('pg');
var pool = new Pool({

  connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
  // connectionString: process.env.DATABASE_URL
});

const session = require('express-session');
const fetch = require('node-fetch');

exports.searchrecipe = (req,res) => {

  if(req.session.user){
  var searchterm=req.query.searchterm;
//  console.log(searchterm);
  //
  // fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query="+searchterm+"&number=10&offset=0", {
	// "method": "GET",
	// "headers": {
	// 	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	// 	"x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/videos/search?query="+searchterm+"&excludeingredients=mustard&includeingredients=chicken&minLength=0&maxLength=999&offset=0&number=10", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "eb6b72d2femsh344b2576d60571fp1b9852jsnff1bb549d0cf"
	}
})
.then(function(response) {
  return response.json()
})

.then(function (data){
  var results ={"reciperesults": data.videos, "title": searchterm}
  //  console.log(data)
  //  console.log(results)
  res.render('pages/searchrecipe', results)


})
}
else
{res.render('pages/login')
}

}
