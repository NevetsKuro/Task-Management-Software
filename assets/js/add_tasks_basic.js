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
                    <label class="input">
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
                        <select class="SubTask_Status select2"></select>
                    </label>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-xs btn-primary">
                            <i class="glyphicon glyphicon-pencil"></i>
                        </button>
                        <button data-toggle="dropdown" class="btn btn-xs btn-primary dropdown-toggle">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu pull-right">
                            <li>
                                <div>Transfer</div>
                            </li>
                            <li>
                                <div class="st_remove">Remove</div>
                            </li>
                        </ul>
                    </div>
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

    $(document).on('click','div.st_remove',function(){
        $(this).parentsUntil('tbody').remove();
    });
    
    function fillSubTask(tid){
        $.getJSON(urlRoot+'/subtasks/?task='+tid,function(data){
            
            var stasksIDs = [];
            stasksIDs = data.map(a => a.id);
            var datetime;
            for(let i=0; i < stasksIDs.length; i++){
                if(i > 0){
                    $.getJSON(urlRoot+'subtasks/'+stasksIDs[i],function(multistasks){
                        datetime = multistasks.deadline.split('T');
                        addSTasksRow();
                        $('#subTaskTable .new:last').attr('id',multistasks.id);
                        $('#subTaskTable .new:last .SubTask_name').val(multistasks.title);
                        $('#subTaskTable .new:last .SubTask_duration').val(multistasks.duration);
                        $('#subTaskTable .new:last .SubTask_Deadline_Date').val(datetime[0]);
                        $('#subTaskTable .new:last .SubTask_Deadline_Time').val(datetime[1].slice(0,-1));
                        $('#subTaskTable .new:last .SubTask_Assignee').val(multistasks.assignee);
                        $('#subTaskTable .new:last .SubTask_Weightage').val(multistasks.weightage);
                        $('#subTaskTable .new:last .SubTask_perCompleted').val(multistasks.completed);
                        $('#subTaskTable .new:last .SubTask_Status').val(multistasks.status);
                    });
                }else{
                    $.getJSON(urlRoot+'subtasks/'+stasksIDs[i],function(multistasks){            
                        $('#subTaskTable .new').attr('id',multistasks.id);
                        datetime = multistasks.deadline.split('T');
                        $('#subTaskTable .new .SubTask_name').val(multistasks.title);
                        $('#subTaskTable .new .SubTask_duration').val(multistasks.duration);
                        $('#subTaskTable .new .SubTask_Deadline_Date').val(datetime[0]);
                        $('#subTaskTable .new .SubTask_Deadline_Time').val(datetime[1].slice(0,-1));
                        $('#subTaskTable .new .SubTask_Assignee').val(multistasks.assignee);
                        $('#subTaskTable .new .SubTask_Weightage').val(multistasks.weightage);
                        $('#subTaskTable .new .SubTask_perCompleted').val(multistasks.completed);
                        $('#subTaskTable .new .SubTask_Status').val(multistasks.status);
                    });
                }
                
            }
        });
    }

    function createStasks(tiD){
        var subTasks = [];
        var subTask = {};
        $('#subTaskTable .new').each(function(index){
            subTask = new Object();
            subTask.title = $(this).find('.SubTask_name').val();
            subTask.task = tiD;
            subTaskID = $(this).attr('id');
            subTask.duration = $(this).find('.SubTask_duration').val();
            subTask.deadline = getFormateDateToServer($(this).find('.SubTask_Deadline_Date').val())+'T'+$(this).find('.SubTask_Deadline_Time').val().slice(0,-2)+':00Z';
            subTask.assignee = 1;//$(this).find('.SubTask_Assignee').val();
            subTask.weightage = $(this).find('.SubTask_Weightage').val();
            subTask.completed = $(this).find('.SubTask_perCompleted').val();
            subTask.status = 1;//$(this).find('.SubTask_Status').val();
            // subTasks.push(subTask);
            var subtaskJSON = JSON.stringify(subTask);
            console.log(subTask);
            if(!subTaskID){
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'subtasks/',
                    datatype:'JSON',
                    type:'POST',
                    headers: {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    processData: false,
                    data:subtaskJSON,
                    success:function(){
                        swal('Task Created!!');
                        console.log('Sub-Task added!');
                    },
                    error:function(error){
                        swal(error.responseText);
                    }
                });
            }else if(subTaskID){
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'subtasks/'+subTaskID+'/?',
                    datatype:'JSON',
                    type:'PUT',
                    headers: {
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    processData: false,
                    data:subtaskJSON,
                    success:function(){
                        swal('Task Updated!!');
                        console.log('Sub-Task Updated!');
                    },
                    error:function(error){
                        swal(error.responseText);
                    }
                });
            }
        });
    }
    ///////////////////////////////////////////////// Prefilled Data /////////////////////////////////////////////
    $.getJSON(urlRoot+'contacts/form-data',function(data){
        for (let i = 0; i < data.services.length; i++) {
            $('#taskService').append('<option value='+data.services[i].id+'>'+data.services[i].service+'</option>');
        }
    });

    ///////////////////////////////////////////////// GET REQUEST ///////////////////////////////////////////////
   
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
   

    // if(mode == templatewise){
    
    // }else if(mode == update){

    // }

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
        
        if(!tid){
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
                success:function(data){
                    swal('Task Created!!');
                    console.log('Task added!');
                    createStasks(data.id);
                },
                error:function(error){
                    swal(error.responseText);
                }
            });
            // var subTaskJSON = createStasks();
        }else if(tid){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'tasks/'+tid+'/?',
                datatype:'JSON',
                type:'PUT',
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                processData: false,
                data:taskJSON,
                success:function(){
                    swal('Task Updated!!');
                    console.log('Task Updated!');
                },
                error:function(error){
                    swal(error.responseText);
                }
            });
        }


    });
    
});