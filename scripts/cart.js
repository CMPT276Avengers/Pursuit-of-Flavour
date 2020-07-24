// const { response } = require("express");

$(document).ready(function(){
    $('.addIngContent').on('click','button.addToCartButton',function(){
        // console.log("Clicked!")
        var recipeId = $(this).attr("data-recipeId");
        // console.log("the butotn recipe id is " +recipeId)

        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeId+"/information", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "bffc1f9da3msh5395e6eda5e41aep1fbc6fjsn5a9e415e3423"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(function(data) {
            reqIngs = data.extendedIngredients;
            // console.log(reqIngs)
            var haveIngId = [];
            var missingIng = [];
            $.get('/cart/getUserIng',function(data){
                var result = data.data;
                // console.log(result)
                result.forEach(element => {
                    haveIngId.push(element.ingredient_id);
                })

                reqIngs.forEach(elem => {
                    if(!haveIngId.includes(elem.id)){
                        missingIng.push(
                            elem
                        )
                    }
                })

                // console.log(missingIng)

                $.post('/cart/updateCart',{
                    data: missingIng
                },function(){
                    console.log("success");

                    $.get('/cart');
                })
            })



        })
    })

    $('.cartContent').on('click','button.deleteCartBtn',function(){
        console.log("clicked!!!");
        $.post('/cart/deleteFromCart',{
            data: $(this).attr('data-ingId')
        },function(){
            location.reload();
        })
    })


});

