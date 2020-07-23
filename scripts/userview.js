// function loadbar(number){
//     $('#progress-bar' + number.toString()).animate({
//         width: "100%"
//     }, 5000);
//     }


//   function resetbar(number){
//     $('#progress-bar' + number.toString()).css('width', '0%').attr('aria-valuenow', 0); 
//   }
        
// //   function searchRecipesbyCuisine(id){
// //      console.log("starting function")
// //     var attr = id
// //     var recipearrayID =[]
// //     fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine="+attr+"&number=5&instructionsRequired=true&query=", {
// //       "method": "GET",
// //       "headers": {
// //         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// //         "x-rapidapi-key": "3abda60afemshe5e54c423604b5dp18615ejsn98cd66e95e47"
// //       }
// //     })
// //     .then(function(response) {
// //       console.log("recieve recipe list")
// //       console.log(response);
// //       return response.json()
// //     })

// //     .then(function (data){
// //       console.log("Manipulate recipes")
// //       console.log(data)



//     //   let recipes = data.result.map( recipe => fetch("/browse/populaterecipesCuisine", {
//     //         method: 'post',
//     //         headers: {'Content-Type': 'application/json'}, 
//     //         body: JSON.stringify({'data':recipe, 'identifier':attr})
//     //     }))


//     //   for(const recipe of data.results){
//     //     console.log("Loop through each recipeID")
//     //     var uniqueID = recipe.id
//     //     console.log(uniqueID)
//     //     recipearrayID.push(uniqueID)
//     //   }

//     //   let requests = recipearrayID.map(url => fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${url}/information`, {
//     //       "method": "GET",
//     //       "headers": {
//     //         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     //         "x-rapidapi-key": "3abda60afemshe5e54c423604b5dp18615ejsn98cd66e95e47"
//     //         }
//     //   }));

//     //   Promise.all(requests).then(function(response){
//     //     console.log("recipe info")
//     //     console.log(response);
//     //     return Promise.all(response.map(response => response.json()))
//     //   }) 

//     //   .then(function(data){
//     //     console.log("use data in my controller")
//     //     console.log(data)


//     //     let queries = data.map(item => fetch("/browse/populaterecipesCuisine", {
//     //       method: 'post',
//     //       headers: {'Content-Type': 'application/json'}, 
//     //       body: JSON.stringify({'data':item, 'identifier':attr})
//     //     }))

        
//     //     var allingredients = [];
//     //     for (var i = 0; i < data.length; i++) {
//     //         allingredients.push(data[i].extendedIngredients);
//     //     }

//     //     console.log(allingredients)

//     //     var ingredientlist = [];
//     //     for (var i = 0; i < allingredients.length; i++) {
//     //       for(var j=0; j<allingredients[i].length;j++){
//     //         ingredientlist.push(allingredients[i][j]);
//     //       }
//     //     }


//     //     console.log(ingredientlist)


//     //     let ingredients = ingredientlist.map(products => 
//     //       fetch("/browse/populateIngredients", {
//     //           method: 'post',
//     //           headers: {'Content-Type': 'application/json'}, 
//     //           body: JSON.stringify({'data':products})
//     //         }))

//     //     Promise.all(queries).then(function (response){
//     //       console.log("successfully finish")
//     //       console.log(response)
//     //     }) 
      
//     //     Promise.all(ingredients).then(function(response){
//     //       console.log("ingredietns added")
//     //     })    

//     //     .catch(err => {
//     //       console.log(err
//     //       );
//     //     });
//     //   })

// //     })
// //   }

//   function searchRecipesbyType(id){

//     console.log("starting function")
//     var attr = id
//     var recipearrayID =[]
//     fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?type="+attr+"&number=5&instructionsRequired=true&query=", {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//         "x-rapidapi-key": "3abda60afemshe5e54c423604b5dp18615ejsn98cd66e95e47"
//       }
//     })
//     .then(function(response) {
//       console.log("recieve recipe list")
//       console.log(response);
//       return response.json()
//     })

//     .then(function (data){
//       console.log("Manipulate recipes")
//       console.log(data)


//     //   for(const recipe of data.results){
//     //     console.log("Loop through each recipeID")
//     //     var uniqueID = recipe.id
//     //     console.log(uniqueID)
//     //     recipearrayID.push(uniqueID)
//     //   }

//     //   let requests = recipearrayID.map(url => fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${url}/information`, {
//     //       "method": "GET",
//     //       "headers": {
//     //         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     //         "x-rapidapi-key": "3abda60afemshe5e54c423604b5dp18615ejsn98cd66e95e47"
//     //         }
//     //   }));

//     //   Promise.all(requests).then(function(response){
//     //     console.log("recipe info")
//     //     console.log(response);
//     //     return Promise.all(response.map(response => response.json()))
//     //   }) 

//     //   .then(function(data){
//     //     console.log("use data in my controller")
//     //     console.log(data)


//     //     let queries = data.map(item => fetch("/browse/populaterecipesType", {
//     //       method: 'post',
//     //       headers: {'Content-Type': 'application/json'}, 
//     //       body: JSON.stringify({'data':item, 'identifier':attr})
//     //     }))

        
//     //     var allingredients = [];
//     //     for (var i = 0; i < data.length; i++) {
//     //         allingredients.push(data[i].extendedIngredients);
//     //     }

//     //     console.log(allingredients)

//     //     var ingredientlist = [];
//     //     for (var i = 0; i < allingredients.length; i++) {
//     //       for(var j=0; j<allingredients[i].length;j++){
//     //         ingredientlist.push(allingredients[i][j]);
//     //       }
//     //     }


//     //     console.log(ingredientlist)


//     //     let ingredients = ingredientlist.map(products => 
//     //       fetch("/browse/populateIngredients", {
//     //           method: 'post',
//     //           headers: {'Content-Type': 'application/json'}, 
//     //           body: JSON.stringify({'data':products})
//     //         }))

//     //     Promise.all(queries).then(function (response){
//     //       console.log("successfully finish")
//     //       console.log(response)
//     //     }) 
      
//     //     Promise.all(ingredients).then(function(response){
//     //       console.log("ingredietns added")
//     //     })    

//     //     .catch(err => {
//     //       console.log(err
//     //       );
//     //     });
//     //   })

//     })
//   }

//   function searchRecipesbyVegan(id){

//     console.log("starting function")
//     var attr = id
//     var recipearrayID =[]
//     fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet="+attr+"&number=5&instructionsRequired=true&query=", {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//         "x-rapidapi-key": "3abda60afemshe5e54c423604b5dp18615ejsn98cd66e95e47"
//       }
//     })
//     .then(function(response) {
//       console.log("recieve recipe list")
//       console.log(response);
//       return response.json()
//     })

//     .then(function (data){
//       console.log("Manipulate recipes")
//       console.log(data)


//     //   for(const recipe of data.results){
//     //     console.log("Loop through each recipeID")
//     //     var uniqueID = recipe.id
//     //     console.log(uniqueID)
//     //     recipearrayID.push(uniqueID)
//     //   }

//     //   let requests = recipearrayID.map(url => fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${url}/information`, {
//     //       "method": "GET",
//     //       "headers": {
//     //         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     //         "x-rapidapi-key": "3abda60afemshe5e54c423604b5dp18615ejsn98cd66e95e47"
//     //         }
//     //   }));

//     //   Promise.all(requests).then(function(response){
//     //     console.log("recipe info")
//     //     console.log(response);
//     //     return Promise.all(response.map(response => response.json()))
//     //   }) 

//     //   .then(function(data){
//     //     console.log("use data in my controller")
//     //     console.log(data)


//     //     let queries = data.map(item => fetch("/browse/populaterecipesVegan", {
//     //       method: 'post',
//     //       headers: {'Content-Type': 'application/json'}, 
//     //       body: JSON.stringify({'data':item, 'identifier':attr})
//     //     }))

        
//     //     var allingredients = [];
//     //     for (var i = 0; i < data.length; i++) {
//     //         allingredients.push(data[i].extendedIngredients);
//     //     }

//     //     console.log(allingredients)

//     //     var ingredientlist = [];
//     //     for (var i = 0; i < allingredients.length; i++) {
//     //       for(var j=0; j<allingredients[i].length;j++){
//     //         ingredientlist.push(allingredients[i][j]);
//     //       }
//     //     }


//     //     console.log(ingredientlist)


//     //     let ingredients = ingredientlist.map(products => 
//     //       fetch("/browse/populateIngredients", {
//     //           method: 'post',
//     //           headers: {'Content-Type': 'application/json'}, 
//     //           body: JSON.stringify({'data':products})
//     //         }))

//     //     Promise.all(queries).then(function (response){
//     //       console.log("successfully finish")
//     //       console.log(response)
//     //     }) 
      
//     //     Promise.all(ingredients).then(function(response){
//     //       console.log("ingredietns added")
//     //     })    

//     //     .catch(err => {
//     //       console.log(err
//     //       );
//     //     });
//     //   })

//     })
//     }

