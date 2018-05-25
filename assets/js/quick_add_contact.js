$(document).ready(function(){

    var urlParams = GetURLParams();
    var legalStatus = urlParams['legalStatus'];
    // var contactId = urlParams['cid'];
    var method = urlParams['method'];
    // var urlRoot = 'http://office-management-demo.herokuapp.com/';
    var urlRoot = 'http://35.202.86.61/office-management/';
    //auto filling forms prefilled data
    var contact_formData = [];
    var client_formData = [];

    $.ajax({
        url: urlRoot + 'contacts/form-data',
        datatype: 'JSON',
        type: 'GET',
        success: function (data) {
            client_formData = data;
            contact_formData = data;
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
            for (var i = 0; i < data.relation.length; i++) {
                $('#clientsContact_relation').append('<option value=' + data.relation[i].id + '>' + data.relation[i].relation + '</option>');
            }
            console.log('Pre filled data added!!!');
        },
        error:function(){
            swal('Cannot fetch client form data');
        }
    });

    // if(method== 'Update'){
        
    //     var legalText;
    //         if(legalStatus== 1 ){
    //             legalText='individuals';
    //         }else if(legalStatus == 2){
    //             legalText = 'hufs';
    //         }else if(legalStatus == 3){
    //             legalText = 'proprietors';
    //         }else if(legalStatus == 4){
    //             legalText = 'partnership-firms';
    //         }else if(legalStatus == 5){
    //             legalText = 'llps';
    //         }else if(legalStatus == 6){
    //             legalText = 'limited-companies';
    //         }else if(legalStatus == 7){
    //             legalText = 'aop-boi';
    //         }else if(legalStatus == 8){
    //             legalText = 'trusts';
    //         }
        
    //     // var contactData = new Object();
    //     // contactData.name = ;
        
        
    //     // var contactJSON = JSON.stringify(contactData);
    //     $.ajax({
    //         url: urlRoot + 'contacts/'+contactId,
    //         datatype: 'JSON',
    //         type: 'GET',
    //         success: function (data) { 
    //             $('#clientsContact_title').val(data.title);
    //             $('#clientsContact_Name').val(data.name);
    //             $('#clientsContact_Gender').val(data.gender);
    //             var p_email = data.email_addresses;
    //             var indexPrimary_email = p_email.findIndex(x=>x.is_primary == true);
    //             $('#clientsContact_email').val(p_email[indexPrimary_email].email);
    //             var p_phone = data.phone_numbers;
    //             var indexPrimary_phone = p_phone.findIndex(x=>x.is_primary == true);
    //             $('#clientsContact_phone').val(parseInt(p_phone[indexPrimary_phone].number.toString().slice(3),10));
    //             swal('contact Updated!');
    //         },
    //         error: function (error){
    //             console.log(error.responseText);
    //         }
    //     });

    //     if(legalStatus = 1){
    //         for (let index = 0; index < contact_formData.relation.length; index++) {
    //             while(client_formData.relation[index].relation == cidData[6]){
    //                 $('#clientsContact_relation').val(contact_formData.relation.id)
    //             }
    //         }
    //     }else{
    //         for (let index = 0; index < contact_formData.designations.length; index++) {
    //             while(contact_formData.designations[index].designation == cidData[6]){
    //                 $('#clientsContact_designation').val(contact_formData.designations.id)
    //             }
    //         }
    //         for (let index = 0; index < client_formData.purpose.length; index++) {
    //             while(client_formData.purpose[index].purpose == cidData[6]){
    //                 $('#clientsContact_purpose').val(client_formData.purpose.id)
    //             }
    //         }
    //     }
    // }
    
    // $.ajax({
    //     url:urlRoot + 'clients/'+legalText+'/'+ctid,
    //     datatype: 'JSON',
    //     type: 'GET',
    //     success: function (data) { 
    //         if(legalStatus = 1){
    //             $('#clientsContact_relation').val(data.relation);
    //         }else{
    //             $('#clientsContact_designation').val();
    //             $('#clientsContact_purpose').val();
    //         }
    //     },
    //     error: function (error){
    //         console.log(error.responseText);
    //     }

    // });


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

    if(legalStatus == '1') {
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
            headers:{
                "X-CSRFToken": csrftoken
            },
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

    function addQuickContact(){
        var titleId = $('#clientsContact_title').val();
        var titleText = $('#clientsContact_title').find('option:selected').text();
        
        var Name = $('#clientsContact_Name').val();
        var gender = $('#clientsContact_Gender').val();
        var email = $('#clientsContact_email').val();
        var phone = $('#clientsContact_phone').val();
        var relation = $('#clientsContact_relation').val();
        var relationText = $('#clientsContact_relation').find('option:selected').text();;
        var designation = $('#clientsContact_designation').val();
        var designationText = $('#clientsContact_designation').find('option:selected').text();
        var purpose = $('#clientsContact_purpose').val();
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

            //data for sending to client company
            contactId = cid;
        }

        if (titleId && Name && email && phone) {
            if(legal == 1){
                window.opener.AddContactPerson(contactId, titleText, Name, email, phone, relationText, relation, designationText, purpose,legal);
            }else{
                window.opener.AddContactPerson(contactId, titleText, Name, email, phone, relationText, relation, designationText, purpose,legal);
            }
            swal("Contact Added!", "success");
            window.close();
        } else {
            swal('Please fill all the columns!!');
        }
        
    }

    $(document).on('click','#add_to_clientsContact',addQuickContact);

});