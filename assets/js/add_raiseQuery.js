$(document).ready(function(){

    var clients,employees;
    $.ajax({
        async:false,
        url: urlRoot+'clients/allclients',
        datatype: 'JSON',
        type: 'GET',
        success: function (data) {
            clients = data;
        }
    });
    $.ajax({
        async:false,
        url: urlRoot+'employees/',
        datatype: 'JSON',
        type: 'GET',
        success: function (data) {
            employees = data;
        }
    });
    
    function getClientList(){
        $('#query_list').empty();
        for (var i = 0; i < clients.length; i++) {
            $('#query_list').append('<option value=' + clients[i].id + '>' + clients[i].name + '</option>');
        }
    }
    function getEmployeeList(){
        $('#query_list').empty();
        for (var i = 0; i < employees.length; i++) {
            $('#query_list').append('<option value=' + employees[i].id + '>' + employees[i].name + '</option>');
        }
    }
    $(document).on('change','#query_person',function(){
        var personFor = $(this).val();
        if(personFor == 'C'){
            $('.query_label').html('Clients:')
            getClientList();
        }else if(personFor == 'M'){
            $('.query_label').html('Managers:')
            getEmployeeList();
        }else{

        }
    });
    
    var doco='';
    $(document).on('change','#file4', function(){
        var mimeType=$(this)[0].files[0]['type'];
            var ggg1=$(this)[0].files[0];
            var reader = new FileReader();
            //$('#doc1txt').val($('#doc1').val());
            reader.readAsDataURL(ggg1);
            reader.onload = function () {
                console.log('FILE :'+reader.result);
                doco=reader.result;
            }
    });


    $(document).on('click','#submitQuery',function(){

        var valid = validation();

        if(valid){
            var subtask = 1;
            var task = 1;
            var query = $('#query_Query').val();
            var attachment = doco;//$('#query_attachment').val();
            var link = $('#query_link').val();
            var path = $('#query_path').val();
            var person = $('#query_person').val();
            var sel_person = $('#query_list').val();
            var is_approved = $('#query_notify').is(':checked');
            
            var queryObj = new Object();
            queryObj.query = query;
            queryObj.is_approved = is_approved;
            queryObj.status = 'R';
            queryObj.subtask = subtask;
            if(person == 'C'){
                queryObj.client = sel_person;
            }else if(person == 'M'){
                queryObj.manager = sel_person;
            }else{
            }
            
            var queryJSON = JSON.stringify(queryObj);
            console.log(queryJSON);

            $.ajax({
                async:false,
                crossDomain: true,
                url:urlRoot+'employees/queries/',
                type:'POST',
                datatype:'JSON',
                contentType: 'application/json',
                headers:{
                    "X-CSRFToken": csrftoken
                },
                data:queryJSON,
                success:function(){
                    swal('Query posted');
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        }

    })
});