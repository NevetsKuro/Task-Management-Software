$(document).ready(function(){

    var params = GetURLParams();
    var tid = params['tid'];
    var mode =params['mode'];
    var staskId =params['staskId'];

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

    $('.table-responsive').responsiveTable({
        addFocusBtn:false
    });
    
    $(document).on('change','#range_02',function(){
        // console.log($(this).val()); 
        var v = $(this).val(); 
        var t = $('#task > div > div:nth-child(4) > div:nth-child(3) > label.input > span > span.irs-slider.single'); 
        switch(v){ 
            case "1":case "2": t.css('transform','scale(0.5)');break;
            case "3":case "4": t.css('transform','scale(0.7)');break;
            case "5":case "6": t.css('transform','scale(0.9)');break;
            case "7":case "8": t.css('transform','scale(1.1)');break;
            case "3":case "4": t.css('transform','scale(1.3)');break;
        }  
    });
    $(document).on("change", ".SubTask_Weightage", function() {
        var sum = 0;var limit = 100;
        $(".SubTask_Weightage").each(function(){
            sum += +$(this).val();
        });
        if(sum>limit){ 
            $(this).val('');
            $(this).focus(); 
            swal('The Total Weightage Should be 100!')
        } 
        console.log(sum);
    });
    $(document).on("change", ".SubTask_duration", function() {
        var dur = $(this).val();
        var arr = dur.split('.');
        if(arr[1]>60){ 
            var res = arr[1] % 60;
           $(this).val(arr[0] +'.'+res);
         }
         if($(this).val().indexOf() == -1){
             $(this).val(dur +'.00');
         }
    });
    ///////////////////////////////////////////////// interface Codes //////////////////////////////////////////
    function addSTasksRow(){
        $("#subTaskTable").find('tbody').append(`
            <tr class='new'>
                <td>
                    <label class="input">
                        <input class="SubTask_name" type="text">
                    </label>
                </td>
                <td>
                    <label class="input">
                        <input class="SubTask_duration" type="text" placeholder="HH.MM">
                    </label>
                </td>
                <td>
                    <label class="input custom_inline m-l-0">
                        <input class="SubTask_Deadline_Date datepickr" type="text">
                        <input class="SubTask_Deadline_Time timepicker" type="text">
                    </label>
                </td>
                <td>
                    <label class="select">
                        <select class="SubTask_Assignee select2"></select>
                    </label>
                </td>
                <td>
                    <label class="input">
                        <input class="SubTask_Weightage" type="text">
                    </label>
                </td>
                <td>
                    <label class="input">
                        <input class="SubTask_perCompleted" type="text">
                    </label>
                </td>
                <td>
                    <label class="select">
                        <select entity="TaskStatus" class="SubTask_Status select2 editselect"></select>
                    </label>
                </td>
                <td class="btn-group">
                    <button class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-pencil"></i></button>
                    <button data-toggle="dropdown" class="btn btn-xs btn-primary dropdown-toggle"> <span class="caret"></span></button>
                    <ul class="dropdown-menu pull-right">
                    <li class="custom_inline"><a href="#">Transfer</a><i class="glyphicon glyphicon-transfer"></i></li><br>
                    <li class="custom_inline st_remove"><a href="#">Remove</a><i class="glyphicon glyphicon-remove"></i></li>
                    </ul>
                </td>
            </tr>
        `);
        $('.select2').select2({
            placeholder: "Select...",
            allowClear: true
        });
        datetime();
    }
    $(document).on('click',"#addSubTask",addSTasksRow);

    $(document).on('click','.st_remove',function(){
        $(this).parentsUntil('tbody').remove();
    });
    
    // function fillSubTask(tid){
    //     $.getJSON(urlRoot+'/subtasks/?task='+tid,function(data){
            
    //         var stasksIDs = [];
    //         stasksIDs = data.map(a => a.id);
    //         var datetime;
    //         for(let i=0; i < stasksIDs.length; i++){
    //             if(i > 0){
    //                 $.getJSON(urlRoot+'subtasks/'+stasksIDs[i],function(multistasks){
    //                     datetime = multistasks.deadline.split('T');
    //                     addSTasksRow();
    //                     $('#subTaskTable .new:last').attr('id',multistasks.id);
    //                     $('#subTaskTable .new:last .SubTask_name').val(multistasks.title);
    //                     $('#subTaskTable .new:last .SubTask_duration').val(multistasks.duration);
    //                     var formatted4 = $.datepicker.formatDate("dd/mm/yy", new Date(datetime[0]));
    //                     $('#subTaskTable .new:last .SubTask_Deadline_Date').val(formatted4);
    //                     $('#subTaskTable .new:last .SubTask_Deadline_Time').val(datetime[1].slice(0,-1));
    //                     $('#subTaskTable .new:last .SubTask_Assignee').val(multistasks.assignee);
    //                     $('#subTaskTable .new:last .SubTask_Weightage').val(multistasks.weightage);
    //                     $('#subTaskTable .new:last .SubTask_perCompleted').val(multistasks.completed);
    //                     $('#subTaskTable .new:last .SubTask_Status').val(multistasks.status);
    //                 });
    //             }else{
    //                 $.getJSON(urlRoot+'subtasks/'+stasksIDs[i],function(multistasks){            
    //                     $('#subTaskTable .new').attr('id',multistasks.id);
    //                     datetime = multistasks.deadline.split('T');
    //                     $('#subTaskTable .new .SubTask_name').val(multistasks.title);
    //                     $('#subTaskTable .new .SubTask_duration').val(multistasks.duration);
    //                     var formatted4 = $.datepicker.formatDate("dd/mm/yy", new Date(datetime[0]));
    //                     $('#subTaskTable .new .SubTask_Deadline_Date').val(formatted4);
    //                     $('#subTaskTable .new .SubTask_Deadline_Time').val(datetime[1].slice(0,-1));
    //                     $('#subTaskTable .new .SubTask_Assignee').val(multistasks.assignee);
    //                     $('#subTaskTable .new .SubTask_Weightage').val(multistasks.weightage);
    //                     $('#subTaskTable .new .SubTask_perCompleted').val(multistasks.completed);
    //                     $('#subTaskTable .new .SubTask_Status').val(multistasks.status);
    //                 });
    //             }
                
    //         }
    //     });
    // }

    function createStasks(){
        var subTasks = [];
        var subTask = {};
        $('#subTaskTable .new').each(function(index){
            subTask = new Object();
            subTask.title = $(this).find('.SubTask_name').val();
            subTask.task = 1;
            subTaskID = $(this).attr('id');
            subTask.duration = $(this).find('.SubTask_duration').val();
            subTask.deadline = getFormateDateToServer($(this).find('.SubTask_Deadline_Date').val())+'T'+$(this).find('.SubTask_Deadline_Time').val().slice(0,-2)+':00Z';
            subTask.assignee = 1;//$(this).find('.SubTask_Assignee').val();
            subTask.weightage = $(this).find('.SubTask_Weightage').val();
            subTask.completed = $(this).find('.SubTask_perCompleted').val();
            subTask.status = 1;//$(this).find('.SubTask_Status').val();
            subTasks.push(subTask);
            console.log(subTasks);
            });
        return subTasks;
    }
    ///////////////////////////////////////////////// Prefilled Data /////////////////////////////////////////////
    $.getJSON(urlRoot+'common/form-data',function(data){
        for (let i = 0; i < data.services.length; i++) {
            $('#taskService').append('<option value='+data.services[i].id+'>'+data.services[i].service+'</option>');
        }
        for (var i = 0; i < data.task_status.length; i++) {
            $('.SubTask_Status').append('<option value='+data.task_status[i].id+'>'+data.task_status[i].status+'</option>');
            $('#taskStatus').append('<option value='+data.task_status[i].id+'>'+data.task_status[i].status+'</option>');
        }
    });

    $.getJSON(urlRoot+'clients/allclients',function(data){
        for (var i = 0; i < data.length; i++) {
            $('#taskClients').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
    });

    $.getJSON(urlRoot+'employees',function(data){
        for (let i = 0; i < data.length; i++) {
            $('#taskController').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
        for (let i = 0; i < data.length; i++) {
            $('#taskApprover').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
        emp=data;
        fillAssignee();
    });
    function fillAssignee(){
        for (var i = 0; i < emp.length; i++) {
            $('.SubTask_Assignee').append('<option value='+emp[i].id+'>'+emp[i].name+'</option>');
            $('#SelectAssignee').append('<option value='+emp[i].id+'>'+emp[i].name+'</option>');
        }
    }
    ///////////////////////////////////////////////// GET REQUEST ///////////////////////////////////////////////
   
    $(document).on('change','#taskService',function(){
            var service = $(this).val();
            $.getJSON(urlRoot+'subtasks/templates?service='+service,function(templates){
                $('#subTaskTable .new:last .SubTask_name').val('');
                $('#subTaskTable .new:last .SubTask_duration').val('');
                for(let i=0; i < templates.length; i++){
                    if(i > 0){
                            addSTasksRow();
                            $('#subTaskTable .new:last .SubTask_name').val(templates[i].title);
                            $('#subTaskTable .new:last .SubTask_duration').val(templates[i].duration);
                    }else{
                            $('#subTaskTable .new .SubTask_name').val(templates[i].title);
                            $('#subTaskTable .new .SubTask_duration').val(templates[i].duration);
                    }
                }   
            });
    });

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
            var rangeSlider = $("#range_02").data('ionRangeSlider');
            rangeSlider.update({from:data.priority});
            
            var ST = data.startTime.split('T');
            var formatted1 = $.datepicker.formatDate("dd/mm/yy", new Date(ST[0]));
            $('#taskSdate').val(formatted1);
            $('#taskStime').val(ST[1].slice(0,-1));
            
            var ET = data.endTime.split('T');
            var formatted2 = $.datepicker.formatDate("dd/mm/yy", new Date(ET[0]));
            $('#taskEdate').val(formatted2);
            $('#taskEtime').val(ET[1].slice(0,-1));
            $('#taskDuration').val(data.duration);
            var formatted3 = $.datepicker.formatDate("dd/mm/yy", new Date(data.statutoryDueDate));
            $('#taskStats').val(formatted3);
            $('#taskStatus').val(data.status);
            $('#taskOrgin').val(data.originator);
            $('#taskController').val(data.controller);
            $('#taskApprover').val(data.approver);
            $('#taskClientsView').val(data.showToClient);
            fillSubTask(tid);
        });
    }

    function checkValidation(){
        var statDate = $('#taskStats').val();
        var title = $('#taskTitle').val();
        var serName = $('#taskService').val();
        var dur = $('#taskDuration').val();
        var sDate = $('#taskSdate').val();
        var eDate = $('#taskStime').val();
        var sTime = $('#taskEdate').val();
        var eTime = $('#taskEtime').val();
        var Sdate = $('#SubTask_Deadline_Date').val();
        var Stime = $('#SubTask_Deadline_Time').val();
        var assignee = 1;//$('#subTaskTable > tbody > tr > td:nth-child(4) > label > input').val();
        var duration = $('#subTaskTable > tbody > tr > td:nth-child(2) > label > input').val();

        if(!title){
            swal('Enter Title Please!');
            return false;
        }
        if(!serName){
            swal('Enter Title Please!');
            return false;
        }
        if(!dur){
            swal('Enter Duration Please!');
            return false;
        }
        if(!statDate){
            swal('Enter the Statutory Date Please!');
            return false;
        }
        if(!sDate&&!eDate&&!sTime&&!eTime){
            swal('Enter the Dates Please!');
            return false;
        }
        if(Sdate&&Stime){
            swal('Enter the Dates for subtask created Please!');
            return false;
        }
        if(!duration){
            swal('Enter the duration for subtask Please!');
            return false;
        }
        if(!assignee){
            swal('Enter the assignees for subtask Please!');
            return false;
        }
        return true;
    }

    $(document).on('click','#submitTask',function(){
        
    var valid = checkValidation();

    if(valid){
        var RecurTask = new Object();
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
        tasksData.startTime = getFormateDateToServer($('#taskSdate').val()) +'T'+ $('#taskStime').val()+':00Z';
        tasksData.endTime = getFormateDateToServer($('#taskEdate').val()) +'T'+ $('#taskEtime').val()+':00Z';
        tasksData.duration = $('#taskDuration').val();
        tasksData.statutoryDueDate = getFormateDateToServer($('#taskStats').val()) + 'T04:13:13Z';
        
        RecurTask.startDateTime = getFormateDateToServer($('#taskRdate').val()) +'T'+ $('#taskRtime').val()+':00Z';
        RecurTask.periods = $('#taskPeriods').val();
        RecurTask.frequency = $('#taskFrequeny').val();
        RecurTask.templateTask = tasksData;
        RecurTask.subtasks = createStasks();
        var RecurJSON = JSON.stringify(RecurTask);
        
        if(!tid){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'tasks/recurrings/',
                datatype:'JSON',
                type:'POST',
                headers: {
                    "X-CSRFToken": csrftoken,
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                processData: false,
                data:RecurJSON,
                success:function(data){
                    swal('Recurring Task Created!!');
                    console.log('Recurring Task added!');
                },
                error:function(error){
                    swal(error.responseText);
                }
            });
        }else if(tid){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'tasks/recurrings/'+tid+'/?',
                datatype:'JSON',
                type:'PUT',
                headers: {
                    "X-CSRFToken": csrftoken,
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                processData: false,
                data:RecurJSON,
                success:function(data){
                    swal('Recurring Task Updated!!');
                    console.log('Recurring Task Updated!');
                },
                error:function(error){
                    swal(error.responseText);
                }
            });
        }
    }

    });
    
});