$(document).ready(function(){

    var params = GetURLParams();
    var pid = params['pid'];
    
    if(pid){
        $.getJSON(urlRoot+'tasks/proposals/'+pid,function(proposal){
            $('#ProposalToClient').val(proposal.toClient);
            $('#ProposalToPerson').val(proposal.toPerson);
            $('#ProposalFromEntity').val(proposal.fromEntity);
            $('#FromEmployee').val(proposal.fromEmployee);
            var formatted5 = null,formatted6 = null;
            if(proposal.proposalDate){
                var datetime = proposal.proposalDate.split('T');
                formatted5 = $.datepicker.formatDate("dd/mm/yy", new Date(datetime[0]));
                formatted6 = datetime[1].slice(0,-1);
            }
            $('#ProposalDate').val(formatted5);
            $('#ProposalTime').val(formatted6);
            $('#ProposalSubject').val(proposal.subject);
            $('#ProposalBackground').val(proposal.background);
            $('#ProposalScopeOfWork').val(proposal.scopeOfWork);
            $('.ProposalFee').val(proposal.fees);
            $('#ProposalStatus').val(proposal.taskProposalStatus);
        });
    }

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
    
    $(document).on('click','#submitProposal',function(){
        var toClient = $('#ProposalToClient').val();
        var toPerson = $('#ProposalToPerson').val();
        var fromEntity = $('#ProposalFromEntity').val();
        var fromEmployee = $('#FromEmployee').val();
        var date = $('#ProposalDate').val();
        var time = $('#ProposalTime').val();
        var subj = $('#ProposalSubject').val();
        var background = $('#ProposalBackground').val();
        var scopeOfWork = $('#ProposalScopeOfWork').val();
        var fees = parseInt($('.ProposalFee').val()).toFixed(2);
        var status = $('#ProposalStatus').val();
        var ProposalDate  = getFormateDateToServer(date) +'T'+ time.slice(0,-2)+':00Z';

        var ProposalData = new Object();
        ProposalData.toClient = 1;//toClient;
        ProposalData.toPerson = 1;//toPerson;
        ProposalData.fromEntity = 1;//fromEntity;
        ProposalData.fromEmployee = 1;//fromEmployee;
        ProposalData.ProposalDate = ProposalDate;
        ProposalData.subject = subj;
        ProposalData.scopeOfWork = scopeOfWork;
        ProposalData.background = background;
        ProposalData.fees = fees;
        ProposalData.taskProposalStatus = status;

        var ProposalJSON = JSON.stringify(ProposalData);
        console.log(ProposalJSON);
        
        if(!pid){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'tasks/proposals/',
                datatype:'JSON',
                method:'POST',
                headers: {
                    "X-CSRFToken": csrftoken,
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                processData: false,
                data:ProposalJSON,
                success:function(){
                    swal('Proposal Added');
                },
                error:function(error){
                    swal(error.responseText);
                }
            });
        }else if(pid){
            $.ajax({
                async: true,
                crossDomain: true,
                url:urlRoot+'tasks/proposals/'+pid+'/',
                datatype:'JSON',
                type:'PUT',
                headers: {
                    "X-CSRFToken": csrftoken,
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                processData: false,
                data:ProposalJSON,
                success:function(){
                    swal('Proposal Updated');
                },
                error:function(){
                    swal(' -- ');
                }
            });
        }
    });
});