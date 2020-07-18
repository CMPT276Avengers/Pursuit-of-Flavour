$(document).ready(function(){
    $('.openBtn').on('click',function(){
        var recipeId = $(this).attr("data-recipeId");
        $.get("/recipes/details?recipeId="+recipeId, function(data){
            console.log("done");
            $('.modal-title').append(data.name);

            $('#recipeModal').modal({show:true});
        })
    });
});

