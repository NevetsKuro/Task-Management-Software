
$(document).ready(function(){
    
    console.log("TOKEN: "+localStorage.getItem('token'));
    
    $.ajax({
        async: true,
        crossDomain:true,
        url:urlRoot+'users/',
        type:'GET',
        datatype:'JSON',
        headers:{
            "Authorization": "Bearer "+localStorage.getItem('token'),
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        success:function(data){
            console.log(data);
        }
    })

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
                                                            <span class="irs js-irs-0">
                                                                <span class="irs">
                                                                    <span class="irs-line" tabindex="-1">
                                                                        <span class="irs-line-left"></span>
                                                                        <span class="irs-line-mid"></span>
                                                                        <span class="irs-line-right"></span>
                                                                    </span>
                                                                    <span class="irs-min" style="visibility: visible;">1</span>
                                                                    <span class="irs-max" style="visibility: visible;">10</span>
                                                                    <span class="irs-from" style="visibility: hidden;">0</span>
                                                                    <span class="irs-to" style="visibility: hidden;">0</span>
                                                                    <span class="irs-single" style="left: 63.0376%;">7</span>
                                                                </span>
                                                                <span class="irs-grid"></span>
                                                                <span class="irs-bar" style="left: 3.62903%; width: 61.828%;"></span>
                                                                <span class="irs-bar-edge"></span>
                                                                <span class="irs-shadow shadow-single" style="display: none;"></span>
                                                                <span class="irs-slider single" style="left: 61.828%;"></span>
                                                            </span>
                                                            <input type="text" id="`+data[i].id+`range_02" class="irs-hidden-input" readonly="">
                                                        </label>
                                                    </div>
                                                </fieldset>
                                            </div>
                        
                        `;
                        $('#'+data[i].task+' .panel-body').append(subtaskstxt);
                        $("#"+data[i].id+"range_02").ionRangeSlider({
                            min: 1,
                            max: 10,
                            from: 5
                        });
                        var rangeSlider = $("#"+data[i].id+"range_02").data('ionRangeSlider').update({from:data[i].efficiency});
                        // rangeSlider.update({from:data[i].efficiency});
                    });
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