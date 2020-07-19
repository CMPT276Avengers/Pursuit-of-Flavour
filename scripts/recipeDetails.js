$(document).ready(function(){
    $('#recipeModal').modal({show:true});
    $('.openBtn').on('click',function(){
        var recipeId = $(this).attr("data-recipeId");
        $.get("/recipes/details?recipeId="+recipeId, function(data){
            //for title
            $('.modal-title').append(data.recipeInfo.title);

            //for image
            $('.recipe-image').append("<img src="+data.recipeInfo.image+" class = 'img-responsive rounded' width='100%'>");
            
            //section for general info
            if(data.recipeInfo.cheap == true){
                $('.general-info-details').append("<div style:'color: green;'>$</div>");
            } else {
                $('.general-info-details').append("<div style:'color: red;'>$$$</div>");
            }
            $('.general-info-details').append("<div>"+data.recipeInfo.readyInMinutes+" min</div>");
            $('.general-info-details').append("<div>"+data.recipeInfo.servings+"</div>");
            $('.addtional-info').append("<div>"+data.recipeInfo.servings+"</div>");

            
            
            $('#recipeModal').modal({show:true});
        })
    });
});

