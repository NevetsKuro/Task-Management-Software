$(document).ready(function(){
    $(document).on('click','#submitLogin',function(){
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({ 
            url:'http://dda90811.ngrok.io/employees/login',
            type:'POST',
            datatype:'JSON',
            data:{'username':username,'password':password},
            success:function(employee){
                console.log('done');
            },
            error:function(error){
                console.log(error.responseText)
            } 
        });
    });
    $(document).on('click','#show',function(){
        $.ajax({
            async: true,
            crossDomain: true,
            url:'http://dda90811.ngrok.io/employees/dashboard',
            method:'GET',
            datatype:'JSON',
            success:function(data){   
                console.log(data);
                console.log(data.name);
            },
            error:function(error){
                console.log(error.responseText)
            }
        });

    });


});