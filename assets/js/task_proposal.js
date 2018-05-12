$(document).ready(function(){

    $(document).on('click','',function(){
        var toClient = $('#ProposalToClient').val();
        var toPerson = $('#ProposalToPerson').val();
        var fromEntity = $('#ProposalFromEntity').val();
        var fromEmployee = $('#FromEmployee').val();
        var date = $('#ProposalDate').val();
        var time = $('#ProposalTime').val();
        var subj = $('#ProposalSubject').val();
        var background = $('#ProposalBackground').val();
        var scopeOfWork = $('#ProposalScopeOfWork').val();
        var status = $('#ProposalStatus').val();

    });
    $(document).on('click','#taskRevenue',function(){
        $('#FeeProcess').modal('show');
    });
    
    $(document).on('click','.addRow',function(){
        $('.rowEntry').append(`
                <div class="row">
                    <label class="col-xs-4 col-sm-4 input">
                        <input class="empName" type="text">
                    </label>
                    <label class="col-xs-4 col-sm-4 input">
                        <input class="empDuration" type="text">
                    </label>
                    <label class="col-xs-2 col-sm-2 m-t-20">
                        <i class="glyphicon glyphicon-remove text-danger removeRow"></i>
                    </label>
                </div>
        `);
    });

    $(document).on('click','.removeRow',function(){
        $(this).parentsUntil('.rowEntry').remove();
    });
    
    var globalEmployee = [
        {
            'name':'steven',
            'ctc':12.00
        },{
            'name':'stark',
            'ctc':8.00
        }
    ]

    $(document).on('click','.feeCheck',function(){
        var empName = '';
        var empDuration;
        var ctc = 0;
        var perEmp = 0;
        var EmpCost = 0;
        var AdminCost = 0;
        var TotalCost = 0;
        $('.empName').each(function(){
            empName = $(this).val();
            ctc = globalEmployee.find(function(data){ return data.name==empName}).ctc; // check if ctc field is correct
            empDuration = $(this).parentsUntil('row').find('.empDuration').val()
            perEmp = ctc * empDuration;
            EmpCost += perEmp; //total employees cost * by its duration.
            console.log(EmpCost);
            // $('.empDuration').each(function(){
            //     empDuration += $(this).val();
            //     perEmp = ctc * empDuration
            //     AdminCost = parseInt(Admin + perEmp);
            // });
            AdminCost = (EmpCost*25/100);
            TotalCost = AdminCost + EmpCost;
            var marginCost = TotalCost*30/100;
            $('#empCost').empty().html(EmpCost);
            $('#adminCost').empty().html(AdminCost);
            $('#totalCost').empty().html(TotalCost);
            $('#marginCost').empty().html(marginCost);
            var t = parseInt(marginCost) + parseInt(TotalCost);
            $('#totalFee').val(t);
            console.log(TotalCost+':'+marginCost);
        });
    });
    $(document).on('focus','.feeSubmit',function(){ 
        var tots = $('#totalFee').val()
        if(tots != ''){
            $('.ProposalFee').val(tots);
            $('#FeeProcess').modal('hide');
        }else{
            swal('Add an employee and its duration!');
        }
    });
    // $(document).on('focus','.empName',function(){ 
    //     var empname = $(this).val()
    //     var empdura = $('.empName').parentsUntil('row').find('.empDuration').val()
    //     // console.log('changed:'+empdura+':'+empname);
    //     var CTC = globalEmployee.find(function(data){return data.name == empname}).ctc;
    //     var empcost = CTC * empdura;
    //     $('#empCost').empty().html(empcost+' of '+empname);
    // });
});