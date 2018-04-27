$(document).ready(function(){

    var urlParams = GetURLParams();
    var legalStatus = urlParams['legalStatus'];
    var contactId = urlParams['cid'];
    var method = urlParams['method'];
    // var urlRoot = 'http://office-management-demo.herokuapp.com/';
    var urlRoot = 'http://35.202.86.61/office-management/';
    //auto filling forms prefilled data
    $.ajax({
        url: urlRoot + 'contacts/form-data',
        datatype: 'JSON',
        type: 'GET',
        success: function (data) {
            // glob2 = data;
            for (var i = 0; i < data.titles.length; i++) {
                $('.selTitle').append('<option value=' + data.titles[i].id + '>' + data.titles[i].title + '</option>');
            }
            for(var i = 0; i < data.genders.length; i++){
                $('#clientsContact_Gender').append('<option value=' + data.genders[i].id + '>' + data.genders[i].gender + '</option>');
            }
            for(var i = 0; i < data.designations.length; i++){
                $('#clientsContact_designation').append('<option value=' + data.designations[i].id + '>' + data.designations[i].designation + '</option>');
            }
            for(var i = 0; i < data.services.length; i++){
                $('#clientsContact_purpose').append('<option value=' + data.services[i].id + '>' + data.services[i].service + '</option>');
            }
            console.log('Pre filled data added!!!');
        },
        error: function (data) {
            swal('Cannot find contacts!');
        }
    });    

    
        // $.ajax({
        //     url: 'http://office-management-demo.herokuapp.com/clients/individuals/'+clientsId,
        //     datatype: 'JSON',
        //     type: 'GET',
        //     success: function (data) {

        //         var priRelation = data.poc.findIndex(x=>x.is_primary == true);
        //         $('#clientsContact_relation').val(data.poc[priRelation].relation);
        //         $('#clientsContact_purpose').val(data.services.service).trigger('change');

        //         console.log('client\'s data added!!!');
        //     },
        //     error: function () {
        //         swal('Cannot find Contact!');
        //     }
        // });

    if (legalStatus == '1') {
        $('.relation_tab').removeClass('hide');
        $('.designation_tab').addClass('hide');
        $('.service_tab').addClass('hide');
    } else if (legalStatus == '2') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    } else if (legalStatus == '3') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    } else if (legalStatus == '4') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    } else if (legalStatus == '5') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    } else if (legalStatus == '6') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    } else if (legalStatus == '7') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    } else if (legalStatus == '8') {
        $('.relation_tab').addClass('hide');
        $('.designation_tab').removeClass('hide');
        $('.service_tab').removeClass('hide');
    }

    

    function createQuickContact(contact) {

        var newId;
        $.ajax({
            url: urlRoot + 'contacts/?',
            datatype: 'JSON',
            async: false,
            method: 'POST',
            data: JSON.stringify(contact),
            processData: false,
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            success: function (newContact) {
                newId = newContact.id;
            },
            error: function (err) {
                console.log('Not going ahead: ' + err.responseText);
            }
        });
        return newId;
    }

    var pocObj1;
    var pocObj2;
    function addQuickContact(){
        var titleId = $('#clientsContact_title').val();
        var titleText = $('#clientsContact_title').find('option:selected').text();
        
        var Name = $('#clientsContact_Name').val();
        var gender = $('#clientsContact_Gender').val();
        var email = $('#clientsContact_email').val();
        var phone = $('#clientsContact_phone').val();
        var relation = $('#clientsContact_relation').val();
        var designation = $('#clientsContact_designation').val();
        var designationText = $('#clientsContact_designation').find('option:selected').text();
        var purpose = $('#clientsContact_purpose').val();
        var purposeText = $('#clientsContact_purpose').find('option:selected').text();
        var legal = legalStatus;


        if(legal == "1"){
            var contactData=new Object();
            contactData.title = titleId;
            contactData.name = Name;
            contactData.gender = gender;
            contactData.email_addresses = [{category:1, email: email, is_primary:true}];
            contactData.phone_numbers = [{category:1, number: '+91' + phone, is_primary:true}];
            // contactData.relation = relation;
            var cid = createQuickContact(contactData);
            pocObj1 = new Object();
            pocObj1.is_primary = false;        
            pocObj1.contact = cid;
            pocObj1.relation = 1;//relation;
    
            //data for sending to client individuals
            contactId = cid;
        }else{
        
            var contactData=new Object();
            contactData.title = titleId;
            contactData.name = Name;
            contactData.gender = gender;
            contactData.email_addresses = [{category:1, email: email, is_primary:true}];
            contactData.phone_numbers = [{category:1, number: '+91' + phone, is_primary:true}];
            contactData.designation = designation;
            // contactData.purpose = purpose;
            var cid = createQuickContact(contactData);
            pocObj2 = new Object();
            pocObj2.is_primary = false;
            pocObj2.purpose = purpose;
            pocObj2.contact = cid;

            //data for sending to client company
            contactId = cid;
        }

        if (titleId && Name && email && phone) {
            if(legal == 1){
                window.opener.AddContactPerson(contactId, titleText, Name, email, phone, relation, designationText, purposeText,legal,pocObj1);
            }else{
                window.opener.AddContactPerson(contactId, titleText, Name, email, phone, relation, designationText, purposeText,legal,pocObj2);
            }
            swal("Contact Added!", "success");
            window.close();
        } else {
            swal('Please fill all the columns!!');
        }
        
    }

    $(document).on('click','#add_to_clientsContact',addQuickContact);

});