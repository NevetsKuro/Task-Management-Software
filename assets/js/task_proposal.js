$(document).ready(function(){

    var params = GetURLParams();
    var pid = params['pid'];
    
    $('.summernote').summernote({
        codemirror: { 
            theme: 'cerulean'
          },
        placeholder: 'write here...'
    });

    //////////////////////////////////////.Form - Data
    $.getJSON(urlRoot+'clients/allclients',function(data){
        for (var i = 0; i < data.length; i++) {
            $('#ProposalToClient').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
    });
    $.getJSON(urlRoot+'organisations/?isOwned=True',function(data){
        for (var i = 0; i < data.length; i++) {
            $('#ProposalFromEntity').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
    });
    $.getJSON(urlRoot+'employees/',function(data){
        for (var i = 0; i < data.length; i++) {
            $('#FromEmployee').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
    });
    // $(document).on('change','#ProposalToClient',function(){
    //     var clientId = $(this).val();

    //     $.getJSON(urlRoot+'/',function(data){
    //         for (var i = 0; i < data.length; i++) {
    //             $('#FromEmployee').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
    //         }
    //     }); 
    // });

    function addRowCount(tableAttr) {
        $(tableAttr).each(function(){
            $('th:first-child, thead td:first-child', this).each(function(){
            var tag = $(this).prop('tagName');
            $(this).before('<'+tag+'>#</'+tag+'>');
            });
            $('td:first-child', this).each(function(i){
            $(this).before('<td>'+(i+1)+'</td>');
            });
        });
    }
      
      // Call the function with table attr on which you want automatic serial number
    addRowCount('.js-serial');

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
    

    //Fee Structure
    $(document).on('click','.addRow',function(){
        $('.rowEntry').append(`
            <div class="row">
                <label class="col-xs-4 col-sm-4 select">
                    <select class="select2 empNameM"></select>
                </label>
                <label class="col-xs-3 col-sm-3 label">
                    <span class="empDesignM pos-des"></span>
                </label>
                <label class="col-xs-2 col-sm-2 input">
                    <input class="empDurationM" type="text">
                </label>
                <label class="col-xs-2 col-sm-2 input">
                    <input class="empCostM" type="text">
                </label>
                <label class="col-xs-1 col-sm-1 m-t-10">
                    <i class="glyphicon glyphicon-remove text-danger removeRow"></i>
                </label>
            </div>
        `);
        getEmp(globalEmployee);
    });

    // var globalEmployee = [
    //     {
    //         'name':'steven',
    //         'ctc':12.00
    //     },{
    //         'name':'stark',
    //         'ctc':8.00
    //     }
    // ]
    
    function getEmp(data){
        for (var i = 0; i < data.length; i++) {
            $('.empNameM').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
        }
        $('.empNameM').select2({
            dropdownParent: $('#FeeProcess'),
            placeholder:{id:'-1',text:'Select...'},
            allowClear: true
        })
    }
    
    $.getJSON(urlRoot + 'employees/',function(data){
        globalEmployee = data;
        getEmp(globalEmployee);
    });

    $(document).on('change','.empNameM',function(){
        var empid = $(this).val();
        empObj = globalEmployee.find(function(data){ return data.id == empid });
        $(this).parentsUntil('.rowEntry').find('.empDesignM').html(empObj.designation);
    })

    $(document).on('click','.feeCheck',function(){
        var empName = '';
        var empDuration;
        var ctc = 0;
        var perEmp = 0;
        var EmpCost = 0;
        var AdminCost = 0;
        var TotalCost = 0;
        var margin = 0;
        var empf = 0;
        $('.empNameM').each(function(){
            empName = $(this).val();
            
            empObj = globalEmployee.find(function(data){ return data.id==empName}); // check if ctc field is correct
            if(empObj){
                ctcPerHour = empObj.ctcPerHour;
            }
            empDuration = $(this).parentsUntil('.rowEntry').find('.empDurationM').val();
            margin = $('#marginCost').val();
            if(margin == ''){
                swal('Please Enter a margin!');
                return false;
            }
            perEmp = ctcPerHour * empDuration;
            EmpCost += perEmp; //total employees cost * by its duration.
            console.log(EmpCost);
            $(this).parentsUntil('.rowEntry').find('.empCostM').val(perEmp);
        });
        AdminCost = (EmpCost*25/100);
        TotalCost = AdminCost + EmpCost;
        var marginCost = TotalCost*30/100;
        $('#empCost').empty().html(EmpCost.toFixed(2));
        $('#adminCost').empty().html(AdminCost.toFixed(2));
        $('#totalCost').empty().html(TotalCost.toFixed(2));
        // $('#marginCost').empty().html(marginCost);
        var t = parseInt(margin) + parseInt(TotalCost);
        $('#totalFee').val(t);
        console.log(TotalCost+':'+marginCost);
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
    
    $(document).on('click','.removeRow',function(){
        $(this).parentsUntil('.rowEntry').remove();
    });
    
    
    function checkValidation(){
        var toClient = 1;// $('#ProposalToClient').val();
        var toPerson = 1;//$('#ProposalToPerson').val();
        var fromEntity = 1;//$('#ProposalFromEntity').val();
        var fromEmployee = 1;//$('#FromEmployee').val();
        var date = $('#ProposalDate').val();
        var time = $('#ProposalTime').val();
        var subj = $('#ProposalSubject').val();
        var background = $('#ProposalBackground').val();
        var scopeOfWork = $('#ProposalScopeOfWork').val();
        var fees = $('.ProposalFee').val();
        
        if(toClient == null){
            swal('Select a Client to send to');
            $('#ProposalToClient').focus();
            return false;
        }
        if(toPerson == null){
            swal('Select a person to send to');
            $('#ProposalToPerson').focus();
            return false;
        }
        if(fromEntity == null){
            swal('Select a person from entity');
            $('#ProposalFromEntity').focus();
            return false;
        }
        if(fromEmployee == null){
            swal('Select a person from employee');
            $('#FromEmployee').focus();
            return false;
        }
        if(date==''){
            swal('PLease add a date/time');
            $('#ProposalDate').focus();
            return false;
        }
        if(time==''){
            swal('PLease add a date/time');
            $('#ProposalTime').focus();
            return false;
        }
        if(subj==''){
            swal('Please add Subject');
            $('#ProposalSubject').focus();
            return false;
        }
        if(background==''){
            swal('Please add background');
            $('#ProposalBackground').focus();
            return false;
        }
        if(scopeOfWork==''){
            swal('Please add scope of work');
            $('#ProposalScopeOfWork').focus();
            return false;
        }
        if(fees==''){
            swal('Please add fees');
            return false;
        }
        return true;    
    }

    $(document).on('click','#submitProposal',function(){
        
        var valid = checkValidation();

        if(valid){
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
        }
    });
});