$(document).ready(function(){
	var taskscomplete=0;
    var actualtimespent=0;
    var taskassigned=0;
    var eventarr= new Array();
    var empid=1;
    console.log("TOKEN: "+localStorage.getItem('token'));
    $.ajax({
        async: true,
        crossDomain:true,
        url:'http://35.202.86.61/office-management/users',
        type:'GET',
        datatype:'JSON',
        headers:{
            "Authorization": "Bearer "+localStorage.getItem('token'),
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken
        },
        success:function(data){
            console.log(data);
        }
    });

    //noteslist view call------
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'widgets/note/?employee-id='+empid,
        type:'GET',
        datatype:'JSON',
        headers:{
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken
        },
        success:function(notes){
            if(notes){  
                var noter=notes[0].content;
                $('#notearea').val(noter);
                $('.notesave').attr('id',notes.id)
            }
        },
        error:function(error){
            console.log(error.responseText)
        }
    });
    //noteslist view call---------
    //notes add edit----------
        $(document).on('click','.notesave',function(){
            var req="POST";
            var urlf=urlRoot+'widgets/note/?employee-id='+empid;
            var notesidd=$(this).attr('id');
            var emp=1;
            var ntext=$('#notearea').val();
            var data=new Object();
            data.content=ntext;
            data.employee=emp;
            if(notesidd){
                //edit request 
                data.id=notesid;
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
                    //areaLoader(notes);
                }
            });
        });
    //notes add edit ends-----
    // //notes clear starts------
    //     $(document).on('click','.delnotes',function(){
    //         var notesid=$(this).attr('id').split("-")[1];
    //         $.ajax({
    //             async: true,
    //             crossDomain: true,
    //             url:urlRoot+'widgets/notes/'+notesid,
    //             type:'DELETE',
    //             datatype:'JSON',
    //             headers:{
    //                 "content-type": "application/json",
    //                 "cache-control": "no-cache",
    //             },
    //             success:function(){
    //                 swal("Notes Cleared");
    //                 location.reload();
    //             }
    //         });
    //     });      
    //notes clear ends--------
    //noteslist calls starts---------------------------
    //todolist calls starts----------------------------
    
    //todolist add--------------        
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'widgets/todo-list/',
            type:'POST',
            datatype:'JSON',
            headers:{
                "content-type": "application/json",
                "cache-control": "no-cache",
                "X-CSRFToken":csrftoken
            },
            success:function(todolist){

            },
            error:function(error){

            }
        })
    //todolist add--------------
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
                        if(todolist[i].status=='P'){
                            tdlist+=`
                                        <li class="list-group-item p-5 m-0" style="border-bottom:1px solid #ccc">
                                            <div class="content row p-0">
                                                <div class="col-sm-2">
                                                    <input type="checkbox" class="checkbox todocomp dashcheck" name="checkbox" title="Mark Complete">
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="name">`+todolist[i].note+`</div>
                                                    <!--div class="description">
                                                        Status: `+todolist[i].status+`
                                                    </div-->
                                                    <!--div class="right-actions" title="subtask">
                                                        <span class="badge badge-info">`+todolist[i].sub_task+`</span>
                                                    </div-->
                                                </div>
                                                <div class="col-sm-4" style="float:right">
                                                    <button type="button" class="btn btn-info btn-flat edittodo dashbutton" id="`+todolist[i].id+`Tedit" title="Edit ToDo Item">
                                                        <span class="icon icon-pencil add-new"></span>
                                                    </button>
                                                    <button type="button" class="btn btn-danger btn-flat deltodo dashbutton" id="`+todolist[i].id+`Tedit" title="Delete ToDo Item">
                                                        <i class="fa fa-close"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>`
                            }
                            else{
                                if(todolist[i].status=='C'){
                                    tdlist+=`    
                                                <li class="list-group-item p-5 m-0" style="border-bottom:1px solid #ccc">    
                                                    <div class="content row p-0">
                                                        <div class="col-sm-2">
                                                            <input type="checkbox" class="checkbox todocomp dashcheck" id="`+todolist[i].id+`Tcompc" name="checkbox" checked="" title="Mark Complete">
                                                        </div>
                                                        <div class="col-sm-6">
                                                        <s>    
                                                        <div class="name">`+todolist[i].note+`</div>
                                                            </s>
                                                            <!--div class="description">
                                                                Status: `+todolist[i].status+`
                                                            </div-->
                                                            <!--div class="right-actions" title="subtask">
                                                                <span class="badge badge-info">`+todolist[i].sub_task+`</span>
                                                            </div-->
                                                        </div>
                                                        <div class="col-sm-4" style="float:right">
                                                            <!--button type="button" class="btn btn-info btn-flat edittodo dashbutton" id="`+todolist[i].id+`Tedit" title="Edit ToDo Item">
                                                                <span class="icon icon-pencil add-new"></span>
                                                            </button-->
                                                            <button type="button" class="btn btn-danger btn-flat deltodo dashbutton" id="`+todolist[i].id+`Tedit" title="Delete ToDo Item">
                                                                <i class="fa fa-close"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>`
                                }
                            }
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
        var id=$(this).attr('id').split('T')[0];
        var stats='';
        
        if($(this).is(":checked")){
            stats='C';
            $(this).parent().parent().find('.name').wrap('<s/>')
        }
        else
            stats='P';
            $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'widgets/tod-list/'+id+'/',
                    type:'PUT',
                    datatype:'JSON',
                    data:stats,
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
        
    });
    //todolist edit ends--------
    //todolist delete-----------
        $(document).on('click','.deltodo',function(){
            var id=$(this).attr('id').split("T")[0];
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'widgets/tod-list/'+id+'/',
                type:'DELETE',
                datatype:'JSON',
                headers:{
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "X-CSRFToken":csrftoken
                },
                success:function(todolist){
                    swal("To-Do Element Deleted");
                    location.reload();
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
        url:urlRoot+'employees/'+1+'/',
        type:'GET',
        datatype:'JSON',
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "X-CSRFToken":csrftoken
        },
        success:function(emp){
            //console.log('emp: '+emp);
            var eff=emp.efficiency;
            // // eff=110;
            // if(eff>=90&&eff<110)
            // //     $('.variant-2').addClass('color-2');
            // if(eff<90)
            //     $('.variant-2').addClass('color-3');
            // if(eff>=110)
            //     $('.variant-2').addClass('color-4');
            $('#empcode').html(emp.code);
            $('#empeff').html(eff);
        }
    });
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'tasks/?assignee='+1,
        type:'GET',
        datatype:'JSON',
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
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
                                                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+complete+`%; height:50px;color:#A9A9A9;background-color:`+color+`"></div>
                                                    <div class="m-5" style=font-size:20px;vertical-align: middle; line-height:10px;">`+complete+`% </div>
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
                url:urlRoot+'subtasks/?assignee='+1,
                type:'GET',
                datatype:'JSON',
                headers: {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                },
                success:function(data){
                    $(data).each(function(i,val){
                        loadSubtask(data[i]);
                        actualtimespent+=data[i].actualtime?data[i].actualtime:0;
                        $('#tatime').html(actualtimespent);
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
                                <div class="col-sm-2 m-l-5">
                                    <h5>`+subtask.title+`</h5>
                                </div>
                                <div class="col-sm-3" id="`+subtask.id+`progress">
                                    <div class="progress m-t-10" style="height:20px; -moz-box-shadow: 10px 3px 5px 6px #ccc;-webkit-box-shadow: 10px 3px 5px 6px #ccc;box-shadow: 10px 3px 5px 6px #ccc;">   
                                        <div class="progress-bar progress-bar-striped active" id="`+subtask.id+`takewid" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+subcomplete+`%; height:25px;color:#A9A9A9;background-color:`+subcolor+`">
                                            <div class="subcomplete m-t-5" style=font-size:10px;vertical-align: middle;">
                                                `+subcomplete+`% 
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                                <div class="col-sm-6" id="sbtbtnarea">
                                    <div class="m-5" style="">
                                        <button type="button" class="btn btn-info btn-raised rippler changecomp dashbutton" id="`+subtask.id+`Tcomplete" title="Change Percntage">
                                            <i class="icon icon-percent" aria-hidden="true"></i>
                                        </button>
                                            <input type="number" style="height:35px;width:150px"  step=".01" id="`+subtask.id+`Tprogtxt" class=" hide" placeholder="% Completed" max="100" min="0">
                                        <button type="button" class="btn btn-success btn-raised sbtsave rippler hide dashbutton" id="`+subtask.id+`Tsave" title="Save Changes">
                                            <i class="fa fa-save"></i>
                                        </button>
                                        <button type="button" class="btn btn-warning btn-raised rippler timerss dashbutton" id="`+subtask.id+`Tsimer" title="Start Timer">
                                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" class="btn btn-info btn-raised rippler viewsbt dashbutton" id="`+subtask.id+`Tview" title="View Subtask">
                                            <i class="font-awesome fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                        <button type="button" class="btn btn-danger btn-raised rippler delsbt dashbutton" id="`+subtask.id+`Tdelete" title="Delete Subtask">
                                            <i class="fa fa-close"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        //var subtid='#'+data[i].task+' .panel-body';
        $('#'+subtask.task).find('.panel-body').append(subtaskstxt);
        
    }
    //loadsubtask end---------------
    //sbt completion change form open call starts------
    $(document).on('click','.changecomp',function(){
        var stid=$(this).attr('id').split('T')[0];
        $('#'+stid+'Tprogtxt').removeClass('hide');
        $('#'+stid+'Tsave').removeClass('hide');
        $('#'+stid+'Tcomplete').addClass('hide');
        // var id=stid;
        // var change=     `<form class="form-wizard m-10">
        //                     <div class="row">
        //                         <div class="col-sm-8">
        //                             <input type="number" class="form-control" id="`+id+`prgtxt" required>
        //                         </div>
        //                         <div class="col-sm-1">
        //                             <label class="input">%</label>
        //                         </div>
        //                     </div>
        //                     <div class="row">
        //                         <div class="col-sm-6">
        //                             <button type="button" class="btn btn-success sbtsave" id="`+stid+`">
        //                                 <i class="fa fa-save"></i><span>Save</span>
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </form>`
        // $('#'+id+'progress').html(change);
    });
    //sbt completion change form open call ends------
    //sbt completion change call starts--------------
    $(document).on('click','.sbtsave',function(){
        var subtaid=$(this).attr('id').split("T")[0];
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
                    },
                    success:function(subtask){
                        $('#'+subtask.id+'takewid').css("width",subtask.completed+'%');
                        if(subtask.completed>=100){
                            $('#'+subtask.id+'takewid').css("background-color",'green');
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
                        // $('#'+subtask.id+'subt').remove();
                        // loadSubtask(subtask);
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
            },
            success:function(){
                $('#'+stid+'subt').remove();
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
    });
    //delete subtask ends--------------
   
});