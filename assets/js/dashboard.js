$(document).ready(function(){
    var eventarr= new Array();
    // console.log("TOKEN: "+localStorage.getItem('token'));
    // $.ajax({
    //     async: true,
    //     crossDomain:true,
    //     url:urlRoot+'users/',
    //     type:'GET',
    //     datatype:'JSON',
    //     headers:{
    //         "Authorization": "Bearer "+localStorage.getItem('token'),
    //         "content-type": "application/json",
    //         "cache-control": "no-cache",
    //     },
    //     success:function(data){
    //         console.log(data);
    //     }
    // });
    //noteslist calls starts---------------------------
    //notes function--------
    function areaLoader(notes){
        var noteslist='';
            if(notes){               
                noteslist+=`<div class="content m-t-10 m-l-20">
                                <div class="description">`+notes.content+`</div>
                            </div>
                            `;
                $('#notesli').html(noteslist);
                $('.buttonarea').html(`<button type="button" class="btn btn-warning btn-flat editnotes" id="notes-`+notes.id+`">
                                            <span class="icon icon-pencil add-new"></span>
                                        </button>
                                        <button type="button" class="btn btn-danger btn-flat delnotes" id="notes-`+notes.id+`">
                                            <i class="fa fa-close"></i>
                                        </button>`);
            }
    }
    //notes function--------
    //noteslist view call------
    $.ajax({
        async: true,
        crossDomain: true,
        url:urlRoot+'widgets/notes/1/',
        type:'GET',
        datatype:'JSON',
        headers:{
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        success:function(notes){
            var noteslist='';
            if(notes){  
                areaLoader(notes);             
                // noteslist+=`<div class="content m-5">
                //                 <div class="description">`+notes.content+`</div>
                //             </div>
                //             `;
                // $('#notesli').html(noteslist);
                // $('.buttonarea').html(`<button type="button" class="btn btn-warning btn-flat editnotes" id="notes-`+notes.id+`">
                //                             <span class="icon icon-pencil add-new"></span>
                //                         </button>
                //                         <button type="button" class="btn btn-danger btn-flat delnotes" id="notes-`+notes.id+`">
                //                             <i class="fa fa-close"></i>
                //                         </button>`);
            }
        },
        error:function(error){
            console.log(error.responseText)
        }
    });
    //noteslist view call---------
    //notes edit--------------
    $(document).on('click','.editnotes',function(){
        var notesid=$(this).attr('id');
        var ntext=$('#notesli').find('.description').html();
        var nedit= ` <form class="form-wizard m-10">
                        <textarea id="notearea" class="form-control">
                            `+ntext+`
                        </textarea>
                    </form>
                    `;
            $('#notesli').html(nedit);
            $('.buttonarea').html(`<button type="button" class="btn btn-success notesave" id="`+notesid+`">
                                            <i class="fa fa-save" ></i>
                                            <span>Save</span>
                                        </button>`);
    });
    //notes edit ends---------
    //notes add edit----------
        $(document).on('click','.notesave',function(){
            var req="POST";
            var urlf=urlRoot+'widgets/notes/';
            var notesidd=$(this).attr('id');
            var emp=1;
            var ntext=$('#notearea').val();
            var data=new Object();
            data.content=ntext;
            data.employee=emp;
            if(notesidd){
                var notesid=notesidd.split("-")[1]; 
                data.id=notesid;
                req="PUT";
                urlf+=+notesid+'/';
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
                },
                success:function(notes){
                    areaLoader(notes);
                }
            });
        });
    //notes add edit ends-----
    //notes clear starts------
        $(document).on('click','.delnotes',function(){
            var notesid=$(this).attr('id').split("-")[1];
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'widgets/notes/'+notesid+'/',
                type:'DELETE',
                datatype:'JSON',
                headers:{
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                },
                success:function(){
                    swal("Notes Cleared");
                    location.reload();
                }
            });
        });
        
    //notes clear ends--------
    //noteslist calls starts---------------------------
    //todolist calls starts----------------------------

    //todolist view-------------
        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'widgets/todos/',
            type:'GET',
            datatype:'JSON',
            headers:{},
            success:function(todolist){
                var tdlist='';
                if(todolist){
                    $(todolist).each(function(i,val){
                        tdlist+=`<li class="list-group-item">
                                    <div class="row">
                                        <div class="content">
                                            <div class="name">`+todolist[i].note+`</div>
                                            <div class="description">
                                                Status: `+todolist[i].status+`
                                            </div>
                                            <div class="right-actions">
                                                <span class="badge badge-info">`+todolist[i].sub_task+`</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-5">
                                        <div style="float:right">
                                            <button type="button" class="btn btn-info btn-flat edittodo" id="`+todolist[i].id+`Tedit">
                                                <span class="icon icon-pencil add-new" data-placement="left" data-toggle="tooltip" title="" data-original-title="Add New"></span>
                                            </button>
                                            <button type="button" class="btn btn-danger btn-flat deltodo" id="`+todolist[i].id+`Tedit" data-placement="left" data-toggle="tooltip" title="" data-original-title="Delete this subtask">
                                                <i class="fa fa-close"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                `
                    });
                    $('#todoli').html(tdlist);
                }
            },
            error:function(error){
                console.log(error.responseText)
            }
        });
    //todolist view-------------
    //todolist delete-----------
        $(document).on('click','.deltodo',function(){
            var id=$(this).attr('id').split("T")[0];
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'widgets/todos/'+id+'/',
                type:'DELETE',
                datatype:'JSON',
                headers:{},
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
        },
        success:function(emp){
            //console.log('emp: '+emp);
            var eff=emp.efficiency;
            // eff=110;
            if(eff>=90&&eff<110)
                $('.variant-2').addClass('color-2');
            if(eff<90)
                $('.variant-2').addClass('color-3');
            if(eff>=110)
                $('.variant-2').addClass('color-4');
            $('.total').html(eff);
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
                    color='green';
                }
                
                tasktxt+=   `<div class="panel panel-default m-t-5 m-b-5" style="border-radius:0px">
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
                                    <h4 class="panel-title p-t-30 p-l-20 p-r-10"> Subtasks: </h4>   
                                    <div class="panel-body"></div>
                                </div>
                            </div>`   
            });
            $('#taskaccordion').html(tasktxt);
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
                        var subcolor='';
                        var bcolor='';
                        var eff=data[i].efficiency;
                        var subcomplete=data[i].completed;
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
                        var subtaskstxt=`<div class="subtask card-box" style="border-radius:0px">
                                            <fieldset>
                                                <legend style="font-size:15px">
                                                    <div class="row">
                                                        <div class="col-sm-2">
                                                            `+data[i].title+`
                                                        </div>
                                                        <span class="col-sm-2 col-sm-offset-8 badge badge-`+bcolor+`">
                                                            Efficiency: &nbsp;`+data[i].efficiency+`
                                                        </span>
                                                    </div>   
                                                </legend>
                                                <div class="row m-l-5 m-r-5">
                                                    <div class="col-sm-2"><label class="input">Progress: </label></div>
                                                    <div class="col-sm-6">
                                                        <div class="progress" style="height:25px; -moz-box-shadow: 10px 3px 5px 6px #ccc;-webkit-box-shadow: 10px 3px 5px 6px #ccc;box-shadow: 10px 3px 5px 6px #ccc;">   
                                                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+subcomplete+`%; height:25px;color:#A9A9A9;background-color:`+subcolor+`">
                                                                <div class="m-t-5" style=font-size:10px;vertical-align: middle;">
                                                                    `+subcomplete+`% 
                                                                </div>
                                                            </div>  
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="m-5" style="float:right">
                                                            <button type="button" class="btn btn-info btn-flat" id="`+data[i].id+`Tcomplete">
                                                                <span class="icon icon-pencil add-new" data-placement="left" data-toggle="tooltip" title="" data-original-title="Add New"></span>
                                                            </button>
                                                            <button type="button" class="btn btn-danger btn-flat" data-placement="left" data-toggle="tooltip" title="" data-original-title="Delete this subtask">
                                                                <i class="fa fa-close"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                        `;
                        //var subtid='#'+data[i].task+' .panel-body';
                        $('#'+data[i].task).find('.panel-body').append(subtaskstxt);
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
        },
        error:function(error){
            console.log(error.responseText);
        }
    });  
});