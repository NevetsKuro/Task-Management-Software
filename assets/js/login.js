$(document).ready(function(){
    
    $(document).on('click','#submitLogin',function(){
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({ 
            url:'http://35.202.86.61/office-management/employees/login',
            type:'POST',
            datatype:'JSON',
            data:{'username':username,'password':password},
            success:function(){
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
            url:'http://35.202.86.61/office-management/employees/dashboard',
            type:'GET',
            datatype:'JSON',
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache"
              },
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