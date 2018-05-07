$(document).ready(function(){

    var taskParams = GetURLParams();
    var tid = taskParams['tid'];

    $('#taskType').bootstrapToggle({
        off: 'Internal',
        on: 'External',
        width: '150px',
        onstyle: 'warning',
        offstyle: 'info',
        style: 'ios',
        size: 'large'
    });

    $("#range_02").ionRangeSlider({
        min: 1,
        max: 10,
        from: 5
    });

    ///////////////////////////////////////////////// Prfilled Data /////////////////////////////////////////////
    $.getJSON(urlRoot+'contacts/form-data',function(data){
        for (let i = 0; i < data.services.length; i++) {
            $('#taskService').append('<option value='+data.services[i].id+'>'+data.services[i].service+'</option>');
        }
    });

    ///////////////////////////////////////////////// GET REQUEST ////////////////////////////////////////////////////////
    if(tid){
        $.getJSON(urlRoot+'tasks/'+tid,function(data){
            if(data.isExternal == true){
                $('#taskType').bootstrapToggle('on');  
            }else if(data.isExternal == false){
                $('#taskType').bootstrapToggle('off');  
            }
            $('#taskTitle').val(data.title);
            $('#taskClients').val(data.clients);
            $('#taskService').val(data.service);
            $('#range_02').val(data.priority);
            
            var ST = data.startTime.split('T');
            var formatted1 = $.datepicker.formatDate("dd/mm/yy", new Date(ST[0]));
            $('#taskSdate').val(formatted1);
            $('#taskStime').val(ST[1].slice(0,-1));
            
            var ET = data.endTime.split('T');
            var formatted2 = $.datepicker.formatDate("dd/mm/yy", new Date(ET[0]));
            $('#taskEdate').val(formatted2);
            $('#taskEtime').val(ET[1].slice(0,-1));
            $('#taskDuration').val(data.duration);
            $('#taskStats').val(data.statutoryDueDate);
            $('#taskStatus').val(data.status);
            $('#taskOrgin').val(data.originator);
            $('#taskController').val(data.controller);
            $('#taskApprover').val(data.approver);
            $('#taskClientsView').val(data.showToClient);
        });
    }

    $(document).on('click','#submitTask',function(){
        
        var tasksData = new Object();
        var isExternal= $('#taskType').prop('checked');
        tasksData.title = $('#taskTitle').val();
        tasksData.isExternal = isExternal;
        tasksData.client = "1";//$('#taskClients').val();
        tasksData.originator = "1";//$('#taskOrgin').val();
        tasksData.controller = "1";//$('#taskController').val();
        tasksData.status = "1";//$('#taskStatus').val();
        tasksData.showToClient = $('#taskClientsView').prop('checked');
        tasksData.service = $('#taskService').val();
        tasksData.approver = "1";//$('#taskApprover').val();
        tasksData.priority = $('#range_02').val();
        tasksData.startTime = getFormateDateToServer($('#taskSdate').val()) +'T'+ $('#taskStime').val().slice(0,-2)+':00Z';
        tasksData.endTime = getFormateDateToServer($('#taskEdate').val()) +'T'+ $('#taskEtime').val().slice(0,-2)+':00Z';
        tasksData.duration = $('#taskDuration').val();
        tasksData.statutoryDueDate = getFormateDateToServer($('#taskStats').val());
        var taskJSON = JSON.stringify(tasksData);
        console.log(taskJSON);
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'tasks/',
            datatype:'JSON',
            type:'POST',
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache"
              },
            processData: false,
            data:taskJSON,
            success:function(){
                swal('Task Created!!');
            },
            error:function(error){
                swal(error.responseText);
            }
        });
    });

});