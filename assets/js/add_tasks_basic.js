$(document).ready(function(){

    var params = GetURLParams();
    var tid = params['tid'];
    var mode =params['mode'];
    var staskId =params['staskId'];
    var servs='';
    
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
                        <input class="SubTask_Deadline_Date datepickr" type="text" placeholder="Date">
                        <input class="SubTask_Deadline_Time timepicker" type="text" placeholder="Time">
                    </label>
                </td>
                <td>
                    <label class="select">
                        <select class="SubTask_Assignee select2">
                            <option default value=""></option>
                        </select>
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
                        <select class="SubTask_Status select2">
                            <option default value="">Select...</option>
                            <option value="1">Created</option>
                            <option value="2">Started</option>
                            <option value="3">Completed</option>
                        </select>
                    </label>
                </td>
                <td class="btn-group">
                    <button class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-pencil"></i></button>
                    <button data-toggle="dropdown" class="btn btn-xs btn-primary dropdown-toggle"> <span class="caret"></span></button>
                    <ul class="dropdown-menu pull-right idStored">
                    <li class="custom_inline st_transfer"><a href="#"><span class="glyphicon glyphicon-transfer"></span></a></li><br>
                    <li class="custom_inline st_remove"><a href="#"><span class="glyphicon glyphicon-remove"></span></a></li>
                    </ul>
                </td>
            </tr>
        `);
        $('.select2').select2({
            placeholder: "Select...",
            allowClear: true
        });
        datetime();
        $.getJSON(urlRoot+'employees',function(data){
            for (let i = 0; i < data.length; i++) {
                $('.SubTask_Assignee').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
        });
    }

    $(document).on('click',"#addSubTask",addSTasksRow);

    $(document).on('click','.st_remove',function(){
        let ssid = $(this).parents('tr').attr('id');
        if(ssid){
            swal({
                title: "Are you sure?",
                text: "You want to delete this record!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    
                    if(ssid != null){
                        $.ajax({
                            url: urlRoot + "subtasks/" +ssid+'/',
                            type: 'DELETE',
                            datatype: "JSON",
                            success: function (data) {
                                swal('Subtask has been deleted!!');
                            }
                        });
                    }
                    
                    $(this).parentsUntil('tbody').remove();
                    swal("Poof! Your record has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("The selected row is not deleted!");
                }
            });
        }else{
            $(this).parentsUntil('tbody').remove();
        }
    });
    
    $(document).on('change','.calc',function(){
        let id = $('#taskProposal').val()
        $.getJSON(urlRoot+'tasks/proposals/'+id,function(data){
            $('#taskProposalFee').val(data.fees);            
        });
    })

    function fillSubTask(tid){
        $.getJSON(urlRoot+'/subtasks/?task='+tid,function(data){
            
            var stasksIDs = [];
            stasksIDs = data.map(a => a.id);
            var datetime;
            $('#subTaskTable .new').not('.new:first').empty();
            for(let i=0; i < stasksIDs.length; i++){
                if(i > 0){
                    $.getJSON(urlRoot+'subtasks/'+stasksIDs[i],function(multistasks){
                        datetime = multistasks.deadline.split('T');
                        addSTasksRow();
                        fillAssignee();
                        $('#subTaskTable .new:last').attr('id',multistasks.id);
                        $('#subTaskTable .new:last .SubTask_name').val(multistasks.title);
                        $('#subTaskTable .new:last .SubTask_duration').val(multistasks.duration);
                        var formatted4 = $.datepicker.formatDate("dd/mm/yy", new Date(datetime[0]));
                        $('#subTaskTable .new:last .SubTask_Deadline_Date').val(formatted4);
                        $('#subTaskTable .new:last .SubTask_Deadline_Time').val(datetime[1].slice(0,-1));
                        $('#subTaskTable .new:last .SubTask_Assignee').val(multistasks.assignee).trigger('change');
                        //$('.SubTask_Assignee option:contains("'+multistasks.assignee+'")').prop('selected',true);
                        $('#subTaskTable .new:last .SubTask_Weightage').val(multistasks.weightage);
                        $('#subTaskTable .new:last .SubTask_perCompleted').val(multistasks.completed);
                        $('#subTaskTable .new:last .SubTask_Status').val(multistasks.status).trigger('change');
                    });
                }else{
                    $.getJSON(urlRoot+'subtasks/'+stasksIDs[i],function(multistasks){            
                        $('#subTaskTable .new').attr('id',multistasks.id);
                        datetime = multistasks.deadline.split('T');
                        $('#subTaskTable .new .SubTask_name').val(multistasks.title);
                        $('#subTaskTable .new .SubTask_duration').val(multistasks.duration);
                        var formatted4 = $.datepicker.formatDate("dd/mm/yy", new Date(datetime[0]));
                        $('#subTaskTable .new .SubTask_Deadline_Date').val(formatted4);
                        $('#subTaskTable .new .SubTask_Deadline_Time').val(datetime[1].slice(0,-1));
                        $('#subTaskTable .new .SubTask_Assignee').val(multistasks.assignee).trigger('change');
                        $('#subTaskTable .new .SubTask_Weightage').val(multistasks.weightage);
                        $('#subTaskTable .new .SubTask_perCompleted').val(multistasks.completed);
                        $('#subTaskTable .new .SubTask_Status').val(multistasks.status).trigger('change');
                    });
                }
                
            }
        });
    }

if(tid)
    fillSubTask(tid);
    function createStasks(tiD){
        var subTasks = [];
        var subTask = {};
        $('#subTaskTable .new').each(function(index){
            subTask = new Object();
            subTask.title = $(this).find('.SubTask_name').val();
            subTask.task = tiD;
            subTask.duration = $(this).find('.SubTask_duration').val();
            subTask.deadline = getFormateDateToServer($(this).find('.SubTask_Deadline_Date').val())+'T'+$(this).find('.SubTask_Deadline_Time').val().slice(0,-2)+':00Z';
            subTask.assignee = 1;//$(this).find('.SubTask_Assignee').val();
            subTask.weightage = $(this).find('.SubTask_Weightage').val()?$(this).find('.SubTask_Weightage').val():0;
            subTask.completed = $(this).find('.SubTask_perCompleted').val()?$(this).find('.SubTask_perCompleted').val():0;
            subTask.status = 1;//$(this).find('.SubTask_Status').val();
            // subTasks.push(subTask);
            var subtaskJSON = JSON.stringify(subTask);
            subTaskID = $(this).attr('id');
            console.log('subtask'+subTask);
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
    $.getJSON(urlRoot+'common/form-data',function(data){
        for (let i = 0; i < data.services.length; i++) {
            $('#taskService').append('<option value='+data.services[i].id+'>'+data.services[i].service+'</option>');
        }
    });

    $.getJSON(urlRoot+'tasks/proposals',function(data){
        for (let i = 0; i < data.length; i++) {
            $('#taskProposal').append('<option value='+data[i].proposalNumber+'>'+data[i].proposalNumber+'</option>');
        }
    });
   var emp='';
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
        for (let i = 0; i < emp.length; i++) {
            $('.SubTask_Assignee').append('<option value='+emp[i].id+'>'+emp[i].name+'</option>');
        }
    }
    ///////////////////////////////////////////////// GET REQUEST ///////////////////////////////////////////////
    function docAdder(){
        if(servs!=''){
            var text='';
            $.ajax({
                url:'http://35.202.86.61/office-management/tasks/knowledge/?service='+servs,
                type:'GET',
                contentType:'application/json',
                datatype:'JSON',
                success:function(data){
                    if(data!=''){
                        console.log(data);
                        for(var i=0;i<data.length;i++){
                            text=text+'<tr><td>'+data[i].documentType+'</td><td><a href="'+data[i].document+'">'+data[i].title+'</a></td><td>'+data[i].title+'</td></tr>'
                            $('#docss').html(text);
                        }
                    }  
                    else{
                        $('#docss').html('<tr><td colspan="3">No knowledge available.</td></tr>');
                    }
                }
            });
        }
        else{
            $('#docss').html('<tr><td colspan="3">Please Select A Service.</td></tr>');
        }
   }
    
    var data_added = false;
    var templates  = function(){
        var service = $(this).val();
        if(data_added){
            $('#subTaskTable .new input').val('');
            $('#subTaskTable .new').not('.new:first').empty();
        }
        $.getJSON(urlRoot+'subtasks/templates?service='+service,function(templates){
            $('#subTaskTable .new:last .SubTask_name').val('');
            $('#subTaskTable .new:last .SubTask_duration').val('');
            for(let i=0; i < templates.length; i++){
                if(i > 0){
                    addSTasksRow();
                    $('#subTaskTable .new:last .SubTask_name').val(templates[i].title);
                    $('#subTaskTable .new:last .SubTask_duration').val(templates[i].duration);
                }
                else{
                    $('#subTaskTable .new .SubTask_name').val(templates[i].title);
                    $('#subTaskTable .new .SubTask_duration').val(templates[i].duration);
                }
            }
            data_added = true;
        });
        servs=service;
        docAdder();
    }

    $(document).on('change','#taskService',templates);

    if(tid){
        $(document).off('change','#taskService',templates);    
        $.getJSON(urlRoot+'tasks/'+tid,function(data){
            if(data.isExternal == true){
                $('#taskType').bootstrapToggle('on');  
            }else if(data.isExternal == false){
                $('#taskType').bootstrapToggle('off');  
            }
            $('#taskTitle').val(data.title);
            $('#taskClients').val(data.clients).trigger('change');
            $('#taskService').val(data.service).trigger('change');
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
            $('#taskStatus').val(data.status).trigger('change');
            // $('#taskOrgin').val(data.originator);
            $('#taskController').val(data.controller).trigger('change');
            $('#taskApprover').val(data.approver).trigger('change');
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
        var name = $('#subTaskTable > tbody > tr > td:nth-child(1) > label > input').val();
        var Sdate = $('#subTaskTable > tbody > tr > td:nth-child(3) > label > input:first').val();
        var Stime = $('#subTaskTable > tbody > tr > td:nth-child(3) > label > input:nth-child(2)').val();
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
        if(!name){
            swal('Enter the name for subtask Please!');
            return false;
        }
        if(!duration){
            swal('Enter the duration for subtask Please!');
            return false;
        }
        if(!Sdate&&!Stime){
            swal('Enter the Dates for subtask created Please!');
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
            tasksData.statutoryDueDate = getFormateDateToServer($('#taskStats').val()) + 'T04:13:13Z';
            tasksData.document
            
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
                        "X-CSRFToken": csrftoken,
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
                        "X-CSRFToken": csrftoken,
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    processData: false,
                    data:taskJSON,
                    success:function(data){
                        swal('Task Updated!!');
                        console.log('Task Updated!');
                        createStasks(data.id);
                    },
                    error:function(error){
                        swal(error.responseText);
                    }
                });

            }
        }

    });
    var doco='';
    $(document).on('change','#doc1', function(){
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
    $(document).on('click','#addKnowledge',function(){
        var knowledgeData = new Object();
        knowledgeData.title=$('#doctitle').val();
        knowledgeData.documentType=$('#docttype').val();
        knowledgeData.document=doco;
        knowledgeData.service=servs;
        var knoJSON=JSON.stringify(knowledgeData);
        console.log(knoJSON);
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'tasks/knowledge/',
            datatype:'JSON',
            type:'POST',
            headers: {
                "X-CSRFToken": csrftoken,
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            processData: false,
            data:knoJSON,
            success:function(data){
                docAdder();
                $('#doctitle').val('');
                $('#docttype').val('');
                swal("Knowledge added");
            },
            error:function(error){
                console.log(error.responseText)
                swal("Knowledge cannot be added");
            }
        });
    });  
    $(document).on('click','#addKnowledge',function(){

    });
});