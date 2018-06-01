$(document).ready(function(){

    var params = GetURLParams();
    var rid = params['rid'];


    if(rid){
        $.getJSON(urlRoot+'employees/reimbursements/'+ rid + '/',function(data){
            $('#empR_task').val(data.task).trigger('change');
            $('#empR_type').val(data.reimbursement_type).trigger('change');
            $('#empR_date').val(getFormateDateFromServer(data.date));
            (data.is_billable?$('#empR_billable').prop('checked',true):$('#empR_billable').prop('checked',false));
            // (data.is_approved?$('#empR_status').val('A').trigger('change'):$('#empR_status').val('N').trigger('change'));
            $('#empR_remarks').val(data.remarks);
            $('#empR_particular').val(data.particular);
            $('#empR_amount').val(data.amount);
        });
        $('.hideOnView').addClass('hide');
        $('input').attr('disabled',true);
    }

    $.getJSON(urlRoot+'common/form-data',function(data){
        for (var i = 0; i < data.reimbursements.length; i++) {
            $('#empR_type').append('<option value='+data.reimbursements[i].id+'>'+data.reimbursements[i].reimbursement_type+'</option>');
        }

    });
    $.getJSON(urlRoot+'tasks',function(data){
        for (var i = 0; i < data.length; i++) {
            $('#empR_task').append('<option value='+data[i].id+'>'+data[i].title+'</option>');
        }
    });

    var task,type,date,is_billable, amount,remarks,particular,emp;
    function getData(){
        task = $('#empR_task').val();
        type = $('#empR_type').val();
        date= getFormateDateToServer($('#empR_date').val());
        is_billable = $('#empR_billable').prop('checked');
        // is_approved = $('#empR_status').val()=='A'?true:false;
        amount= $('#empR_amount').val();
        remarks= $('#empR_remarks').val();
        particular = $('#empR_particular').val();
        emp = 1;//the current employee selected.

        var empR_DATA = new Object();
        empR_DATA.task = task;
        empR_DATA.date = date;
        empR_DATA.particular = particular;
        empR_DATA.is_approved = false;
        empR_DATA.is_billable = is_billable;
        empR_DATA.amount = amount;
        empR_DATA.employee = emp;
        empR_DATA.remarks = remarks;
        empR_DATA.reimbursement_type = type;
        return empR_DATA;
    }

    function checkValidation(){
        var empR = getData();
        if(empR.task == null){
            $('#empR_task').focus();
            swal('Please select a task');
            return false;
        }
        if(empR.date == ''){
            $('#empR_date').focus();
            swal('Please enter a date');
            return false;
        }
        if(empR.amount==''){
            $('#empR_amount').focus();
            swal('Please enter a amount');
            return false;
        }
        if(empR.remarks == ''){
            $('#empR_remarks').focus();
            swal('Please enter a remark');
            return false;
        }
        if(empR.reimbursement_type == null){
            $('#empR_type').focus();
            swal('Please select a Reimbursement Type');
            return false;
        }
        return true;
    }
    $(document).on('click','#submit_Reimburse',function(){
        var empR = [];
        var valid = checkValidation();
        if(valid){
            empR = getData();
            var empR_JSON = JSON.stringify(empR);

            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'employees/reimbursements/',
                datatype:'JSON',
                type:'POST',
                headers: {
                    "X-CSRFToken": csrftoken,
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                processData: false,
                data:empR_JSON,
                success:function(data){
                    swal('Form Submitted');
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        }
    });
    
    

});