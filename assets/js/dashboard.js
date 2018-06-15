$(document).ready(function(){
    var stopwatch=new Map();
    var time=new Map();
    $("#that").html("HERE");
    $("#this").html("Try2");
    // stopwatch.set('abc',new Stopwatch(109550000));
    // stopwatch.set('xyz',new Stopwatch(3600000));
	var taskscomplete=0;
    var actualtimespent=0;
    var taskassigned=0;
    var eventarr= new Array();
    var empid=1;
    datetime();
    //formdata
    $.ajax({
        async: true,
        crossDomain:true,
        url: urlRoot+'common/form-data',
        type:'GET',
        datatype:'JSON',
        headers:{
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken,
            "Authorization":"Bearer"+localStorage.getItem('token'),
        },
        success:function(data){
            var xtraworkcategory=data.extra_work_categories;
            $(xtraworkcategory).each(function(i,val){
                $('.xtracategory').append(`<option value="${xtraworkcategory[i].id}">${xtraworkcategory[i].category}</option>`)
            });
        },
        error:function(error){
            console.log(error.responseText);
            swal("Could not load Please Reload.")
        }
    })
    //formdata
    // console.log("TOKEN: ");
    // $.ajax({
    //     async: true,
    //     crossDomain:true,
    //     url:'http://35.202.86.61/office-management/users',
    //     type:'GET',
    //     datatype:'JSON',
    //     headers:{
    //         "content-type": "application/json",
    //         "cache-control": "no-cache",
    //         "X-CSRFToken":csrftoken,
    //         "Authorization":"Bearer"+localStorage.getItem('token'),
    //     },
    //     success:function(data){
    //         console.log("Users: "+data);
    //     },
    //     error:function(error){
    //         console.log(error.responseText);
    //     }
    // });
    //EMPLIST-----------------
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'employees/?manager='+empid,
            type:'GET',
            datatype:'JSON',
            headers:{
                "Authorization": "Bearer "+localStorage.getItem('token'),
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(emplist){
                console.log(emplist);
                var empdis='';
                var no='Not in records';
                $(emplist).each(function(i,val){
                    var email=emplist[i].email?emplist[i].email:'Not in records';
                    var phone=emplist[i].phone?emplist[i].phone:'Not in records';
                    var gen='';
                    if(emplist[i].title==1){
                        gen='man';
                    }
                    if(emplist[i].title==2){
                        gen='woman';
                    }
                    empdis+=`<div class="panel panel-default m-t-5 p-0">
                                <div class="panel-body p-10">
                                    <div class="row" style="line-height:30px; vertical-align:middle">
                                        <div class="col-sm-4">
                                            <label class="col-sm-2 input p-l-8" style="font-size:30px;">
                                                <i class="linear-icons li icon-`+gen+` p-0 m-0" aria-hidden="true" ></i> 
                                            </label>
                                            <div class="col-sm-10">
                                            `+emplist[i].name+`(`+emplist[i].designation+`)
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="input"><span class="glyphicon glyphicon-envelope"></span></label>
                                             `+email+`
                                        </div>
                                        <div class="col-sm-2">
                                            <label class="input"><span class="glyphicon glyphicon-earphone"></span></label>
                                             `+phone+`
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                });
                $('#replist').html(empdis);
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
        //EMPLISTENDS--------------
    //noteslist view call------
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'widgets/note/'+empid+'/',
        type:'GET',
        datatype:'JSON',
        headers:{
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken
        },
        success:function(notes){
            if(notes){  
                var noter=notes.content;
                $('#notearea').val(noter);
                $('.notesave').attr('id',notes.id+'Tnoteid');
            }
        },
        error:function(error){
            console.log(error.responseText);
        }
    });
    //noteslist view call---------
    //notes add edit----------
        $(document).on('click','.notesave',function(){
            var req="POST";
            var urlf=urlRoot+'widgets/note/';
            var notesidd=$(this).attr('id');
            var emp=1;
            var ntext=$('#notearea').val();
            var data=new Object();
            data.content=ntext;
            data.employee=emp;
            if(notesidd){
                urlf=urlf+empid+'/';
                req="PUT";
            }
            note=JSON.stringify(data);
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlf,
                type:req,
                datatype:'JSON',
                data:note,
                headers:{
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "X-CSRFToken":csrftoken
                },
                success:function(){
                    swal('Notes Updated');
                    //areaLoader(notes);
                }
            });
        });
    //notes add edit ends-----

    //noteslist calls ends---------------------------


    //todolist calls start----------------------------
    
    
    //FUNCTION todo adder-------
    function todoAdder(todoitem){
        var tdlist='';
        if(todoitem.status=='P'){
            tdlist+=`
                        <li class="list-group-item p-5 m-0" style="border-bottom:1px solid #ccc">
                            <div class="content row p-0">
                                <div class="col-sm-2">
                                    <input type="checkbox" class="checkbox todocomp dashcheck" id="`+todoitem.id+`Tcompc" name="checkbox" title="Mark Complete">
                                </div>
                                <div class="col-sm-8">
                                    <div class="name">`+todoitem.note+`</div>
                                </div>
                                <div class="col-sm-2" style="float:right">
                                    <!--button type="button" class="btn btn-info btn-raised edittodo dashbutton" id="`+todoitem.id+`Tedit" title="Edit ToDo Item">
                                        <span class="icon icon-pencil add-new"></span>
                                    </button-->
                                    <button type="button" class="btn btn-pinterest btn-raised rippler deltodo dashbutton" id="`+todoitem.id+`Tedit" title="Delete ToDo Item">
                                        <i class="fa fa-close"></i>
                                    </button>
                                </div>
                            </div>
                        </li>`
            }
            else{
                if(todoitem.status=='C'){
                    tdlist+=`    
                                <li class="list-group-item p-5 m-0" style="border-bottom:1px solid #ccc">    
                                    <div class="content row p-0">
                                        <div class="col-sm-2">
                                            <input type="checkbox" class="checkbox todocomp dashcheck" id="`+todoitem.id+`Tcompc" name="checkbox" checked="" title="Mark Pending">
                                        </div>
                                        <div class="col-sm-8">
                                        <s>    
                                            <div class="name">`+todoitem.note+`</div>
                                        </s>
                                        </div>
                                        <div class="col-sm-2" style="float:right">
                                            <!--button type="button" class="btn btn-info btn-flat edittodo dashbutton" id="`+todoitem.id+`Tedit" title="Edit ToDo Item">
                                                <span class="icon icon-pencil add-new"></span>
                                            </button-->
                                            <button type="button" class="btn btn-pinterest btn-raised rippler deltodo dashbutton" id="`+todoitem.id+`Tedit" title="Delete ToDo Item">
                                                <i class="fa fa-close"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>`
                }
            }
            return tdlist;
    }
    //--------------------------
    //todolist add--------------        
    $(document).on('click','.savetodo',function(){
        var note,status,date,time,subtask;
        if((a=$('#todonote').val())!='')
            note=a;
        else{
            swal('Fill Notes Section');
            return false;
        }
        if((a=$('.subtaskstatus').val())!='')
            status=a;
        else{
            swal('Status Section');
            return false;
        }
        if((a=$('.TodoDate').val())!='')
            date=a;
        else{
            swal('Select Date');
            return false;
        }
        if((a=$('.TodoTime').val())!='')
            time=a+':00Z';
        else{
            swal('Select Date');
            return false;
        }
        if((a=$('#subtasklistask').val())!='')
            subtask=a;
        else{
            subtask=null;
        }
        var todobj=new Object();
        todobj.note=note;
        todobj.status=status;
        todobj.date=getFormateDateToServer(date);
        todobj.time=time;
        todobj.employee=empid;
        todobj.sub_task=subtask; 
        var tododata=JSON.stringify(todobj);
        console.log('JSON '+tododata);
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'widgets/todo-list/',
            type:'POST',
            datatype:'JSON',
            data:tododata,
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            success:function(todolist){
                var tdlist='';
                tdlist+=todoAdder(todolist);
                $('#todoli').append(tdlist);
                $('#todoform').trigger("reset");
                $('#modal-responsive').modal('hide');
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
    //todolist add ends---------
    //todolist view-------------
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'widgets/todo-list/?employee-id='+empid,
            type:'GET',
            datatype:'JSON',
            headers:{
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(todolist){
                var tdlist='';
                if(todolist){
                    $(todolist).each(function(i,val){
                        tdlist+=todoAdder(todolist[i]);
                    });
                    $('#todoli').html(tdlist);
                }
            },
            error:function(error){
                console.log(error.responseText)
            }
        });
    //todolist view-------------
    //todolist edit-------------
    $(document).on('change','.todocomp',function(){
        console.log($(this).attr('id'));
        var cid=$(this).attr('id');
        var id=cid.split('T')[0];
        var stats='';
        
        if($(this).is(":checked")){
            stats='C';
            $(this).attr('title','Mark Pending');
            $(this).parent().parent().find('.name').wrap('<s/>');
        }
        else{
            $(this).attr('title','Mark Complete');
            $(this).parent().parent().find('.name').unwrap();
            stats='P';
        }
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'widgets/todo-list/'+id+'/',
            type:'GET',
            datatype:'JSON',
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(todolist){
                todolist.status=stats;
                var todoupd=JSON.stringify(todolist);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'widgets/todo-list/'+id+'/',
                    type:'PUT',
                    datatype:'JSON',
                    data:todoupd,
                    headers:{
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "X-CSRFToken":csrftoken
                    },
                    success:function(todolist){
                        swal("To-Do Element Updated");
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }
                }); 
            },
            error:function(error){
                console.log(error.responseText);
            }
        });             
    });
    //todolist edit ends--------
    //todolist delete-----------
        $(document).on('click','.deltodo',function(){
            var btnid=$(this).attr('id');
            var id=$(this).attr('id').split("T")[0];
            
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'widgets/todo-list/'+id+'/',
                type:'DELETE',
                datatype:'JSON',
                headers:{
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "X-CSRFToken":csrftoken
                },
                success:function(todolist){
                    $('#'+btnid).parent().parent().parent().remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        })
    //todolist delete-----------

    //todolist calls ends------------------------------
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'employees/'+empid+'/',
        type:'GET',
        datatype:'JSON',
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken,
            "Authorization": "Bearer "+localStorage.getItem('token'),
        },
        success:function(emp){
            //console.log('emp: '+emp);
            var eff=emp.efficiency?emp.efficiency:0;
            var prod=emp.productivity?emp.productivity:0;
            // // eff=110;
            // if(eff>=90&&eff<110)
            // //     $('.variant-2').addClass('color-2');
            // if(eff<90)
            //     $('.variant-2').addClass('color-3');
            // if(eff>=110)
            //     $('.variant-2').addClass('color-4');
            var srev=emp.self_revenue?emp.self_revenue:0;
            var trev=emp.team_revenue?emp.team_revenue:0;
            $('#selfrev').html(srev);
            $('#teamrev').html(trev);
            $('#empcode').html(emp.code);
            $('#empeff').html('<h4>'+eff+'</h4>');
            $('#empprod').html('<h4>'+prod+'</h4>');
        }
    });
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'tasks/?assignee='+empid,
        type:'GET',
        datatype:'JSON',
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken
        },
        success:function(data){
            var tasktxt='';
            $(data).each(function(i,val){
                if(i<5){
                    $('#tass').html(i+1);
                    var startt=data[i].startTime.split("T")[0];
                    var endt=data[i].endTime.split("T")[0];
                    var id=data[i].id;
                    if(i<5)
                        eventarr.push({title:data[i].title,start:startt,end:endt});
                    var color='';
                    var complete=data[i].completed;
                    if(complete<10){
                        color='red';
                    }
                    if(complete>=100){
                        taskscomplete++;
                        color='green';
                    }
                    tasktxt+=   `
                                <div class="panel panel-default m-t-5" style="border-radius:0px">
                                    <div class="panel-heading" style="padding: 0px;">
                                        <h4 class="panel-title">
                                            <div class="m-l-30 p-t-10">`+data[i].title+`</div>
                                            <a class="collapsed" style="" data-toggle="collapse" data-parent="#accordion" href="#`+data[i].id+`" aria-expanded="false" class="collapsed">
                                                <div class="progress p-0 m-0" style="height:30px;">   
                                                    <div class="progress-bar progress-bar-striped active" id="`+data[i].id+`tskprg" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+complete+`%; height:50px;color:#A9A9A9;background-color:`+color+`"></div>
                                                    <div class="m-5" style=font-size:20px;vertical-align: middle; line-height:10px;" id="`+data[i].id+`tprg">`+complete+`% </div>
                                                </div>
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="`+data[i].id+`" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                        <h4 class="panel-title p-t-5 p-l-20 p-r-10"> Subtasks: </h4>   
                                        <div class="panel-body"></div>
                                    </div>
                                </div>` 
                }
            });
            $('#taskaccordion').html(tasktxt);
            $('#tstats').html(taskscomplete);
            
            $.ajax({
                crossDomain: true,
                url:urlRoot+'subtasks/?assignee='+empid,
                type:'GET',
                datatype:'JSON',
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "X-CSRFToken":csrftoken
                },
                success:function(data){
                    $(data).each(function(i,val){
                        
                        loadSubtask(data[i]);
                        
                        //$(subtid).append(subtaskstxt);
                      });
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
            console.log(eventarr);
            $('#calendar').fullCalendar({
                defaultDate: '2018-03-12',
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events:eventarr,
                aspectRatio: 2,
                contentHeight: 500,
              });
              $('#calendar').fullCalendar('today');
        },
        error:function(error){
            console.log(error.responseText);
        }
    }); 
    //sbt completion change form open call starts------
    function loadSubtask(subtask){
        var actime=0;
        actime=parseFloat(subtask.actual_time);
        console.log(subtask.title+": "+actime);
        if(actime)
            actualtimespent+=actime;
        $('#tatime').html(actualtimespent);
        var subcolor='';
        var bcolor='';
        var eff=subtask.efficiency;
        var subcomplete=subtask.completed;
        if(subcomplete<10){
            subcolor='red';
        }
        else{
            if(subcomplete>=100){
            subcolor='green';
            }
        }
        if(eff>0.9 && eff<1.1){
            bcolor='warning';
        }
        else{
            if(eff<0.9){
                bcolor='success';
            }
            else{
                if(eff>1.1){
                    bcolor='danger';
                }
            }
        }
        var subtaskstxt=`<div class="subtask m-t-5" style="border-radius:0px;border-bottom:1px solid #ccc" id="`+subtask.id+`subt">
                            <div class="row">
                                <div class="col-sm-2">
                                    <h5>`+subtask.title+`</h5>
                                </div>
                                <div class="col-sm-6" id="`+subtask.id+`progress">
                                    <div class="progress m-t-10" style="height:20px; -moz-box-shadow: 10px 3px 5px 6px #ccc;-webkit-box-shadow: 10px 3px 5px 6px #ccc;box-shadow: 10px 3px 5px 6px #ccc;">   
                                        <div class="progress-bar progress-bar-striped active" id="`+subtask.id+`takewid" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+subcomplete+`%; height:25px;color:#A9A9A9;background-color:`+subcolor+`">
                                            <div class="subcomplete m-t-5" style=font-size:10px;vertical-align: middle;">
                                                `+subcomplete+`% 
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                                <div class="col-sm-4" id="sbtbtnarea">
                                    <div class="m-t-5" style="">`
                                    if(subcomplete>=100){
                                        subtaskstxt+=`
                                                        <button type="button" disabled="true" class="btn btn-vimeo btn-raised rippler changecomp dashbutton" id="`+subtask.id+`Tcomplete" title="Max Progress Reached">
                                                            <i class="icon icon-percent" aria-hidden="true"></i>
                                                        </button>
                                                    `
                                    }
                                    else{
                                        subtaskstxt+=`
                                                        <button type="button" class="btn btn-vimeo btn-raised rippler changecomp dashbutton" id="`+subtask.id+`Tcomplete" title="Update Progress">
                                                            <i class="icon icon-percent" aria-hidden="true"></i>
                                                        </button>
                                                    `
                                    }    
                            subtaskstxt+= `<input type="number" style="height:35px;width:150px" step=".01" value=${subcomplete} id="${subtask.id}Tprogtxt" class=" hide" placeholder="% Completed" max="100" min="0">
                                            <button type="button" class="btn btn-success btn-flat sbtsave rippler hide dashbutton" id="`+subtask.id+`Tsave" title="Save Changes">
                                                <i class="fa fa-save"></i>
                                            </button>
                                            <button type="button" class="btn btn-openid btn-raised rippler timerss dashbutton" id="`+subtask.id+`Tsimer" title="Start Timer">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            </button>
                                            <button type="button" class="btn btn-openid btn-raised rippler timersend dashbutton hide" id="`+subtask.id+`Tsimer" title="Remove Timer">
                                                <i class="linear-icons li icon-timer-crossed" aria-hidden="true"></i>
                                            </button>
                                            <a href="Tasks_Form.html?tid=`+subtask.task+`" type="button" class="btn btn-adn btn-raised rippler viewsbt dashbutton" id="`+subtask.id+`Tview" title="View Details" style="vertical-align:middle">
                                                <i class="font-awesome fa fa-eye m-t-6" aria-hidden="true"></i>
                                            </a>
                                            <button type="button" class="btn btn-linkedin btn-raised rippler todobtn dashbutton" id="`+subtask.id+`TAdd" title="Add to todo-list" data-toggle="modal" data-target="#modal-responsive">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                            <button type="button" class="btn btn-bitbucket btn-raised rippler xtrabtn dashbutton" id="`+subtask.id+`TAdd" title="Add Some Extra Work" data-toggle="modal" data-target="#modalextra">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                            <button type="button" class="btn btn-pinterest btn-raised rippler delsbt dashbutton" id="`+subtask.id+`Tdelete" title="Delete Subtask">
                                                <i class="fa fa-close"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
        `;
        //var subtid='#'+data[i].task+' .panel-body';
        $('#'+subtask.task).find('.panel-body').append(subtaskstxt);
        $('.SubTask_list').append('<option value="'+subtask.id+'">'+subtask.title+'</option>');
        
    }
    //loadsubtask end---------------

    $(document).on('click','.todobtn',function(){
        $('#todoform').trigger("reset");
        var subid=$(this).attr('id').split('T')[0];
        $('.SubTask_list').val(subid+'Tsubt').trigger('change');
    });
    //clock ends starts--------
    //clocks start end---------
    $(document).on('click','.timersend',function(){
        $(this).addClass('hide');
        $(this).siblings('.timerss').removeClass('hide');
        var subid=$(this).attr('id').split('T')[0];
        var rmv='#'+subid+'clocker';
        var watchid=$(rmv).find('.start').attr('id');
        console.log("Timerid: "+watchid);
        console.log('Removing '+rmv);
        if(stopwatch.get(watchid).running);
            stopwatch.get(watchid).pause();
            var timespent= parseFloat(Math.round(stopwatch.get(watchid).getElapsed()/3600000 *100) / 100);
            stopwatch.get(watchid).stop();
        
        if(timespent>0.00){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'subtasks/'+subid+'/',
                type:'GET',
                datatype:'JSON',
                headers:{
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "X-CSRFToken":csrftoken
                },
                success:function(subtask){
                    if(parseFloat(subtask.actual_time))
                        subtask.actual_time=parseFloat(subtask.actual_time)+timespent;
                    else
                        subtask.actual_time=timespent;
                    var updstask=JSON.stringify(subtask);
                    $.ajax({
                        async: true,
                        crossDomain: true,
                        url:urlRoot+'subtasks/'+subid+'/',
                        type:'PUT',
                        datatype:'JSON',
                        data:updstask,
                        headers:{
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "X-CSRFToken":csrftoken
                        },
                        success:function(subtask){ 
                            swal('Updated Subtask:'+subtask.title);
                        },
                        error:function(error){
                            console.log(error.responseText);
                        }
                    });
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        }
        $(rmv).remove();
    });
    //clock call starts--------
    $(document).on('click','.closeme',function(){
        var subid=$(this).attr('id').split('__')[1];
        var watchid=$(this).attr('id');
        console.log("Timerid: "+watchid);
        if(stopwatch.get(watchid).running);
            stopwatch.get(watchid).pause();
        var timespent= parseFloat(Math.round(stopwatch.get(watchid).getElapsed()/3600000 *100) / 100);
        stopwatch.get(watchid).stop();
        
        if(timespent>0.00){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'subtasks/'+subid+'/',
                type:'GET',
                datatype:'JSON',
                headers:{
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "X-CSRFToken":csrftoken
                },
                success:function(subtask){
                    if(parseFloat(subtask.actual_time))
                        subtask.actual_time=parseFloat(subtask.actual_time)+timespent;
                    else
                        subtask.actual_time=timespent;
                    var updstask=JSON.stringify(subtask);
                    $.ajax({
                        async: true,
                        crossDomain: true,
                        url:urlRoot+'subtasks/'+subid+'/',
                        type:'PUT',
                        datatype:'JSON',
                        data:updstask,
                        headers:{
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                            "X-CSRFToken":csrftoken
                        },
                        success:function(subtask){ 
                            swal('Updated Subtask:'+subtask.title);
                        },
                        error:function(error){
                            console.log(error.responseText);
                        }
                    });
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        }
        $(this).parent().parent().parent().parent().remove();
    });
    $(document).on('click','.timerss',function(){
        var subid=$(this).attr('id').split('T')[0];
        $(this).addClass('hide');
        $(this).siblings('.timersend').removeClass('hide');
        $.ajax({
            crossDomain: true,
            url:urlRoot+'subtasks/'+subid,
            type:'GET',
            datatype:'JSON',
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(subtask){
                var sbtitle=subtask.title;
                if(sbtitle.length>10){
                    console.log('Greater than 10');
                    sbtitle=sbtitle.slice(0,9)+'...';
                }
                var clock= `<li class="p-0 m-t-6 watch ${subtask.title}__${subtask.id}" id="${subtask.id}clocker">
                                <div class="stopwatch" title="${subtask.title}_#${subtask.id}">
                                    <div class="row">
                                        <div class="col-sm-8 p-0" style="overflow:hidden">
                                            <label class="task">${sbtitle}</label>
                                        </div>
                                        <div class="col-sm-3 p-0">
                                            <buton type="link" type="link" class="btn btn-link p-0 closeme" id="${subtask.title}__${subtask.id}" title="Remove Timer">
                                                <i class="linear-icons li icon-cross-square" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-8 p-r-0">
                                            <label class="time" id="${subtask.title}__${subtask.id}time"></label>
                                        </div>
                                        <div class="col-sm-1 p-r-0 p-l-0">
                                            <button class="start" id="${subtask.title}__${subtask.id}" title="Start Timer">
                                                <span class="glyphicon glyphicon-play"></span>
                                            </button>
                                        </div>
                                        <div class="col-sm-1 p-l-5">
                                            <button class="pause" id="${subtask.title}__${subtask.id}" title="Stop Timer">
                                                <span class="glyphicon glyphicon-pause"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>`
                $('.watchrow').append(clock);
                time.set(subtask.title+'__'+subtask.id,document.querySelector('#'+subtask.title+'__'+subtask.id+'time'));
                stopwatch.set(subtask.title+'__'+subtask.id,new Stopwatch(0));    
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    })
    //clock call ends----------
    //sbt completion change form open call starts------
    $(document).on('click','.changecomp',function(){
        var stid=$(this).attr('id').split('T')[0];
        $('#'+stid+'Tprogtxt').removeClass('hide');
        $('#'+stid+'Tsave').removeClass('hide');
        $('#'+stid+'Tcomplete').addClass('hide');
    });
    //sbt completion change form open call ends------
    //sbt completion change call starts--------------
    $(document).on('click','.sbtsave',function(){
        var subtaid=$(this).attr('id').split("T")[0];
        $('#'+subtaid+'Tprogtxt').addClass('hide');
        $('#'+subtaid+'Tsave').addClass('hide');
        $('#'+subtaid+'Tcomplete').removeClass('hide');
        var newprg=$('#'+subtaid+'Tprogtxt').val();
        console.log(newprg);
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'subtasks/'+subtaid+'/',
            type:'GET',
            datatype:'JSON',
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(subtask){
                subtask.completed=newprg;
                if(parseFloat(newprg)<100)
                    subtask.status=2;
                if(parseFloat(newprg)==100)
                    subtask.status=3;
                subt=JSON.stringify(subtask);
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'subtasks/'+subtask.id+'/',
                    type:'PUT',
                    datatype:'JSON',
                    data:subt,
                    headers:{
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "X-CSRFToken":csrftoken
                    },
                    success:function(subtask){
                        $('#'+subtask.id+'takewid').css("width",subtask.completed+'%');
                        if(subtask.completed>=100){
                            $('#'+subtask.id+'takewid').css("background-color",'green');
                            $('#'+subtask.id+'Tcomplete').attr('disabled','true');
                            $('#'+subtask.id+'Tcomplete').attr('title','Max Progress Reached');

                        }
                        if(subtask.completed<10){
                            $('#'+subtask.id+'takewid').css("background-color",'red');

                        }
                        if(subtask.completed>=10 && subtask.completed<100){
                            $('#'+subtask.id+'takewid').css("background-color",'#fcc016');
                        }
                        $('#'+subtask.id+'subt').find('.subcomplete').html(subtask.completed+'%');
                        $('#'+subtask.id+'Tprogtxt').addClass('hide');
                        $('#'+subtask.id+'Tsave').addClass('hide');
                        $('#'+subtask.id+'Tcomplete').removeClass('hide');

                        $.ajax({
                            async: true,
                            crossDomain: true,
                            url:urlRoot+'tasks/'+subtask.task+'/',
                            type:'GET',
                            datatype:'JSON',
                            headers:{
                                "content-type": "application/json",
                                "cache-control": "no-cache",
                                "X-CSRFToken":csrftoken
                            },
                            success:function(task){
                                $('#'+task.id+'tskprg').css("width",task.completed+'%');
                                if(task.completed>=100){
                                    $('#'+task.id+'tskprg').css("background-color",'green');
                                }
                                if(task.completed<10){
                                    $('#'+task.id+'tskprg').css("background-color",'red');
                                }
                                if(task.completed>=10 && subtask.completed<100){
                                    $('#'+task.id+'tskprg').css("background-color",'#fcc016');
                                }
                                $('#'+task.id+'tprg').html(task.completed+'%');
                            },
                            error:function(error){
                                console.log(error.responseText);
                            }
                        });
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }
                });
            }
        });
    });
    //sbt completion change call ends----------------
    //delete subtask-------------------
    $(document).on('click','.delsbt',function(){
        var stid=$(this).attr('id').split('T')[0];
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'subtasks/'+stid+'/',
            type:'DELETE',
            datatype:'JSON',
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(){
                $('#'+stid+'subt').remove();
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
    $('#subtaskstatus').select2({
        dropdownParent: $('#modal-responsive')
    })
    $('#subtasklistask').select2({
        dropdownParent: $('#modal-responsive')
    })
    $('#xcat').select2({
        dropdownParent: $('#modalextra')
    })
    $('#subtasklistx').select2({
        dropdownParent: $('#modalextra')
    })
    
    //xtrawork function
    function loadXtra(work){
        var xtra=`
                    <li class="list-group-item p-5 m-0" style="border-bottom:1px solid #ccc">
                        <div class="content row p-0">
                            <div class="col-sm-4 m-l-5">
                                <label class="input m-t-5 m-l-5">${work.title}</label>
                            </div>
                            <div class="col-sm-3">
                                <label class="input m-t-5 m-l-5">${work.duration} Hours</label>
                            </div>
                            <div class="col-sm-2" style="float:right">
                                <button type="button" class="btn btn-pinterest btn-raised rippler delxtra dashbutton" id="${work.id}Tdelw" title="Delete ToDo Item">
                                    <i class="fa fa-close"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                `;
                $('#extrawork').append(xtra);
    };
    //xtrawork function
    //delxtra
    $(document).on('click','.delxtra',function(){
        var btnid=$(this).attr('id');
        var id=btnid.split('T')[0];
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'subtasks/extrawork/'+id+'/',
            type:'DELETE',
            datatype:'JSON',
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(){
                $('#'+btnid).parent().parent().parent().remove();
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
    //delxtra
    //addxtra
    $(document).on('click','.savextra',function(){
        var xtra=new Object();
        xtra.title=$('#titlex').val();
        xtra.subtask=$('#subtasklistx').val();
        xtra.duration=$('#xtradur').val();
        xtra.category=$('#xcat').val();
        var xtrawork=JSON.stringify(xtra);
        console.log("Xtra: "+xtrawork);
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'subtasks/extrawork/',
            type:'POST',
            datatype:'JSON',
            data:xtrawork,
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(extrawork){
                if(extrawork){
                    loadXtra(extrawork);
                    $('#xtraform').trigger("reset");
                    $('#modalxtra').modal('hide');
                }

            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
    //addxtra
    //xtrabtnadd
    $(document).on('click','.xtrabtn',function(){
        $('#xtraform').trigger("reset");
        var subid=$(this).attr('id').split('T')[0];
        $('.SubTask_list').val(subid+'Tsubt').trigger('change');
    });
    //xtratbnadd
    //xtrawork
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'subtasks/extrawork/',
        type:'GET',
        datatype:'JSON',
        headers:{
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken
        },
        success:function(xtra){
            if(xtra){
                $(xtra).each(function(i,val){
                    loadXtra(xtra[i]);
                });
            }
        },
        error:function(error){
            console.log(error.responseText);
        }
    });
    //
    //delete subtask ends--------------
        $(document).on('click','.start',function(){
            var id=$(this).attr('id')
            stopwatch.get(id).start();
        });
        $(document).on('click','.pause',function(){
            var id=$(this).attr('id');
            stopwatch.get(id).pause();
            
            console.log('TIME: '+stopwatch.get(id).getElapsed()/3600000);
            var timespent=parseFloat(Math.round(stopwatch.get(id).getElapsed()/3600000 *100) / 100);
            console.log(timespent + 'Hours');
            stopwatch.get(id).stop();
            var stid=id.split("__")[1];
            if(timespent>0.00){
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'subtasks/'+stid+'/',
                    type:'GET',
                    datatype:'JSON',
                    headers:{
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "X-CSRFToken":csrftoken
                    },
                    success:function(subtask){
                        if(parseFloat(subtask.actual_time))
                            subtask.actual_time=parseFloat(subtask.actual_time)+timespent;
                        else
                            subtask.actual_time=timespent;
                        var updstask=JSON.stringify(subtask);
                        $.ajax({
                            async: true,
                            crossDomain: true,
                            url:urlRoot+'subtasks/'+stid+'/',
                            type:'PUT',
                            datatype:'JSON',
                            data:updstask,
                            headers:{
                                "content-type": "application/json",
                                "cache-control": "no-cache",
                                "X-CSRFToken":csrftoken
                            },
                            success:function(subtask){ 
                                swal('Updated Subtask:'+subtask.title);
                            },
                            error:function(error){
                                console.log(error.responseText);
                            }
                        });
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }
                });
            }
        });
        setInterval(function() {
            time.forEach(function(value,key){
            value.innerHTML=stopwatch.get(key);
            });
        }, 1000);
});