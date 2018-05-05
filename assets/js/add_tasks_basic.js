$(document).ready(function(){

    var taskParams = GetURLParams();
    var tid = taskParams['tid'];

    $('.timepicker').timepicker({
        dropdown: false
    });

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
    ///////////////////////////////////////////////// GET REQUEST ////////////////////////////////////////////////////////
    if(tid){
        $.getJSON(urlRoot+'tasks/'+tid,function(data){
            if(data.isExternal == true){
                $('#taskType').bootstrapToggle('on');  
            }else if(data.isExternal == false){
                $('#taskType').bootstrapToggle('off');  
            }
            $('#taskClients').val(data.clients);
            $('#taskService').val(data.service);
            $('#range_02').val(data.priority);
            
            var ST = data.startTime.split('T');
            var formatted1 = $.datepicker.formatDate("dd/mm/yy", new Date(ST[0]));
            $('#taskSdate').val(formatted1);
            $('#taskStime').val(ST[1]);
            
            var ET = data.endTime.split('T');
            var formatted2 = $.datepicker.formatDate("dd/mm/yy", new Date(ET[0]));
            $('#taskEdate').val(formatted2);
            $('#taskEtime').val(ET[1]);
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
        tasksData.title = "theTitle";
        tasksData.clients = 1//$('#taskClients').val();
        tasksData.service = $('#taskService').val();
        tasksData.priority = $('#range_02').val();
        tasksData.startTime = getFormateDateToServer($('#taskSdate').val()) +' '+ $('#taskStime').val();
        tasksData.endTime = getFormateDateToServer($('#taskEdate').val()) +' '+ $('#taskEtime').val();
        tasksData.duration = $('#taskDuration').val();
        tasksData.statutoryDueDate = $('#taskStats').val();
        tasksData.status = 1//$('#taskStatus').val();
        tasksData.originator = 1//$('#taskOrgin').val();
        tasksData.controller = 1//$('#taskController').val();
        tasksData.approver = 1//$('#taskApprover').val();
        tasksData.showToClient = $('#taskClientsView').prop('checked');
        var taskJSON = JSON.stringify(tasksData);
        
        $.ajax({
            url:urlRoot+'tasks/',
            datatype:'JSON',
            type:'POST',
            data:taskJSON,
            success:function(){
                swal('Task Created!!');
            },
            error:function(error){
                swal(error.responseText);
            }
        })
    });

});