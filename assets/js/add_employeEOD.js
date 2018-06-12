$(document).ready(function(){
    var urlParams = GetURLParams();
    var eid = urlParams['eodID']; 

    $.getJSON(urlRoot+'subtasks/',function(data){
        for (var i = 0; i < data.length; i++) {
            $('#eod_subtask').append('<option value=' + data[i].id + '>' + data[i].title + '</option>');
        }
    });

    if(eid){
        $.getJSON(urlRoot+'employees/eod/'+eid+'/',function(data){
            $('#eod_workDone').val(data.work_done);
            $('#eod_subtask').val(data.subtask);
            $('#eod_date').val(getFormateDateFromServer(data.date));
            $('#eod_ftime').val(data.from_time);
            $('#eod_ttime').val(data.to_time);
            $('#eod_status').val(data.status);
        });
    }


    $(document).on('click','#submitEmpEOD',function(){

        var workdone = $('#eod_workDone').val();
        var subtask = $('#eod_subtask').val();
        var date = getFormateDateToServer($('#eod_date').val());
        var ftime = $('#eod_ftime').val();
        var ttime = $('#eod_ttime').val();
        var status = $('#eod_status').val();
        var employee = 1;

        var EODobj = new Object();
        EODobj.work_done = workdone;
        EODobj.subtask = subtask;
        EODobj.date = date;
        EODobj.from_time = ftime;
        EODobj.to_time = ttime;
        EODobj.status = status;
        EODobj.employee = employee;

        var EODJSON = JSON.stringify(EODobj);
        console.log(EODJSON);

        if(eid){
            $.ajax({
                async:false,
                crossDomain: true,
                url:urlRoot+'employees/eod/'+eid+'/',
                type:'PUT',
                datatype:'JSON',
                contentType: 'application/json',
                headers:{
                    "X-CSRFToken": csrftoken
                },
                data:EODJSON,
                success:function(){
                    swal('EOD created');
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        }else{
            $.ajax({
                async:false,
                crossDomain: true,
                url:urlRoot+'employees/eod/',
                type:'POST',
                datatype:'JSON',
                contentType: 'application/json',
                headers:{
                    "X-CSRFToken": csrftoken
                },
                data:EODJSON,
                success:function(){
                    swal('EOD created');
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        }

    })


})