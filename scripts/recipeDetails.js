
var recipeId
$(document).ready(function(){
    // $('#recipeModal').modal({show:false});
    $('.recipe-details-button').on('click',function(){
        // console.log("clicked!!");
        $(".alert").hide();
        recipeId = $(this).attr("data-recipeId");
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
            $('.general-info-details').append("<div>"+data.recipeInfo.readyInMinutes+"</div>");
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
        recipeId = $(this).attr("data-recipeId");
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

// Set up for speech/text
var step = 1;
var textinput = []

// Speech recognition setup
try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
}
catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
    alert('No speech was detected. Try again.');  
    };
}

// recognition.onstart = function(){
//     alert("Listening now")
// }

// recognition.onend = function(){
//     alert("Stopped listening")
// }

// Transcribing speech
recognition.onresult = function(event){
    var command = event.results[0][0].transcript
    console.log(command)

    if(command == 'quit'){
        step = 1
        textinput = []
        alert('Quitting speech recognition')
        $('#speech-alert').hide()
        return
    }

    if(command == 'repeat'){
        var instr = new SpeechSynthesisUtterance();
        instr.rate = 1;
        instr.pitch = 1;
        instr.volume = 1;
        instr.text = textinput[step-1]
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(instr)
    }

    if(command == 'next'){
        var instr = new SpeechSynthesisUtterance();
        instr.rate = 1;
        instr.pitch = 1;
        instr.volume = 1;
        instr.text = textinput[step]
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(instr)
        step++
    }

    if(step == textinput.length){
        alert("You have finished")
        step = 1
        textinput = []
        $('#speech-alert').hide()
    }
}


// Event handler for speech/text 
$(document)
    .on('click', '#speak', function() { // brings up interface to interact
        console.log("in event")
        $('#speech-alert').show()
    })

    .on('click', '#startspeech', function() { // loads instructions into speechsynthesis to text -> speech
        console.log(textinput)
        console.log(step)
        $.get("/recipes/speech?recipeId="+recipeId, function(data){

            for(var i=0;i<data.length;i++){
                for(var j=0;j<data[i].steps.length;j++){
                    textinput.push(data[i].steps[j].step);
                }
            }

            console.log(textinput);
            var instr = new SpeechSynthesisUtterance();
            instr.rate = 1;
            instr.pitch = 1;
            instr.volume = 1;
            instr.text = textinput[0]
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(instr);
        })
    })

    .on('click', '#record', function() { // starts recognizing voice
        recognition.start()
    })

    .on('click', '#stopspeech', function() {
        recognition.stop()
    })




