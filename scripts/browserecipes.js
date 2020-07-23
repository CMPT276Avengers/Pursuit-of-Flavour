// const { Result } = require("express-validator");

  //Fetch to add recipe to My Recipes based on output table
function add_rec(id){
    var data = id;

    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+data+"/information", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
            }
      })

    .then(function(response){
        return response.json()
    })

    .then(function(data){

                console.log("opening modal")

                // $("#add_recipe").modal("show");


                var $table = $('<table>');
                $table.attr('id', 'mytable')
                $table.addClass("table table-bordered")
                $table.append('<thead>').children('thead')
                .append('<tr />').children('tr').append('<th>Name</th><th></th><th>Aisle</th><th></th>');
                var $tbody = $table.append('<tbody />').children('tbody');

                for(var j=0; j<data.extendedIngredients.length; j++){
                    name = data.extendedIngredients[j].name
                    // var img = new Image(100,100)
                    var img = "https://spoonacular.com/cdn/ingredients_100x100/"+data.extendedIngredients[j].image
                    console.log(img)

                    aisle = data.extendedIngredients[j].aisle
                    var $tr = $('<tr>').append(
                        $('<td>').text(name),
                        $('<td>').append("<img src='"+ img + "' width='75' height ='75'></img>"),
                        $('<td>').text(aisle),
                        // $('<td>').append('<button>').addClass("btn btn-secondary").text("Buy")
                    );

                    $tbody.append($tr)
                }

                $('#modalcontents').append($table)


        fetch("/browse/addrecipe", {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({'data':data})
        })

        .then(function (response){
            response.json()


            // fetch("/browse/addUserRecipe", {
            //     method: 'post',
            //     headers: {'Content-Type': 'application/json'}, 
            //     body: JSON.stringify({'data':data})
            // })

            // .then(function (response){
            //     response.json()



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
                    return Promise.all(response.map(response => response.json()))
                })
            })

        }) 
        

    }
    
  $(document).ready(function () {
    $('#closemodal').click(function (){
        $("#mytable tr").remove()
    })

  })

  $(document).ready(function () {

    $('#top').click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 100);
        return false;
    });

});

$(document).ready(function () {

    $('#topmodal').click(function () {
        $('#add_recipe').animate({ scrollTop: 0 }, 'slow');

    })
});