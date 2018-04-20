$(document).ready(function(){

    var urlParams = GetURLParams();
    var legalStatus = urlParams['legalStatus'];
    var contactId = urlParams['id'];

        //auto filling forms prefilled data
    $.ajax({
        url: 'http://office-management-demo.herokuapp.com/contacts/form-data',
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
            console.log('Pre filled data added!!!');
        },
        error: function (data) {
            swal('Server is not working:' + data);
        }
    });    

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
            url: 'http://office-management-demo.herokuapp.com/contacts/?',
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


    $(document).on('click','#add_to_clientsContact',addQuickContact);

    function addQuickContact(){
        var titleId = $('#clientsContact_title').val();
        var titleText = $('#clientsContact_title').find('option:selected').text();
        
        var Name = $('#clientsContact_Name').val();
        var gender = $('#clientsContact_Gender').val();
        var email = $('#clientsContact_email').val();
        var phone = $('#clientsContact_phone').val();
        var relation = $('#clientsContact_relation').val();
        var designation = $('#clientsContact_designation').val();
        var purpose = $('#clientsContact_purpose').val();
        var legal = $('#client_legalstatus').val();

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
        }

        if (titleId && Name && email && phone) {
            window.opener.AddContactPerson(cid, titleId, titleText, Name, email, phone, relation, designation, purpose,legal);
            swal("Contact Added!", "success");
        } else {
            swal('Please fill all the columns!!');
        }
    }


});