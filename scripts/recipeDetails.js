


$(document).ready(function(){
    $('.recipe-details-button').on('click',function(){
        $(".alert").hide();
        var recipeId = $(this).attr("data-recipeId");
        // var recipeId = '166666';
        $.get("/recipes/details?recipeId="+recipeId, function(data){
            //for title
            $('.modal-title').empty().append(data.recipeInfo.title);

            //for image
            $('.recipe-image').empty().append("<img src="+data.recipeInfo.image+" class = 'img-responsive rounded' width='100%'>");
            
            //section for general info
            if(data.recipeInfo.cheap == true){
                $('.general-info-details').empty().append("<div style:'color: green;'>$</div>");
            } else {
                $('.general-info-details').empty().append("<div style:'color: red;'>$$$</div>");
            }
            $('.general-info-details').append("<div>"+data.recipeInfo.readyInMinutes+" min</div>");
            $('.general-info-details').append("<div>"+data.recipeInfo.servings+"</div>");
            
            //section for additional info
            $('.additional-info').empty();
            if(data.recipeInfo.vegetarian == true){
                $('.additional-info').append("<div>Vegetarian</div>");
            }
            if(data.recipeInfo.glutenFree == true){
                $('.additional-info').append("<div>Gluten Free</div>");
            }
            if(data.recipeInfo.dairyFree == true){
                $('.additional-info').append("<div>Dairy Free</div>");
            }
            if(data.recipeInfo.veryHealthy == true){
                $('.additional-info').append("<div>Very Healthy</div>");
            }


            //Section for ingredients
            $('.ingredients-container').empty();
            for(var i = 0; i < data.recipeInfo.extendedIngredients.length; i++){
                $('.ingredients-container').append("<li class='list-group-item'>"+data.recipeInfo.extendedIngredients[i].originalString+"</li>")
            }

            //section for instructions
            $('.instructions-container').empty();
            //if instruction comes wiht analyzed:
            if(data.recipeInstructions.length == 0){
                $(".instructions-container").append("<div class='mb-5 instruction"+i+"'><div class='list-group instgrp"+i+"'>"+data.recipeInfo.summary+"</div></div>")
                
            } else{
                for(var i = 0; i < data.recipeInstructions.length; i++){
                    $(".instructions-container").append("<div class='mb-5 instruction"+i+"'><h4>"+data.recipeInstructions[i].name+"</h4><div class='list-group instgrp"+i+"'></div></div>")
                    for(var j = 0; j < data.recipeInstructions[i].steps.length; j++){
                        $(".instgrp" + i).append("<button type='button' class='list-group-item list-group-item-action instruction-button'><div class='border border-secondary'>Step"+(j+1)+"</div>"+data.recipeInstructions[i].steps[j].step+"</button>");
                    }
                }
    
                $('.instruction-button').on('click',function(){
                    if($(this).hasClass('finished')){
                        $(this).removeClass('finished');
                    }
                    else{
                        $(this).addClass('finished');
                    }
                })
            }

            //prepare add recipe button
            $('.save-recipe-button').attr('data-recipeId',data.recipeInfo.id)

            
            $('#recipeModal').modal({show:true});
        })
    });

    $('.save-recipe-button').on('click',function(){
        var recipeId = $(this).attr("data-recipeId");
        $.post("/add/add_recipe_to_db_add_recipe_to_user",{recipeId: recipeId},function(data){
            if(data.status == "passed"){
                $("#added-alert").fadeTo(2000, 500).slideUp(1000, function() {
                    $("#added-alert").slideUp(500);
                });
            } else{
                $("#failed-alert").fadeTo(2000, 500).slideUp(1000, function() {
                    $("#failed-alert").slideUp(500);
                });
            }
        })
    })


});

