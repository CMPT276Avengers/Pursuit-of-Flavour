// const { Result } = require("express-validator");

  //Fetch to add recipe to My Recipes based on output table
function add_rec(id){
    var data = id;


    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+data+"/information", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "3f877306famsh1566e89fabab361p1a6625jsne9186e9a0905"
            }
      })

    .then(function(response){
        return response.json()
    })

    .then(function(data){

        for(var j=0; j<data.extendedIngredients.length; j++){
            // var table = document.getElementsByTagName('list')[0]

            var row = table.insertRow();
            // row.id = j.toString()

            var cell1 = row.insertCell()
            // cell1.id = 'cell1'

            cell1.innerHTML = data.extendedIngredients[j].name

            var cell2 = row.insertCell()

            var img = new Image(100,100); // width, height values are optional params 
            img.src = data.extendedIngredients[j].image
            cell2.appendChild(img)

            var cell3 = row.insertCell()
            cell3.innerHTML = data.extendedIngredients[j].aisle

            var cell4 = row.insertCell()
            cell4.innerHTML = "<button type='button' class='btn btn-dark'>Buy Ingredient</button>"

        $('#myModal').modal('show')
        // }

        fetch("/browse/addrecipe", {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({'data':data})
        })

        .then(function (response){
            response.json()


            fetch("/browse/addUserRecipe", {
                method: 'post',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({'data':data})
            })

            .then(function (response){
                response.json()



                var ingredientlist = []
                for (var i =0; i<data.extendedIngredients.length;i++){
                    ingredientlist.push(data.extendedIngredients[i])
                }


                let ingredients = ingredientlist.map(product => fetch("/browse/addingredients", {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({'data':product})
                }))

                Promise.all(ingredients).then(function(response){
                    return response.json()
                })
            })

        }) 
        

    })

  }

  $(document).ready(function () {

    $('#top').click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 100);
        return false;
    });

});