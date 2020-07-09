//starting
$(document).ready(function(){
    $('#logout').on('click',logOutHandler);
})

function logOutHandler(){
    $.ajax({
        method: 'POST',
        url:'/auth/logout',
        success: function(){

        }
    })
}
