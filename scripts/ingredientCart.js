// const { all } = require("../routes/add");

$(document).ready(function(){
    $('#open-ingredient-modal').on('click',function(){
        // console.log("clicked!")
        $.get("/ingredients/getMyIngredients", function(data){
            // console.log(data);
            $('.addIngredientBody').empty()
            var ingredients = data.ingredients;
            ingredients.forEach(element => {
                if(!element.image.startsWith("http")){
                    element.image = 'https://spoonacular.com/cdn/ingredients_100x100/'+element.image;
                }
                $('.addIngredientBody').append("<tr class='ingredientsRow'><td><img src="+element.image+" style='height: 50px; width: 50px;'></td><td>"+element.ingredient_name+"</td><td>"+element.aisle+"</td><td>"+element.unit+"</td><td><input type='number' class='ingredientInput' data-ingredientId="+element.ingredient_id+" style='box-sizing: border-box; width: 100%;'' value='0' ></td><tr>")
            })
            
            $('#ingredientsModal').modal({show:true});
        })
    })

    $('#add-to-my-ingredients').on('click',function(){
        
        var allIngredients = [];
        var counter  = 0;
        $('.ingredientInput').each(function(index,element){
            if($(this).val() != 0){
                allIngredients[counter] = {
                    id: $(this).attr('data-ingredientid'),
                    amount : $(this).val()
                }
                counter +=1;
            }
        })

        console.log(allIngredients);
        
        test(allIngredients)



    })
})

async function test(allIngredients){
    let addIngredientRequests = allIngredients.map(element =>  $.post("/ingredients/addIngredients",
        {
            data: element
        }, function(data,status){
    }))

    Promise.all(addIngredientRequests).then(function(res){
        console.log("ok");
        location.reload();
    })
}