$(document).ready(function(){

    var params = GetURLParams();
    var tid = params['tid'];
    var mode =params['mode'];
    var staskId =params['staskId'];
    var servs='';
    var transferredTo; //subtask id
    var assig = 0; //assignee for transfer to
    
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

    $('#SelectAssignee').select2({
        dropdownParent: $('#AssigneeTransferModal')
    })
    
    $(document).on('change','#range_02',function(){
        // console.log($(this).val()); 
        var v = $(this).val(); 
        var t = $('#tab1 > div.panel-body > div:nth-child(4) > div:nth-child(3) > label.input.state-success > span > span.irs-slider.single'); 
        var bar_edge = $('#tab1 > div.panel-body > div:nth-child(4) > div:nth-child(3) > label.input.state-success > span > span.irs-bar-edge');
        var bar = $('#tab1 > div.panel-body > div:nth-child(4) > div:nth-child(3) > label.input.state-success > span > span.irs-bar');
        switch(v){ 
            case "1":case "2": t.css('transform','scale(0.5)');bar_edge.css('background','#02f709');bar.css('background','#02f709');break;
            case "3":case "4": t.css('transform','scale(0.7)');bar_edge.css('background','#02db08');bar.css('background','#02db08');break; 
            case "5":case "6": t.css('transform','scale(0.9)');bar_edge.css('background','#02cc08');bar.css('background','#02cc08');break; 
            case "7":case "8": t.css('transform','scale(1.1)');bar_edge.css('background','#00c106');bar.css('background','#00c106');break;
            case "3":case "4": t.css('transform','scale(1.3)');bar_edge.css('background','#00b706');bar.css('background','#00b706');break;  
        }  
    });
    
    $(document).on("change", ".SubTask_Weightage", function() {
        var sum = 0;var limit = 100;
        $(".SubTask_Weightage").each(function(){
            sum += +$(this).val();
        });
        if(sum>limit){ 
            var diff = limit - sum;
            $(this).val(diff);
            $(this).val('');
            $(this).focus();
            swal('The Total Weightage cannot be more than 100!')
        }
        if(sum == 100){
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
         if($(this).val().indexOf('.') == -1){
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
                        <select entity="TaskStatus" class="SubTask_Status select2 editselect">
                            <option default value="">Select...</option>
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
            for (var i = 0; i < data.length; i++) {
                $('.SubTask_Assignee').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
        });
    }

    $(document).on('click',"#addSubTask",addSTasksRow);

    $(document).on('click','.st_remove',function(){
        var ssid = $(this).parents('tr').attr('id');
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
    
    $(document).on('change','#taskProposal',function(){
        var id = $('#taskProposal').val()
        $.getJSON(urlRoot+'tasks/proposals/'+id,function(data){
            $('#taskProposalFee').val(data.fees);
            $('#taskProposalTile').val(data.subject);
        });
    })

    
    $(document).on('click','#taskBar',function(e){
        e.preventDefault();
        $.getJSON(urlRoot+'tasks/'+tid,function(data){
            var empCost = data.employeeCost;
            var adminCost = data.adminCost;
            var outOfPocket = data.outOfPocket;
            var profit = data.profit;
            var tots = empCost + adminCost + outOfPocket;
            // var fees = $('#taskProposalFee').val();
            var valueIs = parseInt(profit / tots * 100);
            $('.pBar').css('width',valueIs+'%');
            if(valueIs<5){
                $('#tab2 > div.row.m-10 > div.col-lg-12.m-t-20 > div > div.progress-bar').css('background-color','#fb2e2e');
            }else if(valueIs<25&&valueIs>5){
                $('#tab2 > div.row.m-10 > div.col-lg-12.m-t-10 > div > div.progress-bar').css('background-color','#ffb81a');
            }else if(25<valueIs){
                $('#tab2 > div.row.m-10 > div.col-lg-12.m-t-10 > div > div.progress-bar').css('background-color','#28b10f');
            }
        });
    });

    $(document).on('click','.st_transfer',function(){
        $('#AssigneeTransferModal').modal('show');
        $('#Subtask_namey').val($(this).parents('tr').find('td:nth-child(1) > label > input').val());
        $('#SelectAssignee').select2({
            dropdownParent: $('#AssigneeTransferModal')
        })
    });

    $(document).on('click','#AssigneeTransfer',function(){
        assig = $('#SelectAssignee').val();
        transferredTo = $('#Subtask_namey').val();
        $('#submitTask').trigger('click');
    })

    $(document).on('change','#range_02',function(){
        // console.log($(this).val()); 
        var v = $(this).val(); 
        var t = $('#tab1 > div.panel-body > div:nth-child(4) > div:nth-child(3) > label.input.state-success > span > span.irs-slider.single'); 
        var bar_edge = $('#tab1 > div.panel-body > div:nth-child(4) > div:nth-child(3) > label.input.state-success > span > span.irs-bar-edge');
        var bar = $('#tab1 > div.panel-body > div:nth-child(4) > div:nth-child(3) > label.input.state-success > span > span.irs-bar');
        switch(v){ 
            case "1":case "2": t.css('transform','scale(0.5)');bar_edge.css('background','#02f709');bar.css('background','#02f709');break;
            case "3":case "4": t.css('transform','scale(0.7)');bar_edge.css('background','#02db08');bar.css('background','#02db08');break; 
            case "5":case "6": t.css('transform','scale(0.9)');bar_edge.css('background','#02cc08');bar.css('background','#02cc08');break; 
            case "7":case "8": t.css('transform','scale(1.1)');bar_edge.css('background','#00c106');bar.css('background','#00c106');break;
            case "3":case "4": t.css('transform','scale(1.3)');bar_edge.css('background','#00b706');bar.css('background','#00b706');break;  
        }  
    });
    
    $(document).on("change", ".SubTask_Weightage", function() {
        var sum = 0;var limit = 100;
        $(".SubTask_Weightage").each(function(){
            sum += +$(this).val();
        });
        if(sum>limit){ $(this).val('');$(this).focus(); swal('The Total Weightage Should be 100!')} console.log(sum);
    });

    var globalRDSubs;
    $(document).on('click','#Add_R_D',function(){
        $('#R_D_Modal').modal('show');
        $.getJSON(urlRoot+'subtasks/?isExternal=false',function(data){
            globalRDSubs = data;
            $('.R_D_rows').empty();
            for(var i=0;i<data.length;i++){
                $('.R_D_rows').append(`
                    <tr>
                        <td>
                            <label class="checkbox m-l-15">
                            <input subid="${data[i].id}" type='checkbox' name="SChecked" class='check_Subs'><i class='rounded-x m-l-10'></i>
                            </label>
                        </td>
                        <td>${data[i].title}</td>
                    </tr>
                `);
            }
        });
        $(document).on('click','#R_DWork',function(){
            var RDsubs=[];
            $('.R_D_rows').find('tr').each(function(){
                if($(this).find('input').is(':checked') == true){
                    RDsubs.push($(this).find('input').attr('subid'));
                }
            });
            for(var i=0;i<RDsubs.length;i++){
                var ChangeSub = globalRDSubs.find(function(s){return s.id == RDsubs[i]})
                var subtask = {
                    "title": ChangeSub.title,
                    "task": tid,
                    "assignee": ChangeSub.assignee,
                }
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+"subtasks/"+ChangeSub.id+'/',
                    datatype:'JSON',
                    type:'PUT',
                    headers: {
                        "X-CSRFToken": csrftoken,
                        "content-type": "application/json",
                        "cache-control": "no-cache"
                    },
                    processData: false,
                    data:JSON.stringify(subtask),
                    success:function(){
                        console.log('subtasks updated');
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }

                });

            }
            $('#R_D_Modal').modal('show');
        });
    });

    function fillSubTask(tid){
        $.getJSON(urlRoot+'/subtasks/?task='+tid,function(data){
            
            var stasksIDs = [];
            stasksIDs = data.map(a => a.id);
            var datetime;
            // $('#subTaskTable .new').not('.new:first').empty();
            for(var i=0; i < stasksIDs.length; i++){
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
                        $('#subTaskTable .new:last .SubTask_Deadline_Time').val(datetime[1].slice(0,-4));
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
                        $('#subTaskTable .new .SubTask_Deadline_Time').val(datetime[1].slice(0,-4));
                        $('#subTaskTable .new .SubTask_Assignee').val(multistasks.assignee).trigger('change');
                        $('#subTaskTable .new .SubTask_Weightage').val(multistasks.weightage);
                        $('#subTaskTable .new .SubTask_perCompleted').val(multistasks.completed);
                        $('#subTaskTable .new .SubTask_Status').val(multistasks.status).trigger('change');
                    });
                }
            }
            $('#SelectAssignee').select2({
                dropdownParent: $('#AssigneeTransferModal')
            })
        });
    }

    function createStasks(tiD, transferred, assig){
        var subTasks = [];
        var subTask = {};
        $('#subTaskTable .new').each(function(index){
            subTask = new Object();
            subTask.title = $(this).find('.SubTask_name').val();
            subTask.task = tiD;
            subTask.duration = $(this).find('.SubTask_duration').val();
            subTask.deadline = getFormateDateToServer($(this).find('.SubTask_Deadline_Date').val())+'T'+$(this).find('.SubTask_Deadline_Time').val()+':00Z';
            subTask.assignee = $(this).find('.SubTask_Assignee').val();
            subTask.weightage = $(this).find('.SubTask_Weightage').val()?$(this).find('.SubTask_Weightage').val():0;
            subTask.completed = $(this).find('.SubTask_perCompleted').val()?$(this).find('.SubTask_perCompleted').val():0;
            subTask.status = $(this).find('.SubTask_Status').val();
            if(transferred == subTask.title){
                subTask.isTransferred = true;
                subTask.transferredTo = assig;
            }
            // subTasks.push(subTask);
            var subtaskJSON = JSON.stringify(subTask);
            subTaskID = $(this).attr('id');
            console.log('subtask'+subtaskJSON);
            if(!subTaskID){
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'subtasks/',
                    datatype:'JSON',
                    type:'POST',
                    headers: {
                        "X-CSRFToken": csrftoken,
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
                        console.log(error.responseText);
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
                        console.log(error.responseText);
                    }
                });
            }
        });
    }
    ///////////////////////////////////////////////// Prefilled Data /////////////////////////////////////////////
    
      $.ajax({
          async:false,
          url:urlRoot+'common/form-data',
          type:'GET',
          datatype:'JSON',
          success:function(data){
            for (var i = 0; i < data.services.length; i++) {
                $('#taskService').append('<option value='+data.services[i].id+'>'+data.services[i].service+'</option>');
            }
            for (var i = 0; i < data.task_status.length; i++) {
                $('.SubTask_Status').append('<option value='+data.task_status[i].id+'>'+data.task_status[i].status+'</option>');
                $('#taskStatus').append('<option value='+data.task_status[i].id+'>'+data.task_status[i].status+'</option>');
            }
          }
      })
      $.ajax({
          async:false,
          url:urlRoot+'clients/allclients/',
          type:'GET',
          datatype:'JSON',
          success:function(data){
            for (var i = 0; i < data.length; i++) {
                $('#taskClients').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
          }
      })
      $.ajax({
          async:false,
          url:urlRoot+'tasks/proposals/',
          type:'GET',
          datatype:'JSON',
          success:function(data){
            for (var i = 0; i < data.length; i++) {
                $('#taskProposal').append('<option value='+data[i].id+'>'+data[i].proposalNumber+'</option>');
            }
          }
      })
      
        var emp='';
      $.ajax({
          async:false,
          url:urlRoot+'employees/',
          type:'GET',
          datatype:'JSON',
          success:function(data){
            for (var i = 0; i < data.length; i++) {
                $('#taskController').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
            for (var i = 0; i < data.length; i++) {
                $('#taskApprover').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
            emp=data;
            fillAssignee();
          }
      })

    // $.getJSON(urlRoot+'common/form-data',function(data){
        
    // });

    // $.getJSON(,function(data){
        
    // });

    // $.getJSON(,function(data){
        
    // });
    // $.getJSON(,function(data){
        
    // });

    function fillAssignee(){
        for (var i = 0; i < emp.length; i++) {
            $('.SubTask_Assignee').append('<option value='+emp[i].id+'>'+emp[i].name+'</option>');
            $('#SelectAssignee').append('<option value='+emp[i].id+'>'+emp[i].name+'</option>');
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
            for(var i=0; i < templates.length; i++){
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
                $('#Add_R_D').removeClass('hide');
            }
            $('#taskTitle').val(data.title);
            $('#taskClients').val(data.client).trigger('change');
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
            if(data.adminCost||data.employeeCost||data.outOfPocket){
                var cost = data.adminCost + data.employeeCost + data.outOfPocket;
                $('#taskCost').val(cost);
            }
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
            tasksData.startTime = getFormateDateToServer($('#taskSdate').val()) +'T'+ $('#taskStime').val()+':00Z';
            tasksData.endTime = getFormateDateToServer($('#taskEdate').val()) +'T'+ $('#taskEtime').val()+':00Z';
            tasksData.duration = $('#taskDuration').val();
            tasksData.statutoryDueDate = getFormateDateToServer($('#taskStats').val()) + 'T04:13:13Z';
            // tasksData.document
            
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
                        if(transferredTo){
                            createStasks(data.id,transferredTo,assig);
                        }else{
                            createStasks(data.id);
                        }
                    },
                    error:function(error){
                        swal(error.responseText);
                    }
                });
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
                        if(transferredTo){
                            // var urL = 'tasks_Form.html?tid=' + data.tid; 
                            createStasks(data.id,transferredTo,assig);
                            swal('Updated and transferred');
                            // $(location).attr('href',urL);
                        }else{
                            createStasks(data.id);
                        }
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
});