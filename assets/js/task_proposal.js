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
    
    $(document).on('click','.submitFee',function(){
        //$()
    });
});