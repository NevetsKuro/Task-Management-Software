
$(document).ready(function () {
    
    var id = GetURLParams();
    var empId = id['eid'];
    var update = false;
    var glob2;
    if(empId){
        update = true;
    }
    // var urlRoot = 'http://35.202.86.61/office-management/';
    ////////////////////////////////////      FORM DATA       ///////////////////////////////////////////////////////
    $.getJSON(urlRoot+'contacts/form-data',function(data){
        glob2 = data
        for (var i = 0; i < data.designations.length; i++) {
            $('#employee_designation').append('<option value=' + data.designations[i].id+'>'+data.designations[i].designation+'</option>');
        }
        for (var i = 0; i < data.departments.length; i++) {
            $('#employee_department').append('<option value=' + data.departments[i].id+'>'+data.departments[i].department+'</option>');
        }
        for (var i = 0; i < data.titles.length; i++) {
            $('#employee_title').append('<option value='+data.titles[i].id+'>'+data.titles[i].title+'</option>');
        }
        for (var i = 0; i < data.categories.length; i++) {
            $('.contactnumber_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
            $('.email_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
        }
    });
    

    
    ////////////////////////////////////      MULTIPLE ROWS     ///////////////////////////////////////////////////////
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
    `;
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
    `;

    //////////////////////////////////  adding contact entry tab in contact form   //////////////////////////////////
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


    ///////////////////////////////////////////  GET REQUEST   /////////////////
    if(update){
        $.getJSON(urlRoot+'employees/'+empId,function(data){
            
            $('#employee_name').val(data.name);
            $('#employee_title').val(data.title);
            var formatted9 = $.datepicker.formatDate("dd/mm/yy", new Date(data.dob));
            $('#employee_dob').val(formatted9);
            $('#employee_designation').val(data.designation);
            $('#employee_location').val(data.location);
            $('#employee_department').val(data.department);
            $('#employee_ctc').val(data.ctc);
            //$('#employee_reportingManager').val(data.reportingManager);
            var multiNums = data.emp_phone_numbers;
            var multiEmail = data.emp_email_addresses;
            for(let i = 0; i < multiNums.length; i++) {
                if(i>0){
                    addContactRows();
                    $('#contact-row .new:last .contactnumber_category').val(multiNums[i].category).trigger('change');
                    $('#contact-row .new:last .addContact_contactNumbers').val(parseInt(multiNums[i].number.toString().slice(3),10));
                    $('#contact-row .new:last .cn_is_primary').attr('checked',multiNums[i].is_primary);
                    
                }else{
                    $('#contact-row .new .contactnumber_category').val(multiNums[i].category).trigger('change');
                    $('#contact-row .new .addContact_contactNumbers').val(parseInt(multiNums[i].number.toString().slice(3),10));
                    $('#contact-row .new .cn_is_primary').attr('checked',multiNums[i].is_primary);
                }
            }
            
            for(let i = 0; i < multiEmail.length; i++){
                if(i>0){
                    addEmailRows();
                    $('#email-row .new:last .email_category').val(multiEmail[i].category).trigger('change');
                    $('#email-row .new:last .addContact_emailIds').val(multiEmail[i].email);
                    if(multiEmail[i].category == 1){
                        $('#email-row .new:last .addContact_emailIds').attr('disabled',true);
                    }
                    $('#email-row .new:last .ea_is_primary').attr('checked',multiEmail[i].is_primary);
                }else{
                    $('#email-row .new .email_category').val(multiEmail[i].category).trigger('change');
                    $('#email-row .new .addContact_emailIds').val(multiEmail[i].email);
                    if(multiEmail[i].category == 1){
                        $('#email-row .new:last .addContact_emailIds').attr('disabled',true);
                    }
                    $('#email-row .new .ea_is_primary').attr('checked',multiEmail[i].is_primary);
                }
            }
        });
    }

    function checkValidation(){
        let name = $('#employee_name').val();
        let title = $('#employee_title').val();
        let dob = $('#employee_dob').val();
        let designation = $('#employee_designation').val();
        let location = $('#employee_location').val();
        let department = $('#employee_department').val();
        let ctc = $('#employee_ctc').val();
        let rm = $('#employee_reportingManager').val();

        if(name==''){
            swal('Please add a name');
            $('#employee_name').focus();
            return false;
        }
        if(title==''){
            swal('Please add a title');
            $('#employee_title').focus();
            return false;
        }
        if(dob==''){
            swal('Please add a Date of birth');
            $('#employee_dob').focus();
            return false;
        }
        if(department==null){
            swal('Please add a department');
            $('#employee_department').focus();
            return false;
        }
        if($('.addContact_contactNumbers').val()==''){
            swal('Please add a contact number');
            $('.contactnumber_category').focus();
            return false;
        }
        if($('.addContact_emailIds').val()==''){
            swal('Please add a email');
            $('.addContact_emailIds').focus();
            return false;
        }
        return true;
    }

    $(document).on('click','#submit_employee',function(){

        var valid = checkValidation();

        if(valid){
            var employeeObj = new Object();
            employeeObj.name = $('#employee_name').val();
            employeeObj.title = parseInt($('#employee_title').val());
            employeeObj.dob = getFormateDateToServer($('#employee_dob').val());
            employeeObj.designation = $('#employee_designation').val();
            employeeObj.locations = "4";//$('#employee_location').val();
            employeeObj.department = parseInt($('#employee_department').val());
            employeeObj.ctc = $('#employee_ctc').val();
            //employeeObj.rm = [1];//$('#employee_reportingManager').val();
            employeeObj.emp_email_addresses = getEmailRow();
            employeeObj.emp_phone_numbers = getContactRow();

            var empJSON = JSON.stringify(employeeObj);
            console.log('employee JSON is : ' + empJSON);

            if(!update){
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'employees/',
                    type:'POST',
                    datatype:'JSON',
                    headers:{
                        "X-CSRFToken": csrftoken
                    },
                    data:empJSON,
                    processData: false,
                    success:function(data){
                        swal('Employee was Added!');
                    },
                    error:function(){
                        swal('Employee couldn\'t be Added');
                    }
                });
            }else if(update){
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'employees/'+empId+'/?',
                    type:'PUT',
                    datatype:'JSON',
                    headers:{
                        "X-CSRFToken": csrftoken
                    },
                    processData: false,
                    data:empJSON,
                    success:function(data){
                        swal('Employee was updated!');
                    },
                    error:function(error){
                        swal('Employee couldn\'t be updated');
                        console.log(error.responseText);
                    }
                });
            }
        }
    });
});