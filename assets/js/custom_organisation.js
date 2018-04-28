$(document).ready(function(){
    
    var UpdateCont = inputChanges();

    var urlRoot = 'http://35.202.86.61/office-management/';
    // function formData(formDataId,formDataArr){
    //     for (var i = 0; i < formData.length; i++) {
    //         $(formDataId).append(` <option value="${formDataArr[i].id}">${formDataArr[i][1]}</option> `);
    //         //$('#addContact_group').append('<option value='+data.groups[i].id+'>'+data.groups[i].group+'</option>');
    //     }
    // }


    $.ajax({
        url:urlRoot + 'organisations/form-data',
        datatype:'JSON',
        type:'GET',
        success:function(data){
            //formData('#addContact_group',data.groups);

            for (var i = 0; i < data.groups.length; i++) {
                $('#addContact_group').append('<option value='+data.groups[i].id+'>'+data.groups[i].group+'</option>');
            }

            for (var i = 0; i < data.industry_types.length; i++) {
                $('#addContact_industry').append('<option value='+data.industry_types[i].id+'>'+data.industry_types[i].industry_type+'</option>');
            }

            for (var i = 0; i < data.business_natures.length; i++) {
                $('#addContact_business_nature').append('<option value='+data.business_natures[i].id+'>'+data.business_natures[i].business_nature+'</option>');
            }

            for (var i = 0; i < data.business_types.length; i++) {
                $('#addContact_business_type').append('<option value='+data.business_types[i].id+'>'+data.business_types[i].business_type+'</option>');
            }
        }
    });


    //new tabs for hoaddress
    function addHoAddress(){
        $('#hoaddress-row').append(`
        <div class='row well new'>
        
            <div class='col-xs-1 col-sm-1'>
                <label class='checkbox'>
                    <input update-orgCtrl="branches" type='radio' name="branchChecked" class='hoaddress_isHO'><i class='rounded-x m-l-10'></i>
                </label>
            </div>
                
            <div class='col-xs-3 col-sm-3'>
                <label class='input'>
                    <input update-orgCtrl="branches" type='text' class='hoBranchName'>
                </label>
            </div>

            <div class='col-xs-6 col-sm-6'>
                <label class='textarea textarea-expandable'>
                    <textarea update-orgCtrl="branches" class='hoaddresses'></textarea>
                </label>
            </div>
            
            <div class='col-xs-2 col-sm-2'>
                <div id='remove-hoaddress' class='text-center text-danger'>
                    <span class='centerAlign'>
                        <i class='glyphicon glyphicon-remove fa-lg'></i>
                    <span>
                </div>
            </div>
        </div>
        `);
        $('#hoaddress-row .new:last').addClass('zoomInUp animated').show('fast');

    }

    $('#addaddress').on('click',addHoAddress);
    
    $('#hoaddress-row').on('click','#remove-hoaddress',function(){
        $(this).parents('.new').remove();

        UpdateCont.push($(this));
    });

    var urlParam = GetURLParams();
    var orgId = urlParam['id'];
    var currentContactId = urlParam['cid'];
    var currentClientId = urlParam['ctid'];
    var isContactForm = false, isClientForm = false;
    if(currentContactId){
        isContactForm = true;
    }else if(currentClientId){
        isClientForm = true;
    }

    if(orgId != null || orgId != undefined){
                //var orgId = $.cookie("orgID");
                $.ajax({
                    url:urlRoot + 'organisations/'+orgId,
                    datatype:'json',
                    method:'get',
                    success:function(orgData){
                        console.log(orgData.website);
                        $('#addContact_website').val(orgData.website);
                        $('#addContact_orgName').val(orgData.name);
                        $('#addContact_group').val(orgData.group).trigger('change');
                        //$('#addContact_designation').val(orgData.designation);  // designation isn't there
                        $('#addContact_industry').val(orgData.industry_types).trigger('change');
                        $('#addContact_business_nature').val(orgData.business_natures).trigger('change');
                        $('#addContact_business_type').val(orgData.business_types).trigger('change');
                        var branches = orgData.branches;
                        for(let i=0; i< branches.length; i++){
                            if(i > 0){
                                addHoAddress();
                                $('#hoaddress-row .row:last .hoBranchName').val(branches[i].name);
                                $('#hoaddress-row .row:last .hoaddresses').val(branches[i].address);        
                                $('#hoaddress-row .row:last .hoaddress_isHO').selected(branches[i].is_head_office);
                            }else{
                                $('#hoaddress-row .row .hoBranchName').val(branches[i].name);
                                $('#hoaddress-row .row .hoaddresses').val(branches[i].address);
                                $('#hoaddress-row .row .hoaddress_isHO').selected(branches[i].is_head_office);
                            }
                        }
                        console.log('code ran once!!');
                        
                    },
                    error:function(data){
                        alert('server is down'+ data);
                    }
                });
    }

    function checkValidation(){
        var name = $('#addContact_orgName').val();
        var group = $('#addContact_group').val();
        var website = $('#addContact_website').val();
        var industry = $('#addContact_industry').val();
        var busNature = $('#addContact_business_nature').val();
        var busType = $('#addContact_business_type').val();
        var hoAddress = getHoaddressRow();
        
        if(name == ""){
            swal('Please enter the organisation name');
            return false;
        }else if(website == null){
            swal('Please enter the organisation website');
            return false;
        }else if(group == null){
            swal('Please enter the organisation group');
            return false;
        // }else if(industry == null){
        //     swal('Please enter the organisation Industry type');
        //     return false;
        // }else if(busNature == null){
        //     swal('Please enter the organisation Business Nature');
        //     return false;
        // }else if(busType == null){
        //     swal('Please enter the organisation Business Type');
        //     return false;
        }else if(hoAddress[0].address == ''||hoAddress[0].name == ''){
            swal('Please enter a branch');
            return false;
        }
        return true;
        
    }

    $(document).on('click','#createFormOrganisation',function(e){
        e.preventDefault();

        var valid = checkValidation();

        if(valid){
            if(orgId){

                if(UpdateCont != undefined && UpdateCont.length > 0 ){
                    
                    var orgData = {}

                    $.each(UpdateCont, function(key, value){
                        $(value).each(function(index){
                            var dataType = value.attr('update-orgCtrl');
                            var Val = value.val();
                            //console.log(key + ' : '+dataType +'  '+ Val);

                            
                            switch(dataType){
                                case 'branches':
                                    Val = getHoaddressRow(); //branchArr;
                                    break;
                                case 'website':
                                    if (Val.indexOf('http://') > -1 || Val.indexOf('https://') > -1) {
                                        Val = Val;
                                    } else {
                                        Val = "http://" + Val;
                                    }
                                    break;
                            }

                            orgData[dataType] = Val;
                        });
                    });

                    orgData['name'] = $('#addContact_orgName').val();
                    orgData['group'] = $('#addContact_group').val();
                    var orgJSON = JSON.stringify(orgData);
                    console.log('current organisation id is = '+orgId);
                    console.log('The json file is = \n'+orgJSON);

                    $.ajax({
                        async: true,
                        crossDomain: true,
                        url:urlRoot + 'organisations/'+ orgId +'/?',
                        method:'PUT',
                        headers:{
                            "content-type": "application/json",
                            "cache-control": "no-cache",
                        },
                        processData: false,
                        data:orgJSON,
                        success:function(){
                            swal('Organisation data updated !!');
                                
                            currentContactId = urlParam['cid'];
                            // var urL = 'AddContact.html?contact='+currentContactId;
                            // $(location).attr('href',urL);
                            window.opener.updatedOrgId = orgId;
                            console.log('updateOrgId: ' + window.opener.updatedOrgId);
                            if(isContactForm){
                                window.opener.contact_organisation();
                            }else if(isClientForm){
                                window.opener.client_organisation();
                            }
                            setTimeout(window.close(),1000);
                        },
                        error:function(error){
                            swal('Organisation data was not updated successfully!!');
                            
                            console.log(error.responseText);
                        }
                    });
                }

            }else{

                var orgName = $('#addContact_orgName').val();
                var orgGroup = $('#addContact_group').val();
                var orgIndustry = $('#addContact_industry').val();
                var orgBusNature = $('#addContact_business_nature').val();
                var orgBusType = $('#addContact_business_type').val();
                
                var orgWebsite = $('#addContact_website').val();
                if (orgWebsite.indexOf('http://') > -1 || orgWebsite.indexOf('https://') > -1) {
                        orgWebsite = orgWebsite;
                    } else {
                        orgWebsite = "http://" + orgWebsite;
                    }
                
                if(orgBusNature ==null){
                    orgBusNature = [];
                }
                if(orgBusType == null){
                    orgBusType = [];
                }
                if(orgIndustry == null){
                    orgIndustry = [];
                }
                if(orgWebsite == ""){
                    orgWebsite = null;
                }
                
                var branches = {};
                var orgData = new Object();

                orgData = {
                    "name":orgName,
                    "group":orgGroup,
                    "industry_types":orgIndustry,
                    "business_types": orgBusType,
                    "business_natures":orgBusNature,
                    "website": orgWebsite,
                    "branches": getHoaddressRow()
                }

                var orgJSON = JSON.stringify(orgData);
                console.log('current organisation id is = '+orgId);
                console.log('The json file is = \n'+orgJSON);
                
                $.ajax({
                    url: urlRoot + 'organisations/?',
                    type:'POST',
                    datatype:'JSON',
                    contentType:'application/json',
                    data: orgJSON,
                    success:function(data){
                        swal('Organisation Added!!!');
                        var newOrgId = data.id;
                        console.log('new organisation id is = ' + newOrgId);
                        window.opener.updatedOrgId = newOrgId;
                        console.log('updateOrgId: ' + window.opener.updatedOrgId);
                        if(isContactForm){
                            window.opener.contact_organisation();
                        }else if(isClientForm){
                            window.opener.client_organisation();
                        }
                        setTimeout(window.close(),1000);
                    },
                    error:function(error){
                        console.log(error.responseText);
                    }
                });

            }
    }
    });
});