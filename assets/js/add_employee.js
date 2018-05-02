
$(document).ready(function () {


    $.getJSON('http://35.202.86.61/office-management/contacts/form-data',function(data){
        
        for (var i = 0; i < data.designations.length; i++) {
            $('#employee_designation').append('<option value=' + data.designations[i].id+'>'+data.designations[i].designation+'</option>');
        }
        for (var i = 0; i < data.titles.length; i++) {
            $('#employee_title').append('<option value='+data.titles[i].id+'>'+data.titles[i].title+'</option>');
        }
        for (var i = 0; i < data.categories.length; i++) {
            $('.contactnumber_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
            $('.email_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
        }
    });
    
    var addContactRow = `
    <div class='new row well'>
        <div class='col-xs-2 col-sm-2'>
            <label class='checkbox m-l-22'>
                <input type='radio' update-ctrl="phone_numbers" name="CNChecked" class='cn_is_primary'><i class='rounded-x m-l-10'></i>
            </label>
        </div>
        <div class='col-xs-3 col-sm-3'>
            <label class='select'>
                <select update-ctrl="phone_numbers" class='contactnumber_category select2 editselect'>
                    
                </select>
            </label>
        </div>
        <div class='col-xs-5 col-sm-5'>
            <label class='input'>
                <input update-ctrl="phone_numbers" type='number' class='addContact_contactNumbers' minlength='9' maxlength='15' placeholder='10 digit number'>
            </label>
        </div>
        <div class='col-xs-2 col-sm-2'>
            <div id='remove-contact' class='text-center text-danger'>
                <span class='centerAlign'><i class='glyphicon glyphicon-remove fa-lg'></i></span>
            </div>
        </div>
    </div>
    `
    var addEmailRow = `
    <div class='new row well'>
        <div class='col-xs-2 col-sm-2'>
            <label class='checkbox m-l-22'>
                <input type='radio' update-ctrl="email_addresses" name="EAChecked" class='ea_is_primary'><i class='rounded-x m-l-10'></i>
            </label>
        </div>
        <div class='col-xs-3 col-sm-3'>
            <label class='select'>
                <select update-ctrl="email_addresses" class='email_category select2 editselect'>
                    
                </select>
            </label>
        </div>
        <div class='col-xs-5 col-sm-5'>
            <label class='input'>
                <input update-ctrl="email_addresses" type='email' class='addContact_emailIds email_valid' placeholder='e.g. abc@gmail.com/'>
            </label>
        </div>
        <div class='col-xs-2 col-sm-2'>
            <div id='remove-email' class='text-center text-danger'>
                <span class='centerAlign'><i class='glyphicon glyphicon-remove fa-lg'></i></span>
            </div>
        </div>
    </div>
    `

    //adding contact entry tab in contact form
    function addEmailRows(){
        $('#email-row')
            .append(addEmailRow);
        $('#email-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();

        for (var i = 0; i < glob2.categories.length; i++) {
            $('#email-row .new:last .email_category').append('<option value='+glob2.categories[i].id+'>'+glob2.categories[i].category+'</option>');
        }
    }
    
    $('#addemail').on('click',addEmailRows);
    
    //remove contactEntered data tab in contact form
    $('#email-row').on('click','#remove-email',function(){
        $(this).parentsUntil('#email-row').remove();

        //UpdateCont.push($(this));
    });
    

    //multiple entries tab in email
    function addContactRows(){
        $('#contact-row')
            .append(addContactRow);
        $('#contact-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();

        for (var i = 0; i < glob2.categories.length; i++) {
            $('#contact-row .new:last .contactnumber_category').append('<option value='+glob2.categories[i].id+'>'+glob2.categories[i].category+'</option>');
        }
    
    }

    $('#addcontact').on('click',addContactRows);
    
    //remove contactEntered data tab in contact form
    $('#contact-row').on('click','#remove-contact',function(){
        $(this).parentsUntil('#contact-row').remove();

        //UpdateCont.push($(this));
    });


});