$(document).ready(function(){
    var params = GetURLParams();
    var src=params['src'];
    var urlRoot = 'http://35.202.86.61/office-management/';
    
    $(document).on('click','.showPwd',function(){
        var a = $('#password').attr('type');
        if(a=="text"){
            $('#password').attr('type','password')
            $(this).addClass('icon-eye').removeClass('icon-eye-crossed');
        }else{
            $('#password').attr('type','text')
            $(this).removeClass('icon-eye').addClass('icon-eye-crossed');
        }
    })
    
    $(document).on('click','#submitLogin',function(){
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({ 
            url:urlRoot+'login/',
            type:'POST',
            datatype:'JSON',
            data:{'username':username,'password':password},
            success:function(data){
                console.log(data.name?data.name:"NO NAME");
                console.log(data.token?data.token:"NO TOKEN");
                localStorage.setItem('token',data.token);
                // $(location).attr('href','dashboard.html');
                if(src!=null && src!='')
                    $(location).attr('href',src);
                else
                    $(location).attr('href','dashboard.html');    
            },
            error:function(error){
                console.log(error.responseText);
            } 
        });
    });
    // $(document).on('click','#show',function(){
    //     $.ajax({
    //         async: true,
    //         crossDomain: true,
    //         url:urlRoot+'employees/dashboard/',
    //         method:'GET',
    //         datatype:'JSON',
    //         success:function(data){   
    //             console.log(data);
    //             console.log(data.name);
    //         },
    //         error:function(error){
    //             console.log(error.responseText)
    //         }
    //     });

    // });


});