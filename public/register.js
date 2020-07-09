// // This js file is connected to the register.ejs file in the pages folder
// // the purpose of this code is to invoke jquery to send data from the 
// // client side to the server 

// $(document).ready(function(){

//     $('submit_new_user').on('click',submitNewUser);

// });


// function submitNewUser()
// {

//     var data ={
//         fname: $('#first_name').val(),
//         lname: $('#last_name').val(),
//         username: $('#username').val(),
//         email: $('#email').val(),
//         phone: $('#phone').val(),
//         type: $('#user_type').children("option:selected").val(),
//         password: $('#password').val()

//     }


//     $.ajax({
//         method: 'POST',
//         url: '/add_user',
//         data_person: data_person,
//         data: data,
//         success: function(res){
//             if(res == "error"){
//                 alert("You have already registered for website");
//             }

//         }

//     })




// }


// function submit_new()
//     {
//         console.log("hello")
//         // var fname = document.getElementById("first_name").innerHTML;
//         // console.log(fname);
//         // var lname = document.getElementById("last_name").innerHTML;
//         // var username = document.getElementById("username").innerHTML;
//         // var email = document.getElementById("email").innerHTML;
//         // var phone = document.getElementById("phone").innerHTML;
//         // var user_type = document.getElementById("user_type").innerHTML;
//         // var password = document.getElementById("password").innerHTML;

//         // var data_person = {fname, lname, username, email, phone}
//         // fetch('/addperson', {
//         //     method: 'post',
//         //     headers: {'Content-Type': 'text/plain'},
//         //     body: JSON.stringify(data_person)

//         // })
//         // .then(function(res){
//         //     return res.JSON()
//         // })

        
//     }
