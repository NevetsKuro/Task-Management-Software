///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    CLIENT ADD PAGE //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Quick add form


$(document).ready(function () {

    var urlParams = GetURLParams();

    var contact = urlParams['contact'];
    var client = urlParams['client'];


    ///////////////////////////////////////////////// Organisation Code


    //searching list for organisations
    $(document).on('click','#search_organisations',function(event){
        //event.preventDefault();
        var searchOrgKeyword = $('#searchOrgKeyword').val();

        if(searchOrgKeyword != ""){
        $.ajax({
            url:"http://office-management-demo.herokuapp.com/organisations/?name="+searchOrgKeyword,
            method:'GET',
            datatype:'JSON',
            success:function(orgList){
                
                if(orgList.length){
                    var display2 = ' ';
                    for (i = 0; i < orgList.length; i++) {
                        
                        display2 += `
                        <div class='col-xs-12 col-sm-12'>
                        <div class='col-xs-4 col-sm-4 f-s-12'>${i+1}</div>
                        <div class='col-xs-4 col-sm-4 f-s-12 yellow-line'>${orgList[i].name}</div>
                        <div class='col-xs-3 col-sm-3 f-s-12'>${orgList[i].group}</div>
                        <div class='col-xs-1 col-sm-1 orgClick' id='${orgList[i].id}'><b><i class='button btn-default btn-flat icon-check fg-yellow darker-2 hvr-box-shadow-outset p-5'></i></b></div>
                        </div><span class='col-xs-12 col-sm-12 p-5'></span>
                        `;
                    }
                    $('#orgList').html(display2);
                    $('#organisation-modal').modal('show');
                }else{
                    swal('Organisation cannot be found!!!');
                }

            },
            error:function(error){
                swal('Cannot fetch Organisation List');
                console.log(error.responseText);
            }
        });
        }else{
            swal('search cannot be empty!!!');
        }

    });


    window.client_organisation = function (){
        if($(this).attr('id')){
            var orgId = $(this).attr('id');
        }else{
            var orgId = updatedOrgId;
        }
        
    $.ajax({
            url:'https://office-management-demo.herokuapp.com/organisations/'+orgId +'/',
            type:'GET',
            contentType:'application/json',
            datatype:'JSON',
            success:function(data){

                $('.nameofBusiness').val(data.name);
                $('#website').val(data.website);
                $('#client_group').val(data.group).trigger('change');
                $('#businessType').val(data.business_types).trigger('change');
                $('#industryType').val(data.industry_types).trigger('change');
                $('#nature_business').val(data.business_natures).trigger('change');
                var multiBrns = data.branches
                $('#hoaddress-row .new').each(function(index){
                    if(index>0){
                        $(this).remove();
                    }
                });
            
                for(let i=0; i < multiBrns.length; i++){
                    if(i > 0){
                        // addAddresses();
                        addBranchRows();
                        // $('#hoaddress-row .new:last .hoaddress_from').attr('id',multiBrns[i].id);
                        $('#branch-row .new:last .branch_name').val(multiBrns[i].name);
                        $('#branch-row .new:last .branch_address').val(multiBrns[i].address);
                        // $('#hoaddress-row .new:last .hoaddress_isHO').attr('checked',multiBrns[i].is_head_office);
                    }else{
                        // $('#hoaddress-row .new .hoaddress_from').attr('id',multiBrns[i].id);
                        $('#branch-row .new .branch_name').val(multiBrns[i].name);
                        $('#branch-row .new .branch_address').val(multiBrns[i].address);
                        // $('#hoaddress-row .new .hoaddress_isHO').attr('checked',multiBrns[i].is_head_office);
                    }
                }
                currentOrganisationsId = data.id;
                $('#editOrganisation').attr('oid',currentOrganisationsId).removeAttr('disabled');
                $('#organisation-modal').modal('hide');

            },
            error:function(error){
                swal('Contact\'s Organisations cannot be fetched!!');
                console.log(error.responseText);
            }
        });
    }



    $(document).on('click','.orgClick',client_organisation);

    $(document).on('click','#editOrganisation',function(){
        currentOrganisationsId = $(this).attr('oid');
        var currentClientId = client;
        // var url = "addOrganisation.html?id="+currentOrganisationsId+'&cid='+currentContactsId;
        window.open("addOrganisation.html?id="+currentOrganisationsId+'&ctid='+currentClientId, "","menubar=0,titlebar=0,status=0,resizable=1,top=100,left=100,width=1200,height=450");
        // $(location).attr('href',url);
    });

    $(document).on('click','.addNewOrg',function(){
        window.open('addOrganisation.html?ctid='+client,'',"menubar=0,titlebar=0,status=0,resizable=1,top=100,left=100,width=700,height=450");
    });







    //////////////////////////////////////////////////

    $.ajax({
        url: 'https://heroku-office-client.herokuapp.com/client/get-groups/',
        datatype: 'JSON',
        type: 'GET',
        success: function (groups) {
            for (var i = 0; i < groups.length; i++) {
                $('#client_group').append('<option value=' + groups.id + '>' + groups.group + '</option>');
            }
        }

    })

    
    //PopulateStates('#state');


    $.ajax({
        url: 'http://office-management-demo.herokuapp.com/organisations/form-data',
        datatype: 'JSON',
        type: 'GET',
        success: function (data) {
            glob = data;
            for (var i = 0; i < data.business_natures.length; i++) {
                $('#nature_business').append('<option value=' + data.business_natures[i].id + '>' + data.business_natures[i].business_nature + '</option>');
            }

            for (var i = 0; i < data.industry_types.length; i++) {
                $('#industryType').append('<option value=' + data.industry_types[i].id + '>' + data.industry_types[i].industry_type + '</option>');
            }

            for (var i = 0; i < data.business_types.length; i++) {
                $('#businessType').append('<option value=' + data.business_types[i].id + '>' + data.business_types[i].business_type + '</option>');
            }
            console.log('Company Prefilled data Added.')

        },
        error: function (data) {
            swal('Server is not working:' + data);
        }
    });



    //auto filling forms prefilled data
    $.ajax({
        url: 'http://office-management-demo.herokuapp.com/contacts/form-data',
        datatype: 'JSON',
        type: 'GET',
        success: function (data) {
            glob2 = data;
            for (var i = 0; i < data.titles.length; i++) {
                $('.selTitle').append('<option value=' + data.titles[i].id + '>' + data.titles[i].title + '</option>');
            }

            for (var i = 0; i < data.categories.length; i++) {
                $('.contactnumber_category').append('<option value=' + data.categories[i].id + '>' + data.categories[i].category + '</option>');
                $('.email_category').append('<option value=' + data.categories[i].id + '>' + data.categories[i].category + '</option>');
                $('.address_category').append('<option value=' + data.categories[i].id + '>' + data.categories[i].category + '</option>');
            }

            for (var i = 0; i < data.services.length; i++) {
                $('#services').append('<option value=' + data.services[i].id + '>' + data.services[i].service + '</option>');
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





    // Convert to client has been selected
    if (contact != undefined && contact != '') {
        $.ajax({
            url: 'http://office-management-demo.herokuapp.com/contacts/' + contact,
            datatype: 'JSON',
            type: 'GET',
            success: function (contact) {
                //Fill the form with details about the contact
                AddPhone(contact.phone_numbers);
                AddEmail(contact.email_addresses);
                AddAddress([contact.address]);
                AddBranch(contact.contact_organisation.organisation.branches);


                $('.selTitle').val(contact.title);


                var ns = breakName(contact.name);
                $('.inpFirstName').val(ns.firstName);
                $('.inpMiddleName').val(ns.middleName);
                $('.inpLastName').val(ns.lastName);

                var formattedDate = $.datepicker.formatDate("dd/mm/yy", new Date(contact.dob));
                $('.inputdob').val(formattedDate);

                $('#website').val(contact.contact_organisation.website);

                $('#Proprietor_name').val(contact.contact_organisation.organisation.name);
                $('#LLP_name').val(contact.contact_organisation.organisation.name);
                $('#company_name').val(contact.contact_organisation.organisation.name);
                $('#AOP_name').val(contact.contact_organisation.organisation.name);
                $('#trust_name').val(contact.contact_organisation.organisation.name);

                $('#trust_name').val(contact.contact_organisation.organisation.name);

                $('#nature_business').val(contact.contact_organisation.organisation.business_natures);
                $('#industryType').val(contact.contact_organisation.organisation.industry_types);
                $('#businessType').val(contact.contact_organisation.organisation.business_types);

            }
        });
    }

    //Client is being edited
    if (client != undefined && client != '') {
        $.ajax({
            url: 'http://office-management-demo.herokuapp.com/cients/' + client,
            datatype: 'JSON',
            type: 'GET',
            success: function (client) {
                //Fill the form with details about the client
                AddPhone(client.phone_numbers);
                AddEmail(client.email_addresses);
                AddAddress(client.address);



                AddPhone(contact.phone_numbers);
                AddEmail(contact.email_addresses);
                AddAddress([contact.address]);
                AddBranch(contact.contact_organisation.organisation.branches);



                $('.selTitle').val(client.title);

                var ns = breakName(client.name);
                $('.inpFirstName').val(ns.firstName);
                $('.inpMiddleName').val(ns.middleName);
                $('.inpLastName').val(ns.lastName);
                $('.inputdob').val(client.dob);
                $('#website').val(client.contact_organisation.website);
                $('#Proprietor_name').val(client.client_organisation.name);
                $('#LLP_name').val(client.client_organisation.name);
                $('#company_name').val(contact.contact_organisation.name);
                $('#AOP_name').val(client.contact_organisation.name);
                $('#trust_name').val(client.contact_organisation.name);
                $('#trust_name').val(client.contact_organisation.name);
                $('#nature_business').val(client.business_natures);
                $('#industryType').val(client.industry_types);
                $('#businessType').val(client.business_types);

            }
        });
    }



    //get POC for the selected group
    $('#client_group').on('change', function () {
        var selectedGroup = $('#client_group').find('option:selected').text();

        $.ajax({
            url: 'http://office-management-demo.herokuapp.com/contacts',
            datatype: 'JSON',
            type: 'GET',
            data: 'group=' + selectedGroup,
            success: function (contacts) {
                //Fill these contacts in 'Contact Person' table
                if (contacts.length > 0) {
                    for (var c = 0; c < contacts.length; c++) {
                        var cont = contacts[c];

                        AddContactPerson(cont.id, cont.title, cont.name, cont.email_addresses[0], cont.phone_numbers[0], '',
                            cont.contact_organisation.designation, '');
                    }
                }
            },
            error(err) {
                console.log(err);
            }
        });
    });

    //checkbox option(if yes)
    if ($('#company_listed').val() === 'yes') {
        $('company_stock').addClass('hide');
    }
    //client forms legal status - hiding all elements
    function hideclient_elements() {
        $('#tab1 .elem').each(function () {
            $(this).addClass('hide');
        });
    }
    hideclient_elements();
    $('#Individual').removeClass('hide');

    var legal;
    $('#client_legalstatus').on('change', function () {
        var selected = this.value;
        legal = selected;
        hideclient_elements();
        //$('a_branch').removeClass('hide');
        $('.relation_tab').addClass('hide');

        if (selected == '1') {
            $('#Individual').removeClass('hide');
            $('.a_branch').addClass('hide');
            $('#companyCommon').addClass('hide');
            $('.relation_tab').removeClass('hide');
            $('.designation_tab').addClass('hide');
            $('.service_tab').addClass('hide');
            $('.organis').addClass('hide');
            cC_table.column(5).visible(true);
            cC_table.column(6).visible(false);
            cC_table.column(7).visible(false);

        } else if (selected == '2') {
            $('#HUF').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else if (selected == '3') {
            $('#Proprietor').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else if (selected == '4') {
            $('#PartnershipFirm').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else if (selected == '5') {
            $('#LLP').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else if (selected == '6') {
            $('#Company').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else if (selected == '7') {
            $('#AOP').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else if (selected == '8') {
            $('#trust').removeClass('hide');
            $('.a_branch').removeClass('hide');
            $('#companyCommon').removeClass('hide');
            $('.relation_tab').addClass('hide');
            $('.designation_tab').removeClass('hide');
            $('.service_tab').removeClass('hide');
            $('.organis').removeClass('hide');
            cC_table.column(5).visible(false);
            cC_table.column(6).visible(true);
            cC_table.column(7).visible(true);
        } else {
            alert('please select a status');
        }
    });




    //************Multiple entries for phones

    var addContactRow = `
    <div class='new row well'>
        <div class='col-xs-4 col-sm-4'>
            <label class='select'>
                <select class='contactnumber_category select2 editselect'>
                    
                </select>
            </label>
        </div>
        <div class='col-xs-6 col-sm-6'>
            <label class='input'>
                <input type='number' class='addContact_contactNumbers' minlength='9' maxlength='15' placeholder='10 digit number'>
            </label>
        </div>
        <div class='col-xs-2 col-sm-2'>
            <div id='remove-contact' class='text-center text-danger'>
                <span class='centerAlign'><i class='glyphicon glyphicon-remove fa-lg'></i></span>
            </div>
        </div>
    </div>
    `




    function addContactRows() {
        $('#contact-row')
            .append(addContactRow);
        $('#contact-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();

        for (var i = 0; i < glob2.categories.length; i++) {
            $('#contact-row .new:last .contactnumber_category').append('<option value=' + glob2.categories[i].id + '>' + glob2.categories[i].category + '</option>');
        }

    }


    function AddPhone(values) {
        for (let i = 0; i < values.length; i++) {
            if (i > 0) {
                addContactRows();
                $('#contact-row .new:last .contactnumber_category').val(values[i].category); //;
                $('#contact-row .new:last .addContact_contactNumbers').val(parseInt(values[i].number.toString().slice(3), 10));
                // console.log(multiNums[i].number);
            } else {
                $('#contact-row .new .contactnumber_category').val(values[i].category); //;
                $('#contact-row .new .addContact_contactNumbers').val(parseInt(values[i].number.toString().slice(3), 10));
            }
        }
    }

    $('#addcontact').on('click', addContactRows);


    $('#contact-row').on('click', '#remove-contact', function () {
        $(this).parents('.new').remove();
    });

    $(document).on('change', ".phonenumber_valid", function () {
        var inputvalues = $(this).val();
        var phoneformat = new RegExp('^[0-9]{10}$');

        if (phoneformat.test(inputvalues)) {
            return true;
        } else {
            swal('Wrong Format', 'Please Enter Valid Phone Number', 'error');
            $(this).val('');
            $(this).focus();
        }

    });
    //******************End - Multiple entries for phones


    //**************Multiple entries for email

    var addEmailRow = `
        <div class='new row well'>
            <div class='col-xs-4 col-sm-4'>
                <label class='select'>
                    <select class='email_category select2 editselect'>
                        
                    </select>
                </label>
            </div>
            <div class='col-xs-6 col-sm-6'>
                <label class='input'>
                    <input type='email' class='addContact_emailIds email_valid' placeholder='e.g. abc@gmail.com/'>
                </label>
            </div>
            <div class='col-xs-2 col-sm-2'>
                <div id='remove-email' class='text-center text-danger'>
                    <span class='centerAlign'><i class='glyphicon glyphicon-remove fa-lg'></i></span>
                </div>
            </div>
        </div>
        `;


    function addEmailRows() {
        $('#email-row')
            .append(addEmailRow);
        $('#email-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();

        for (var i = 0; i < glob2.categories.length; i++) {
            $('#email-row .new:last .email_category').append('<option value=' + glob2.categories[i].id + '>' + glob2.categories[i].category + '</option>');
        }
    }

    function AddEmail(values) {
        for (let i = 0; i < values.length; i++) {
            if (i > 0) {
                addEmailRows();
                $('#email-row .new:last .email_category').val(values[i].category);
                $('#email-row .new:last .addContact_emailIds').val(values[i].email);
            } else {
                $('#email-row .new .email_category').val(values[i].category);
                $('#email-row .new .addContact_emailIds').val(values[i].email);
            }
        }
    }
    $('#addEmail').on('click', addEmailRows);



    $('#email-row').on('click', '#remove-email', function () {
        $(this).parents('.new').remove();
    });
    //************** End - Multiple entries for email





    //***************** multiple entries for address

    var addAddressRow = `
        <div class="row new well">
            <div class="col-sm-2">
                <label class="select">
                    <select class="select2 editselect address_category"></select>
                </label>
            </div>
            <div class="col-sm-3">
            <label class="textarea textarea-expandable">
                    <textarea class=address_street rows="3"></textarea>
            </label>
            </div>
            <div class="col-sm-2">
                <label class="input">
                    <input class="address_state=" type="text">
                </label>
            </div>
            <div class="col-sm-2">
                <label class="input">
                    <input class="address_city" type="text">
                </label>
            </div>
            <div class="col-sm-2">
                <label class="input">
                    <input class="address_pincode" type="number" >
                </label>
            </div>
            <div class="col-sm-1">
                <div id="remove-address" class="text-center text-danger">
                    <span class="centerAlign p-t-10">
                        <i class="glyphicon glyphicon-remove fa-lg"></i>
                    <span>
                </div>
            </div>
        </div>
    `


    function addAddressRows() {
        $('#address-row')
            .append(addAddressRow);
        $('#address-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();

        for (var i = 0; i < glob2.categories.length; i++) {
            $('#address-row .new:last .address_category').append('<option value=' + glob2.categories[i].id + '>' + glob2.categories[i].category + '</option>');
        }
    }



    function AddAddress(values) {
        for (let i = 0; i < values.length; i++) {
            var address = breakAddress(values[i]);
            if (i > 0) {
                addAddressRows();
                $('#address-row .new:last .address_category').val(values[i].category); //;
                $('#address-row .new:last .address_street').val(address.StreetAddress);
                $('#address-row .new:last .address_state').val(address.State);
                $('#address-row .new:last .address_city').val(address.City);
                $('#address-row .new:last .address_pincode').val(address.Pincode);


                // console.log(multiNums[i].number);
            } else {
                $('#address-row .new .address_category').val(values[i].category); //;
                $('#address-row .new .address_street').val(address.StreetAddress);
                $('#address-row .new .address_state').val(address.State);
                $('#address-row .new .address_city').val(address.City);
                $('#address-row .new .address_pincode').val(address.Pincode);

            }
        }
    }

    $('#add_maddress').on('click', addAddressRows);


    $('#address-row').on('click', '#remove-address', function () {
        $(this).parents('.new').remove();
    });


    //******************End - Multiple entries for address


    //**********Add branch in client
    var addbranch = `
        <div class="new row well">
        <div class="col-sm-2">
                <label class="input">
                <input id="branch_name" class="branch_name" type="text">
                </label>
        </div>
        <div class="col-sm-3">
                <label class="input">
                <input id="branch_address" class="branch_address" type="text">
                </label>
        </div>
        <div class="col-sm-2">
                <label class="input">
                <input id="branch_GSTIN" class="branch_gst gstinnumber" type="number">
                </label>
        </div>
        <div class="col-sm-2">
            <label class="input">
                <input id="branch_phone" class="branch_phone phonenumber_valid" type="number" required>
                </label>
        </div>
        <div class="col-sm-2">
                <label class="input">
                <input id="branch_email" class="branch_email" type="email" placeholder="e.g. abc@example.com" required>
                </label>
        </div>
        <div class="col-sm-1">
        <div id="removebranch" class="text-center text-danger">
            <span class="centerAlign p-t-10">
                <i class="glyphicon glyphicon-remove fa-lg"></i>
            <span>
        </div>
        </div>
        </div>
        `

    function addBranchRows() {
        $('#branch-row')
            .append(addbranch);
        $('#branch-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();


    }

    function AddBranch(values) {
        for (let i = 0; i < values.length; i++) {
            if (i > 0) {
                addBranchRows();
                $('#branch-row .new:last .branch_name').val(values[i].name); //;
                $('#branch-row .new:last .branch_address').val(values[i].address);
                // $('#branch-row .new:last .branch_gst').val(address.State);
                // $('#branch-row .new:last .branch_phone').val(address.City);
                // $('#branch-row .new:last .branch_email').val(address.Pincode);


                // console.log(multiNums[i].number);
            } else {
                $('#branch-row .new .branch_name').val(values[i].name); //;
                $('#branch-row .new .branch_address').val(values[i].address);
                // $('#branch-row .new .branch_gst').val(address.State);
                //$('#branch-row .new .branch_phone').val(address.City);
                // $('#branch-row .new .branch_email').val(address.Pincode);

            }
        }
    }



    $('#addbranch').on('click', addBranchRows);

    $('#branch-row').on('click', "#removebranch", function () {
        $(this).parents('.new').remove();
    });


    //****** End - Add Branch */


    ///***********Add partners
    var addpartner = `
    <div class="new row well">
    <div class="col-sm-6">
        <label class="input">
            <input class="partnerName" type="text">
        </label>
    </div>
    <div class="col-sm-5">
        <label class="input">
            <input class="partnershare" type="number" min="1" max="100">
        </label>
    </div>
    <div class="col-sm-1">
        <div id="removepartner" class="text-center text-danger">
            <i class="glyphicon glyphicon-remove m-t-13 fa-lg"></i>
        </div>
    </div>
</div>`



    function addPartnerRows() {
        $('#partner-row')
            .append(addpartner);
        $('#partner-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();


    }

    function AddPartner(values) {
        for (let i = 0; i < values.length; i++) {
            if (i > 0) {
                addPartnerRows();
                $('#partner-row .new:last .partnerName').val(values[i].name);
                $('#partner-row .new:last .partnershare').val(values[i].address);


                // console.log(multiNums[i].number);
            } else {
                $('#partner-row .new .partnerName').val(values[i].name);
                $('#partner-row .new .partnershare').val(values[i].address);

            }
        }
    }


    $('#addpartner').on('click', addPartnerRows);

    $('#partner-row').on('click', "#removepartner", function () {
        $(this).parents('.new').remove();
    });




    //Multple entries for directors
    var addirector =
        `<div class="new row well">
        <div class="col-sm-5">
            <label class="input">
            <input class="company_directors" id="company_directors" type="text">
            </label>
        </div>
        <div class="col-sm-5">
            <label class="input">
                <input class="company_din_directors din_valid" id="company_din_directors" type="number" >
            </label>
        </div>
        <div class="col-sm-1">
            <div id="removedirector" class="text-center text-danger">
                    <i class="glyphicon glyphicon-remove fa-lg"></i>
                </div>
            </div>
        </div>
        `;



    function addDirectorRows() {
        $('#director-row')
            .append(addirector);
        $('#director-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();


    }

    function AddDiretor(values) {
        for (let i = 0; i < values.length; i++) {
            if (i > 0) {
                addDirectorRows();
                $('#director-row .new:last .company_directors').val(values[i].name); //;
                $('#director-row .new:last .company_din_directors').val(values[i].address);



                // console.log(multiNums[i].number);
            } else {
                $('#director-row .new .company_directors').val(values[i].name); //;
                $('#director-row .new .company_din_directors').val(values[i].address);


            }
        }
    }


    $('#adddirector').on('click', addDirectorRows);


    $('#director-row').on('click', '#removedirector', function () {
        $(this).parents('.new').remove();
    });




    //multple entries for details of designation partners
    //$('#addDpartners').on('click', function () {
    //    $('#design_partners').append(
    var designatedPartner =
        `<div class="row new well">
            <div class="col-sm-6">
                    <label class="input">
                    <input id="LLP_designatedpartner" class="LLP_designatedpartner" type="text">
                    </label>
            </div>
            <div class="col-sm-5">
                    <label class="input">
                    <input id="LLP_din_designatedpartner" class="LLP_din_designatedpartner" type="number" max="9" min="7">
                    </label>
            </div>
            <div class="col-sm-1 text-center text-danger">
                    <span id="remove-Dpartner">
                        <i class="glyphicon glyphicon-remove fa-lg m-t-15"></i> 
                    </span>
            </div>
        </div>
        `;

    function addDPartnerRows() {
        $('#dpartner-row')
            .append(designatedPartner);
        $('#dpartner-row .new:last').addClass('zoomInUp animated').show('fast');
        editSelect();
    }

    function AddDPartner(values) {
        for (let i = 0; i < values.length; i++) {
            if (i > 0) {
                addDPartnerRows();
                $('#dpartner-row .new:last .branch_name').val(values[i].name); //;
                $('#dpartner-row .new:last .branch_address').val(values[i].address);
                // $('#branch-row .new:last .branch_gst').val(address.State);
                // $('#branch-row .new:last .branch_phone').val(address.City);
                // $('#branch-row .new:last .branch_email').val(address.Pincode);


                // console.log(multiNums[i].number);
            } else {
                $('#dpartner-row .new .branch_name').val(values[i].name); //;
                $('#dpartner-row .new .branch_address').val(values[i].address);
                // $('#branch-row .new .branch_gst').val(address.State);
                //$('#branch-row .new .branch_phone').val(address.City);
                // $('#branch-row .new .branch_email').val(address.Pincode);

            }
        }
    }


    $('#adddPartner').on('click', addDPartnerRows);

    $('#dpartner-row').on('click', '#remove-Dpartner', function () {
        $(this).parents('.new').remove();
    });

    //if listed
    $('#company_listedy').on('change', function () {
        if ($(this).is(':checked')) {
            $('.nofE').removeClass('hide');
        } else {
            $('.nofE').addClass('hide');
        }
    });


    //datatable for contact Person tab in AddClient
    var cC_table = $('#clientsContact_datatable').DataTable({
        // 'ajax': '/lab/jquery-datatables-checkboxes/ids-arrays.txt',
        columnDefs: [{
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            },
            {
                "targets": [1],
                "visible": false,
            },
            {
                "targets": [6],
                "visible": false,
            },
            {
                "targets": [7],
                "visible": false,
            }
        ],
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        order: [
            [4, 'asc']
        ]
    });

    $('#add_clientsContact').on('click', function () {
        // $('#clientsContact_form').removeClass('hide');
        window.open('quick_Add_contact.html?legalStatus='+legal,'',"menubar=0,titlebar=0,status=0,resizable=1,top=100,left=100,width=700,height=450");
    });


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
            AddContactPerson(cid, titleId, titleText, Name, email, phone, relation, designation, purpose,legal);
            swal("Contact Added!", "success");
        } else {
            swal('Please fill all the columns!!');
        }
    }


    window.AddContactPerson = function(id, titleId, title, Name, email, phone, relation, designation, purpose,legal) {

        if (legal == 1) {
            cC_table.row.add([
                '',
                id,
                title+Name,
                email,
                phone,
                relation,
                '',
                '',
                '<div class="text-center text-danger cc_remove"><i class="glyphicon glyphicon-remove"></i></div>'
            ]).draw(false);
        } else {
            cC_table.row.add([
                '',
                id,
                title+Name,
                email,  
                phone,
                '',
                designation,
                purpose,
                '<div class="text-center text-danger cc_remove"><i class="glyphicon glyphicon-remove"></i></div>'
            ]).draw(false);

        }

    }

    // $('#countSelected').on('click', function () {
    //     var row = cC_table.rows('.selected').data();

    //     console.log(row[0][1]);
    // });

    $('#clientsContact_datatable tbody').on('click', 'div.cc_remove', function () {
        swal({
                title: "Are you sure?",
                text: "You want to delete this record!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    cC_table.row($(this).parents('tr')).remove().draw();
                    swal("Poof! Your record has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("The selected row is not deleted!");
                }
            });
    });

    var stat_docs = $('#statDocs').DataTable({
        // 'ajax': '/lab/jquery-datatables-checkboxes/ids-arrays.txt',
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox2',
            targets: 0
        }],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [
            [1, 'asc']
        ]
    });

    $('#submit_addmore').on('click', function () {
        var name = $('#stat_name').val();
        var number = $('#stat_number').val();
        var issuingAuthority = $('#stat_issuingAuthority').val();
        var validFrom = $('#stat_validFrom').val();
        var validTo = $('#stat_validTo').val();
        var applicable = $('#stat_applicable').val();

        stat_docs.row.add([
            '<td class=" select-checkbox"></td>',
            name,
            number,
            issuingAuthority,
            validFrom,
            validTo,
            applicable,
            '<div class="sD_remove text-danger text-center"><i class="glyphicon glyphicon-remove"></i></div>'
        ]).draw(false);

        $('#statDocs tbody').on('click', 'div.sD_remove', function () {
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        stat_docs.row($(this).parents('tr')).remove().draw();
                        swal("The Selected row has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("The selected row is not deleted!");
                    }
                });
        });

        swal("Row added", "Look in the above table!", "success");
    });

    //adding row for satutory document
    $('#show_addmore').click(function () {
        $('#document_form').removeClass('hide');
    });
    $('#close_addmore').click(function () {
        $('#document_form').addClass('hide');
    })

    //adding Service in client
    $('#addService').on('click', function () {
        $('#service').append(`
        
        <div id="newservice" class="row well">
            <div class="col-md-4">
                <label class="select" id=" ">
                    <select class="select2 editselect">
                        <option>#</option>
                    </select>
                </label>
            </div>

            <div class="col-md-4">
                <label class="select" id="">
                    <select class="select2">
                        <option>#</option>
                    </select>
                </label>
            </div>
            <div class="col-md-3">
                <label class="input">
                    <input type="text" name="Org_name" placeholder="">
                </label>
            </div>
            <div id="removeService" class="col-md-1">
                <label class="m-l-20 m-t-10">
                    <span ><i class="glyphicon glyphicon-remove fa-lg text-danger"></i></span>
                </label>
            </div>
        </div>
    `);
        $('#service').children('div:last').addClass('zoomInUp animated').show('fast');
        editSelect();
    });

    $('#service').on('click', '#removeService', function () {
        $(this).parent('#newservice').remove();
    });


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

    var urlRoot = "http://office-management-demo.herokuapp.com/clients/";
    //Save Client details in the DB
    $(document).on('click', '#clientSubmit', function () {
        var o = new Object();

        var url = '';


        o.send_mail = $('#branch_notify').prop('checked');
        if (client != undefined) {
            //edit  
            o.id = client;
            //get changed info and patch


        } else {

            if (contact != undefined) {
                //Convert
                o.prospect = contact;
            } else {
                //Create a new client

                //o.group = $('#client_group').val();

                o.pan_no = $('#PANNO').val();
                //o.website = $('#website').val();
                o.services = [];
                o.services.push(1); //Change later
                //Get POC/Manager/Docs

                var legalStatus = $('#client_legalstatus').val();

                if (legalStatus == 1) {
                    //Create Individual
                    contact = new Object();
                    contact.title = $('#addContact_title').val();
                    contact.name = $('#individual_fname').val();
                    if ($('#individual_mname').val() != '')
                        contact.name += ' ' + $('#individual_mname').val();
                    contact.name += ' ' + $('#individual_lname').val();
                    contact.dob = getFormateDateToServer($('#individual_dob').val());
                    contact.gender = 1; //Change later
                    // Get Phone Nos/Address/Email
                    contact.email_addresses = getEmailRow();
                    contact.phone_numbers = getContactRow();

                    
                    var newId=createQuickContact(contact);

                    if (newId != undefined)
                        o.prospect = newId;
                    //o.typework = $('#TypeWork').val();
                    o.aadhar_no = $('#individual_aadhar').val();

                    //Get POCs

                    var pocRows = cC_table.rows().data();
                    if (pocRows.length > 0) {

                        var row = cC_table.rows('.selected').data();
                        var primaryName='';
                        if(row[0]!=undefined)
                        {
                            primaryName = row[0][4];
                        }
                        else
                        {
                            swal('Select atleast one POC as primary');
                            return;
                        }
                        o.pocs=[];
                        //console.log();




                        for (var c = 0; c < pocRows.length; c++) {
                            var row = pocRows[c];
                            console.log(row);
                            //Create contact for each POC
                            var contact = new Object();
                            contact.title=row[2];//get
                            contact.name=row[4];
                            contact.email_addresses = [{category:1, email: row[5], is_primary:true}];
                            contact.phone_numbers = [{category:1, number: '+91' + row[6], is_primary:true}];
                            contact.gender = 1;
                       
                            newId = createQuickContact(contact);
                            var isPrimary = (primaryName==row[4]);
                            o.pocs.push({
                                "contact":newId,
                                "relation":1,
                                "is_primary":isPrimary
                          })


                        }

                    }

                    url = urlRoot +  'individuals/';

                   
                } else {
                    o.business_nature = $('nature_business').val();
                    o.industryType = $('#industryType').val();
                    o.businessType = $('#businessType').val();
                    o.GSTIN = $('#GSTIN').val();
                    o.TANNO = $('#TANNO').val();
                    //Get Branches


                    for (var c = 0; c < pocRows.length; c++) {
                        var row = pocRows[c];
                        console.log(row);
                        //Create contact for each POC
                        var contact = new Object();
                        contact.title=row[2];//get
                        contact.name=row[4];
                        contact.email_addresses = [{category:1, email: row[5], is_primary:true}];
                        contact.phone_numbers = [{category:1, number: '+91' + row[6], is_primary:true}];
                        contact.gender = 1;
                   
                        newId = createQuickContact(contact);
                        var isPrimary = (primaryName==row[4]);
                        o.pocs.push({
                            "contact":newId,
                            "relation":1,
                            "is_primary":isPrimary
                      })    


                    }


                    if (legalStatus == 2) {
                        //HUF
                        o.name = $('#HUF_name').val();
                        o.dateOfIncorporation = $('#HUF_date').val();
                        o.karta = $('#HUF_nameOfKarta').val();
                        o.businessName = $('#HUF_nameofBusiness').val();

                        url = urlRoot +  'hufs/';


                    } else if (legalStatus == 3) {
                        //Proprietor
                        o.title = $('#prop_Title').val();
                        o.name = $('#Proprietor_fname').val();
                        if ($('#Proprietor_mname').val() != '')
                            o.name += ' ' + $('#Proprietor_mname').val();
                        o.name += ' ' + $('#Proprietor_lname').val();

                        o.businessName = $('#Proprietor_name').val();
                        o.commencemaneDate = $('#Proprietor_dateOfComm').val();

                        url =   urlRoot +  'proprietors/';

                    } else if (legalStatus == 4) {
                        //Partnership
                        o.partnershipDate = $('#Partnership_date').val();
                        o.businessName = $('#Partnership_name').val();
                        o.commencementDate = $('#Proprietor_dateOfComm').val();
                        //Get Details of Partners

                        url =   urlRoot +  'partnership-firms/';

                    } else if (legalStatus == 5) {
                        //LLP
                        o.businessName = $('#LLP_name').val();
                        o.incorporationDate = $('#LLP_date').val();
                        o.OtherpartnerNames = $('#partners_noopartner').val();
                        o.LLPIN = $('#LLP_LLPIN').val();
                        //Get Details of Designated Partners

                        url =   urlRoot +  'llps/';

                    } else if (legalStatus == 6) {
                        //Company
                        o.businessName = $('#company_name').val();
                        o.incorporationDate = $('#company_date').val();
                        o.companyType = $('#company_types').val();
                        o.CIN = $('#company_cin').val();
                        o.Listed = $('#company_listedy').prop('checked');
                        o.company_stock = $('#company_stock').val();
                        //Get Details of Directors

                        url =   urlRoot +  'limited-companies/';

                    } else if (legalStatus == 7) {
                        //AOP-BOI
                        o.members = $('#members').val();
                        o.businessName = $('#AOP_name').val();
                        o.commencemaneDate = $('#AOP_date').val();
                        o.registrationNo = $('#AOP_registration').val();

                        url =   urlRoot +  'aop-boi/';

                    } else if (legalStatus == 8) {
                        //Trusts
                        o.businessName = $('#trust_name').val();
                        o.commencemaneDate = $('#trust_doc').val();
                        o.trusteeName = $('#trusteeName').val();

                        url =   urlRoot +  'trusts/';

                    }



                }

                var clientData = JSON.stringify(o);
                console.log(clientData);
                //Call Add to Individual

                $.ajax({
                    url: url,
                    type: 'POST',
                    contentType: 'application/json',
                    data: clientData,
                    success: function (data) {
                        swal('Client added');

                    },
                    error: function (error) {
                        swal('Not able to create client');
                        console.log('Error in creating client:' + error.responseText);
                    }
                });




            }
        }

    });
});