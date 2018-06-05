
$(document).ready(function(){
    var eventarr= new Array();

    console.log("TOKEN: "+localStorage.getItem('token'));
    
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
    // })

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
                //console.log("START TIME : "+start);
                var endt=data[i].endTime.split("T")[0];

                if(i<5)
                    eventarr.push({title:data[i].title,start:startt,end:endt});
                // eventarr[i].title=data[i].title;
                // eventarr[i].start=data[i].startTime;
                // eventarr[i].end=data[i].endTime;
                var color='';
                var complete=data[i].completed;
                if(complete<10){
                    color='red';
                }
                if(complete>=100){
                    color='green';
                }
                tasktxt+=  `<div class="panel panel-default">
                                <div class="panel-heading" style="padding: 0px;">
                                    <h4 class="panel-title p-t-10 p-l-10 p-r-10">`+data[i].title+`
                                        <a class="" style="" data-toggle="collapse" data-parent="#accordion" href="#`+data[i].id+`" aria-expanded="false" class="collapsed">
                                        <div class="progress" style="height:50px; -moz-box-shadow: 10px 3px 5px 6px #ccc;
                                        -webkit-box-shadow: 10px 3px 5px 6px #ccc;
                                        box-shadow: 10px 3px 5px 6px #ccc;">   
                                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+complete+`%; height:50px;color:#A9A9A9;background-color:`+color+`">
                                        </div><div class="m-t-13 p-l-5" style=font-size:20px;vertical-align: middle; line-height:10px;">`+complete+`% </div>  
                                        </div>
                                        </a>
                                    </h4>
                                </div>
                                <div id="`+data[i].id+`" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                <div class="panel-body"></div>
                                </div>
                            </div>`
                
                // tasktxt+=  ` <div class="panel panel-default">
                //                 <div class="panel-heading progress" style="padding: 0px;height:50px;">
                //                     <h4 class="panel-title progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="10" style="width:`+complete+`%; height:50px">
                //                         <a class="" data-toggle="collapse"  aria-expanded="false" class="collapsed" style="height:50px">
                //                         `+data[i].title+` `+complete+`%    
                //                             <div class=""  data-parent="#accordion" href="#`+data[i].id+`">
                                                    
                //                             </div>
                //                         </a>
                //                     </h4>
                //                 </div>
                //                 <div id="`+data[i].id+`" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                    
                //                 </div>
                //             </div>`
                
                
                
                // tasktxt+=   `<div class="panel panel-default">
                //                 <div class="panel-heading" style="padding: 0px;">
                //                     <h4 class="panel-title progress" style="height:50px">
                //                         <a class="progress-bar progress-bar-striped active" data-toggle="collapse" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:`+complete+`%;" data-parent="#accordion" href="#`+data[i].id+`" aria-expanded="false" class="collapsed">
                //                             `+data[i].title+` `+complete+
                //                        `%</a>
                //                     </h4>
                //                 </div>
                //                 <div id="`+data[i].id+`" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                    
                //                 </div>
                //             </div>`;
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
                        var subcomplete=data[i].completed;
                        if(subcomplete<10){
                            subcolor='red';
                        }
                        if(subcomplete>=100){
                            subcolor='green';
                        }
                        var subtaskstxt=`
                                            <div class="subtask card-box">
                                                <fieldset>
                                                    <legend style="font-size:15px">`+data[i].title+`</legend>`+data[i].efficiency+`
                                                    <div class="progress" style="height:25px; -moz-box-shadow: 10px 3px 5px 6px #ccc;
                                                    -webkit-box-shadow: 10px 3px 5px 6px #ccc;
                                                    box-shadow: 10px 3px 5px 6px #ccc;">   
                                                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="20" aria-valuemax="20" style="width:`+subcomplete+`%; height:25px;color:#A9A9A9;background-color:`+subcolor+`">
                                                            <div class="m-t-5 p-l-5" style=font-size:10px;vertical-align: middle;">`+subcomplete+`% </div>
                                                            </div>  
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <label class="label">Efficiency:
                                                            <span class="text-danger">*</span>
                                                        </label>
                                                        <label class="input">
                                                            <input type="text" id="`+data[i].id+`range_02" class="irs-hidden-input" readonly="true">
                                                        </label>
                                                    </div>
                                                </fieldset>
                                            </div>
                        `;
                        $('#'+data[i].task+' .panel-body').append(subtaskstxt);
                        $("#"+data[i].id+"range_02").ionRangeSlider({
                            min: 1,
                            max: 10,
                            from: 5,
                            disable:1
                        });
                        var rangeSlider = $("#"+data[i].id+"range_02").data('ionRangeSlider').update({from:data[i].efficiency});
                        // rangeSlider.update({from:data[i].efficiency});
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
                contentHeight: 600,
                // events: [
                //   {
                //     title: 'All Day Event',
                //     start: '2018-03-01'
                //   },
                //   {
                //     title: 'Long Event',
                //     start: '2018-03-07',
                //     end: '2018-03-10'
                //   },
                //   {
                //     id: 999,
                //     title: 'Repeating Event',
                //     start: '2018-03-09T16:00:00'
                //   },
                //   {
                //     id: 999,
                //     title: 'Repeating Event',
                //     start: '2018-03-16T16:00:00'
                //   },
                //   {
                //     title: 'Conference',
                //     start: '2018-03-11',
                //     end: '2018-03-13'
                //   },
                //   {
                //     title: 'Meeting',
                //     start: '2018-03-12T10:30:00',
                //     end: '2018-03-12T12:30:00'
                //   },
                //   {
                //     title: 'Lunch',
                //     start: '2018-03-12T12:00:00'
                //   },
                //   {
                //     title: 'Meeting',
                //     start: '2018-03-12T14:30:00'
                //   },
                //   {
                //     title: 'Happy Hour',
                //     start: '2018-03-12T17:30:00'
                //   },
                //   {
                //     title: 'Dinner',
                //     start: '2018-03-12T20:00:00'
                //   },
                //   {
                //     title: 'Birthday Party',
                //     start: '2018-03-13T07:00:00'
                //   },
                //   {
                //     title: 'Click for Google',
                //     url: 'http://google.com/',
                //     start: '2018-03-28'
                //   }
                // ]
              });
        },
        error:function(error){
            console.log(error.responseText);
        }
    });  
});