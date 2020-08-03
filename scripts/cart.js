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
            var haveIngAmount = [];
            var missingIng = [];
            $.get('/cart/getUserIng',function(data){
                var result = data.data;
                console.log(result)
                result.forEach(element => {
                    haveIngId.push(element.ingredient_id);
                    haveIngAmount.push(element.amount);
                })

                for(var i = 0; i < reqIngs.length; i++){
                    var ingId = reqIngs[i].id;
                    var ingAmt = reqIngs[i].amount;
                    var indexOf = haveIngId.indexOf(ingId);

                    if(indexOf == -1){
                        missingIng.push(
                            reqIngs[i]
                        )
                    } else if(haveIngAmount[indexOf] < reqIngs[i].amount){
                        reqIngs[i].amount = ingAmt - haveIngAmount[indexOf];
                        missingIng.push(reqIngs[i]);
                    }
                }

                console.log(missingIng)

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
        // console.log("clicked!!!");
        $.post('/cart/deleteFromCart',{
            data: $(this).attr('data-ingId')
        },function(){
            location.reload();
        })
    })

    $('#cartCheckOutBtn').on('click',function(){
        console.log("clicked")
        var allIngredients = [];
        var counter  = 0;
        $('.ingredientInput').each(function(index,element){
            console.log($(this).val())
            if($(this).val() != 0){
                allIngredients[counter] = {
                    id: $(this).attr('data-ingredientid'),
                    amount : parseFloat($(this).val()).toFixed(2)
                }
                counter +=1;
            }
        })

        // console.log(allIngredients)
        test(allIngredients)



    })


});

async function test(allIngredients){
    let addIngredientRequests = allIngredients.map(element =>  $.post("/ingredients/addIngredients",
        {
            data: element
        }, function(data,status){
    }))

    Promise.all(addIngredientRequests).then(function(res){
        console.log("ok");
        $.post("/cart/checkOutCart",function(data,status){
            console.log("finish!!")
            location.reload();
        })
    })
}

