const { Pool } = require('pg');
var pool = new Pool({

  connectionString: 'postgres://postgres:9789@localhost/cmpt276project'
// connectionString: process.env.DATABASE_URL
});

const session = require('express-session');
const fetch = require('node-fetch');

exports.searchrecipevideos = (req,res) => {

  if(req.session.user){
  var searchvideo=req.query.searchvideo;

  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/videos/search?query="+searchvideo+"&excludeingredients=mustard&includeingredients=chicken&minLength=0&maxLength=999&offset=0&number=10", {
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
  var type = req.session.user.usertype;
  var results ={"type": type, "reciperesults": data.videos, "title": searchvideo}
  //  console.log(data)
  //  console.log(results)
  res.render('pages/searchrecipevideos', results)


})
}
else
{res.render('pages/login')
}

}
