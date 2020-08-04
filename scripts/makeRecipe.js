$(document).ready(function(){
    $('.addIngContent').on('click','button.makeRecipeButton',function(){
        // console.log("Clicked")
        var recipeId = $(this).attr("data-recipeId");

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
        .then(function(data){
            var reqIngs = data.extendedIngredients;
            var counter = 0;
            var reqIngsData = [];
            reqIngs.forEach(element => {
                reqIngsData[counter] = {
                    id: element.id,
                    amount : parseFloat(element.amount).toFixed(2)
                }
                counter += 1;
            });
            subtractAsync(reqIngsData);


        })
    })
})

async function subtractAsync(allIngredients){
    let subIngredientRequests = allIngredients.map(element =>  $.post("/recipes/makeRecipe",
        {
            data: element
        }, function(data,status){
    }))

    Promise.all(subIngredientRequests).then(function(res){
        alert("Your ingredients have been updated!");
    })
}