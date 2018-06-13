//Your custom scripts here
$(document).ready(function(){
    var UpdateCont = [];
    var glob = '';
    var glob2 = '';
    var origForm;
  
    // var urlRoot = 'https://office-management-demo.herokuapp.com/';
    // var urlRoot = 'http://35.202.86.61/office-management/';
    $('#file2').on('change',function(){
        $('#addContact_vcard').val($(this).val().substr($(this).val().indexOf(String.fromCharCode(92),4)+1));
    });
    $('#file').on('change',function(){
        $('#addContact_image').val($(this).val().substr($(this).val().indexOf(String.fromCharCode(92),4)+1));
    });
     
    // UpdateCont = inputChanges(); 
    
    // var $form = $('#addContact_form'),
    // origForm = $form.serialize();
    // inputChanges = function(){
    // $(document).on('change input','form :input', function() {
    //     console.log($form.serialize() !== origForm);
        
    //     UpdateCont.push($(this));
    //     });
    // }


    $("#range_02").ionRangeSlider({
        min: 1,
        max: 10,
        from: 5
        });

    $(document).on('click',
    '#divHeader > div > div.header-right.hide-app-name > nav > div > div.collapse.navbar-collapse.bs-example-js-navbar-collapse > ul > li.header-con',
    function(){
        var tour = new Tour({
            backdrop:true,
            backdropPadding:1,
            reflex:true,
          steps: [
          {
            element: "#accord > div",
            title: "Search Contacts",
            content: "For searching if the contact already exist or not!",
            placement:'top',
            onShow: function (tour) {
                    $('#collapseChck').collapse('show');
            },
          },
          {
            element: "#tab1 > div:nth-child(1) > div.col-sm-2 > label.label",
            title: "Compulsory",
            content: "Fields with star needs to be filled mandatorily",
            onShow: function(tour) {
                jQuery('#horizontal-wizard a[href=#tab1]').tab('show');
                jQuery('#tab2').removeClass('active');
                jQuery('#tab3').removeClass('active');
                jQuery('#tab1').addClass('active');
            }
          },
          {
            element: "#tab1 > div:nth-child(1) > div.col-sm-2",
            title: "Quick Adding",
            content: "Can add options to some dropdown fields by typing in it.",
            onNext: function (tour) {
                    jQuery('#horizontal-wizard a[href=#tab2]').tab('show');
                    jQuery('#tab1').removeClass('active');
                    jQuery('#tab2').addClass('active');
            },
            placement:'top'
          },
          {
            element: "#tab2 > div:nth-child(1) > div.col-sm-7.contact-search",
            title: "Search",
            content: "Use it to search existing Organisation.",
            placement:'top',
            onPrev: function (tour) {
                    jQuery('#tab2').removeClass('active');
                    jQuery('#tab1').addClass('active');
                    jQuery('#horizontal-wizard a[href=#tab1]').tab('show');
            },
          },
          {
              element: "#tab2 > div.row.well",
            title: "Branches",
            content: "One Branch needs to be filled mandatory.",
            placement:'top'
          },
          {
            element:'',
            title:'Tour over!',
            content:"Thank for viewing",
            orphan:true
            }
        ]});
        
        // Initialize the tour
        tour.init();
        
        // Start the tour
        tour.start();
    })

    $(document).on('change','#range_02',function(){
        // console.log($(this).val()); 
        var v = $(this).val(); 
        var t = $('#tab3 > div:nth-child(2) > div:nth-child(2) > div > span > span.irs-slider.single'); 
        var bar_edge = $('#tab3 > div:nth-child(2) > div:nth-child(2) > div > span > span.irs-bar-edge');
        var bar = $('#tab3 > div:nth-child(2) > div:nth-child(2) > div > span > span.irs-bar');
        switch(v){ 
            case "1":case "2": t.css('transform','scale(0.5)');bar_edge.css('background','#02f709');bar.css('background','#02f709');break;
            case "3":case "4": t.css('transform','scale(0.7)');bar_edge.css('background','#02db08');bar.css('background','#02db08');break; 
            case "5":case "6": t.css('transform','scale(0.9)');bar_edge.css('background','#02cc08');bar.css('background','#02cc08');break; 
            case "7":case "8": t.css('transform','scale(1.1)');bar_edge.css('background','#00c106');bar.css('background','#00c106');break;
            case "3":case "4": t.css('transform','scale(1.3)');bar_edge.css('background','#00b706');bar.css('background','#00b706');break;  
            }  
    });
    
    $(document).on('click','#btnsubmit',function(){
    
        $('#colored-warning-header').modal('hide');
        var title = $('#title').val() ;
        var name = $('#Name').val();
        var organisation = $('#Company').val();
        var email = $('#Email').val();
        var phone = $('#Phone').val();
    
        if(name!='' && name!=undefined){
        $.ajax({
                url:urlRoot+'contacts',
                datatype: 'JSON' ,
                type: 'GET' ,
                data: 'name='+name+'&phone='+phone+'&email='+email+'&organisation='+organisation ,
                xhrFields:{
                    withCredentials:false
                },
                success:function(data){
                    var display='';

                    glob = data;
    
                    if(glob.length > 0){
                        $('#colored-warning-header').modal('show');
                    
                        for (i = 0; i < glob.length; i++) { 
                        
                            display += `
                            <div class='col-xs-12 col-sm-12' id='${glob[i].id}'>
                            <div class='col-xs-4 col-sm-4 f-s-12 yellow-line'>${glob[i].title}. ${glob[i].name}</div>
                            <div class='col-xs-3 col-sm-3 f-s-12'>${glob[i].organisation}</div>
                            <div class='col-xs-4 col-sm-4 f-s-12'><div>${glob[i].email}</div><div>${(typeof glob[i].phone === 'undefined')?'Not mentioned':glob[i].phone}</div></div>
                            <div class='col-xs-1 col-sm-1 click' id='${glob[i].id}'><b><i class='button btn-default btn-flat icon-check fg-yellow darker-2 hvr-box-shadow-outset p-5'></i></b></div>
                            </div><span class='col-xs-12 col-sm-12 p-5'></span>
                            `;
                        }
                        $('#searchResult').html(display);
                        if(data){
                            $('.contactFormBody').removeClass('hide');
                            $('.contactFormBut').removeClass('hide');
                            //the data for filling the existing contacts form
                        }else{
                            $('.contactFormBody').removeClass('hide');
                            $('.contactFormBut').removeClass('hide');
                        }
                    }else{
                        $('#message').html('Contact not found. You can fill a new contact!');
                    }
                },
                error:function(err){
                    alert('cannot connect to server!: ' + err);
                }
            });
        }
    });
    
    //auto filling forms prefilled data
    $.ajax({
        url:urlRoot+'common/form-data',
        datatype:'JSON',
        type:'GET',
        success:function(data){
            glob2 = data;
            for (var i = 0; i < data.titles.length; i++) {
                $('#addContact_title').append('<option value='+data.titles[i].id+'>'+data.titles[i].title+'</option>');
            }
            for (var i = 0; i < data.genders.length; i++) {
                $('#addContact_gender').append('<option value='+data.genders[i].id+'>'+data.genders[i].gender+'</option>');
            }
            for (var i = 0; i < data.categories.length; i++) {
                $('.contactnumber_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
                $('.email_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
                $('.address_category').append('<option value='+data.categories[i].id+'>'+data.categories[i].category+'</option>');
            }
            for (var i = 0; i < data.social_medias.length; i++) {
                $('.socialmedia_category').append('<option value='+data.social_medias[i].id+'>'+data.social_medias[i].social_media+'</option>');
            }
            
            // for (var i = 0; i < data.managers.length; i++) {
            //     $('#managers').append('<option value=' + data.managers[i].id+'>'+data.managers[i].name+'</option>');
            // }
    
            // for (var i = 0; i < data.managers.length; i++) {
            //     $('#assignee').append('<option value=' + data.managers[i].id+'>'+data.managers[i].name+'</option>');
            // }
            
            for (var i = 0; i < data.designations.length; i++) {
                $('#addContact_designation').append('<option value=' + data.designations[i].id+'>'+data.designations[i].designation+'</option>');
            }
            // $('#addContact_designation').append('<option value="1">Software engineer(HC)</option>');
            for (var i = 0; i < data.departments.length; i++) {
                $('#addContact_department').append('<option value=' + data.departments[i].id+'>'+data.departments[i].department+'</option>');
            }
            for (var i = 0; i < data.sources.length; i++) {
                $('#addContact_source').append('<option value=' + data.sources[i].id+'>'+data.sources[i].source+'</option>');
            }
            for (var i = 0; i < data.services.length; i++) {
                $('#addContact_potential_service').append('<option value=' + data.services[i].id+'>'+data.services[i].service+'</option>');
            }
            for (var i = 0; i < data.lead_statuses.length; i++) {
                $('#addContact_lead_status').append('<option value=' + data.lead_statuses[i].id+'>'+data.lead_statuses[i].lead_status+'</option>');
            }
            for (var i = 0; i < data.states.length; i++) {
                $('#addContact_state').append('<option value=' + data.states[i].state+'>'+data.states[i].state+'</option>');
            }

            console.log('Pre filled data added!!!');
        },
        error:function(error){
            swal('Cannot fetch organisation form list');
            console.log(error.responseText);
        }
    });
    
    $.ajax({
        url:urlRoot+'employees/',
        datatype:'JSON',
        type:'GET',
        success:function(data){
            // glob2 = data;
            for (var i = 0; i < data.length; i++) {
                $('#addContact_assignee').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
            for (var i = 0; i < data.length; i++) {
                $('#addContact_originator').append('<option value='+data[i].id+'>'+data[i].name+'</option>');
            }
            console.log('Pre filled data added!!!');
        },
        error:function(error){
            swal('Cannot fetch organisation form list');
            console.log(error.responseText);
        }
    });
    var currentContactData;
    var currentOrganisationsId = "";
    var currentContactsId = "";
    var urlParams = GetURLParams();
    var currentContactsId = urlParams['contact'];

    // if(currentContactsId){
    //     tUpdateCont = inputChanges();
    //     inputChanges();
    // }

    function filterContactData(){
        
        if(!currentContactsId || currentContactsId == undefined){
            id = $(this).attr('id');
        }else{
            id = currentContactsId;
        }

        console.log('click function running...');
        
        $.ajax({
            url:urlRoot+'contacts/'+id,
            datatype:'JSON',
            type:'GET',
            success:function(data){
                $('#colored-warning-header').modal('hide');
                $('#message').html('Please move ahead to update Your contact!');
                currentContactData = data;

                currentContactsId = data.id;
                $('#addContact_title').val(data.title).trigger('change');
                var name = breakName(data.name);
                $('#addContact_fname').val(name.firstName);
                $('#addContact_mname').val(name.middleName);
                $('#addContact_lname').val(name.lastName);
                $('#addContact_gender').val(data.gender).trigger('change');
                var formatted = $.datepicker.formatDate("dd/mm/yy", new Date(data.dob));
                $('#addContact_dob').val(formatted);
                var addr = breakAddress(data.address);
                $('#addContact_addresses').val(addr.StreetAddress);
                $('#addContact_city').val(addr.City);
                $('#addContact_pincode').val(addr.Pincode);
                $('#addContact_state').val(addr.State).trigger('change');
                if(data.person_image){
                    $('#addContact_image').val(data.person_image.substring(data.person_image.lastIndexOf('/')+1));
                }
                if(data.card_image){
                    $('#addContact_vcard').val(data.card_image.substring(data.card_image.lastIndexOf('/')+1));
                }
                
                if(data.contact_organisation){
                    currentOrganisationsId = data.contact_organisation.organisation.id;
                    $('#editOrganisation').attr('oid',currentOrganisationsId).removeAttr('disabled');
                    $('#addContact_website').html(data.contact_organisation.organisation.website);
                    $('#addContact_designation').val(data.contact_organisation.designation).trigger('change');
                    $('#addContact_department').val(data.contact_organisation.department).trigger('change');
                    $('#addContact_orgName').html(data.contact_organisation.organisation.name);
                    $('#addContact_industry').html(data.contact_organisation.organisation.industry_types.join(', '));
                    $('#addContact_business_type').html(data.contact_organisation.organisation.business_types.join(', '));
                    $('#addContact_business_nature').html(data.contact_organisation.organisation.business_natures.join(', '));
                    $('#addContact_group').html(data.contact_organisation.organisation.group);
                    $('#addContact_branch').val(data.contact_organisation.branch);
                }

                if(data.lead){
                    $('#addContact_potential_service').val(data.lead.potential_services).trigger('change');
                    $('#addContact_lead_status').val(data.lead.status).trigger('change');
                    $('#addContact_source').val(data.lead.source).trigger('change');
                    $('#addContact_reference').val(data.lead.reference).trigger('change');
                    $('#addContact_notes').val(data.lead.notes);
                    var rangeSlider = $("#range_02").data('ionRangeSlider');
                    rangeSlider.update({from:data.lead.priority});
                    $('#addContact_originator').val(data.lead.originators).trigger('change');
                    $('#addContact_assignee').val(data.lead.assignees).trigger('change');
                    // $('#addContact_comments').val(data.lead.comments);
                }

                var multiNums = data.phone_numbers;
                var multiEmail = data.email_addresses;
                var multiSocial = data.social_media_links;
                if(data.contact_organisation){
                    var multiBrans = data.contact_organisation.organisation.branches;
                    for(let i=0; i < multiBrans.length; i++){
                        if(i > 0){
                            addAddresses();
                            $('#hoaddress-row .new:last .hoaddress_from').attr('id',multiBrans[i].id);
                            $('#hoaddress-row .new:last .hoBranchName').val(multiBrans[i].name);
                            $('#hoaddress-row .new:last .hoaddresses').val(multiBrans[i].address);
                            $('#hoaddress-row .new:last .hoaddress_isHO').attr('checked',multiBrans[i].is_head_office);
                        }else{
                            $('#hoaddress-row .new:last .hoaddress_from').attr('id',multiBrans[i].id);
                            $('#hoaddress-row .new .hoBranchName').val(multiBrans[i].name);
                            $('#hoaddress-row .new .hoaddresses').val(multiBrans[i].address);
                            $('#hoaddress-row .new .hoaddress_isHO').attr('checked',multiBrans[i].is_head_office);
                        }
                    }
                }

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
                        $('#email-row .new:last .ea_is_primary').attr('checked',multiEmail[i].is_primary);
                    }else{
                        $('#email-row .new .email_category').val(multiEmail[i].category).trigger('change');
                        $('#email-row .new .addContact_emailIds').val(multiEmail[i].email);
                        $('#email-row .new .ea_is_primary').attr('checked',multiEmail[i].is_primary);
                    }
                }

                for(let i=0; i < multiSocial.length; i++){
                    if(i > 0){
                        addWebsiteRows();
                        $('#website-row .new:last .socialmedia_category').val(multiSocial[i].social_media).trigger('change');
                        $('#website-row .new:last .social_media_link').val(multiSocial[i].link);
                    }else{
                        $('#website-row .new .socialmedia_category').val(multiSocial[i].social_media).trigger('change');
                        $('#website-row .new .social_media_link').val(multiSocial[i].link);
                    }
                }
                
                console.log(data.name+" details are added to the form!!");
                // $('select').trigger('change');
                // $('form :input').trigger('change');
            },
            error:function(error){
                swal('Contact` cannot be fetched');
                console.log(error.responseText);
            }

        });
    }
    
    if(currentContactsId){
        filterContactData();
        $('#accord').addClass('hide');
        UpdateCont = inputChanges();
        // origForm = inputChanges();
    }
    
    //add exsting contact to below form in add contact
    $('#searchResult').on('click','.click', filterContactData);
    
    var addContactRow = `
    <div class='new row well'>
        <div class='col-xs-2 col-sm-2'>
            <label class='checkbox m-l-22'>
                <input type='radio' update-ctrl="phone_numbers" name="CNChecked" class='cn_is_primary'><i class='rounded-x m-l-10'></i>
            </label>
        </div>
        <div class='col-xs-3 col-sm-3'>
            <label class='select'>
                <select entity="Category" update-ctrl="phone_numbers" class='contactnumber_category select2 editselect'>
                    
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
                <select entity="Category" update-ctrl="email_addresses" class='email_category select2 editselect'>
                    
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

        UpdateCont.push($(this));
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

        UpdateCont.push($(this));
    });



    // adding websiteEntry tab in contact form
    function addWebsiteRows(){
        $('#website-row').append(`
        <div class='new row well'>
            <div class='col-xs-4 col-sm-4'>
                <label class='select'>
                    <select entity="SocialMedia" update-ctrl="social_media_links" class='socialmedia_category select2 editselect'>

                    </select>
                </label>
            </div>
            <div class='col-xs-6 col-sm-6'>
                <label class='input'>
                    <input update-ctrl="social_media_links" type='text' class="social_media_link" placeholder='e.g. www.facebook.com/'>
                </label>
            </div>
            <div  class='col-xs-2 col-sm-2'>
                <div id='remove-website' class='text-center text-danger'>
                    <span class='centerAlign'>
                       <i class='glyphicon glyphicon-remove fa-lg'></i>
                    <span>
                </div>
            </div>
        </div>
        `);
        $('#website-row .new:last').addClass('zoomInUp animated').show('fast')
        editSelect();

        for (var i = 0; i < glob2.social_medias.length; i++) {
            $('#website-row .new:last .socialmedia_category').append('<option value='+glob2.social_medias[i].id+'>'+glob2.social_medias[i].social_media+'</option>');
        }
    }
    $('#addwebsite').on('click',addWebsiteRows);
    
    //remove websiteEntered data tab in contact form
    $('#website-row').on('click','#remove-website',function(){
        $(this).parentsUntil('#website-row').remove();

        //Just push to UpdateCont
        UpdateCont.push($(this));
    });
    
    //new tabs for hoaddress
    function addAddresses(){
        $('#hoaddress-row').append(`
        <div class='row well new'>
        
            <div class='col-xs-1 col-sm-1'>
                <label class='checkbox m-l-10'>
                    <input type='radio' update-ctrl="branch" name="branchChecked" class='hoaddress_from'><i class='rounded-x m-l-10'></i>
                </label>
            </div>
            <div class='col-xs-1 col-sm-1'>
                <label class='checkbox'>
                    <input type='checkbox' class='hoaddress_isHO'><i class='rounded-x m-l-10'></i>
                </label>
            </div>
                
            <div class='col-xs-3 col-sm-3'>
                <label class='input'>
                    <input type='text' class='hoBranchName'>
                </label>
            </div>

            <div class='col-xs-6 col-sm-6'>
                <label class='textarea textarea-expandable'>
                    <textarea class='hoaddresses' rows="3"></textarea>
                </label>
            </div>
            
        </div>
        `);
        $('#hoaddress-row .new:last').addClass('zoomInUp animated').show('fast');
    }

    $('#addaddress').on('click',addAddresses);
    
    $('#hoaddress-row').on('click','#remove-hoaddress',function(){
        $(this).parents('.new').remove();
        
        UpdateCont.push($(this));
    });

    $('#addContact_source').on('change',function(){
        var optionValue = $("#addContact_source option:selected").text();
        // $('#addContact_refer').
        if(optionValue == 'Reference'){
            $('.refer_label > label:first').empty().text('Name of Referral:');
        }else{
            $('.refer_label > label:first').empty().text(optionValue+':');
        }
    });
    
    // function appendArray(form_data, values, name){
    //     if(!values && name)
    //         form_data.append(name, '');
    //     else{
    //         if(typeof values == 'object'){
    //             for(key in values){
    //                 if(typeof values[key] == 'object')
    //                     appendArray(form_data, values[key], name + '[' + key + ']');
    //                 else
    //                     form_data.append(name + '[' + key + ']', values[key]);
    //             }
    //         }else
    //             form_data.append(name, values);
    //     }
    
    //     return form_data;
    // }
    //searching list for organisations
    $(document).on('click','#search_organisations',function(event){
        //event.preventDefault();
        var searchOrgKeyword = $('#searchOrgKeyword').val();

        if(searchOrgKeyword != ""){
        $.ajax({
            url:urlRoot+"organisations/?name="+searchOrgKeyword,
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

    window.contact_organisation = function (orgId){
            
        $.ajax({
            url:urlRoot+'organisations/display/'+orgId,
            type:'GET',
            contentType:'application/json',
            datatype:'JSON',
            success:function(data){
                $('#addContact_orgName').html(data.name);
                $('#addContact_website').html(data.website);
                $('#addContact_group').html(data.group);
                $('#addContact_business_type').html(data.business_types.join(', '));
                $('#addContact_industry').html(data.industry_types.join(', '));
                $('#addContact_business_nature').html(data.business_natures.join(', '));
                var multiBrns = data.branches;
                $('#hoaddress-row .new').each(function(index){
                    if(index>0){
                        $(this).remove();
                    }
                });
            
                for(let i=0; i < multiBrns.length; i++){
                    if(i > 0){
                        addAddresses();
                        $('#hoaddress-row .new:last .hoaddress_from').attr('id',multiBrns[i].id);
                        $('#hoaddress-row .new:last .hoBranchName').val(multiBrns[i].name);
                        $('#hoaddress-row .new:last .hoaddresses').val(multiBrns[i].address);
                        $('#hoaddress-row .new:last .hoaddress_isHO').attr('checked',multiBrns[i].is_head_office);
                    }else{
                        $('#hoaddress-row .new .hoaddress_from').attr('id',multiBrns[i].id);
                        $('#hoaddress-row .new .hoBranchName').val(multiBrns[i].name);
                        $('#hoaddress-row .new .hoaddresses').val(multiBrns[i].address);
                        $('#hoaddress-row .new .hoaddress_isHO').attr('checked',multiBrns[i].is_head_office);
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

    

    //$(document).on('click','.orgClick',contact_organisation);
    $(document).on('click','.orgClick',function(){
        var orgId = $(this).attr('id');
        contact_organisation(orgId);
    });

    $(document).on('click','#editOrganisation',function(){
        currentOrganisationsId = $(this).attr('oid');
        // var url = "addOrganisation.html?id="+currentOrganisationsId+'&cid='+currentContactsId;
        window.open("addOrganisation.html?id="+currentOrganisationsId+"&cid="+currentContactsId, "","menubar=0,titlebar=0,status=0,resizable=1,top=100,left=300,width=800,height=450");
        // $(location).attr('href',url);

    });

    $(document).on('click','.addNewOrg',function(){
        window.open('addOrganisation.html?cid='+currentContactsId,'',"menubar=0,titlebar=0,status=0,resizable=1,top=100,left=100,width=800,height=450");
    });

    var contact = {};
    var email = {};
    var website = {};
    var branches = {};
    // var contactArr = [];
    // var emailArr = [];
    // var websiteArr = [];
    // var branchesHead = [];
    var countryCode;
    var contactCategorySelected;
    var emailCategorySelected;
    var websiteCategorySelected;
    
    
    getContactRow();
    getEmailRow();
    getHoaddressRow();
    getWebsiteRow()

   
    function getFullName(){
        var CF_fName = $('#addContact_fname').val();
        var CF_mName = $('#addContact_mname').val();
        var CF_lName = $('#addContact_lname').val();
        var CF_fullName = CF_fName + ' ' + CF_mName + ' ' + CF_lName;
        return CF_fullName;
    }

    function getFullAddress(){
        var CF_fullAddress = [];
        var CF_address = $('#addContact_addresses').val();
        var CF_state = $('#addContact_state').val();
        var CF_city = $('#addContact_city').val();
        var CF_pincode = $('#addContact_pincode').val();
        CF_fullAddress.push(CF_address);
        CF_fullAddress.push(CF_city);
        CF_fullAddress.push(CF_pincode);
        CF_fullAddress.push(CF_state);
        var CF_ModAddress = CF_fullAddress.join('_');
        return CF_ModAddress;
    }

    function getLeads(){
        var CF_leadStatus = $('#addContact_lead_status').val();
        var CF_priority = $('#range_02').val();
        var CF_originator = [1];// $('#addContact_originator').val();
        var CF_assignee = [1];// $('#addContact_assignee').val();
        var CF_potentialService = $('#addContact_potential_service').val();
        var CF_source = $('#addContact_source').val();
        var CF_reference = $('#addContact_reference').val();
        var CF_notes = $('#addContact_notes').val();

        var leads = {}
            leads.originators = CF_originator;
            leads.assignees = CF_assignee;
            leads.status = CF_leadStatus;
            leads.source = CF_source;
            leads.reference = CF_reference;
            leads.priority = CF_priority;
            leads.notes = CF_notes;
            leads.potential_services = CF_potentialService;
        
        return leads;
    }

    function getOrg(){
        var CF_designation = $('#addContact_designation').val();
        var CF_department = $('#addContact_department').val();
        var CF_branch = $('.hoaddress_from').attr('id');

        var contact_organisation = {}
        contact_organisation.designation = CF_designation;
        contact_organisation.department = CF_department;
        contact_organisation.branch = CF_branch;

        return contact_organisation;

    }

    function checkValidation(){
        var title = $('#addContact_title').val();
        var fname = $('#addContact_fname').val();
        var lname = $('#addContact_lname').val();
        var gender = $('#addContact_gender').val();
        var contact  = getContactRow();
        var email = getEmailRow();
        var website = getWebsiteRow().link == ""?getWebsiteRow():[];
        var potential_services = $('#addContact_potential_service').val();
        var branch = $('.hoaddress_from').attr('id');
        var branchChk = $("input[name='branchChecked']").is(':checked');//$("input[name='branchChecked']").prop('checked');

        if(title == null){
            swal('Please select a title!');
            return false;
        }else if(fname == ''){
            swal('Please fill your first name');
            return false;
        }else if(lname==""){
            swal('Please fill your last name');
            return false;
        }else if(gender==null){
            swal('Please select a gender');
            return false;
        }else if(contact[0].number == "+91" ){
            swal('Please fill atleast one primary contact');
            return false;
        }else if(email[0].email == ""){
            swal('Please fill atleast one primary email');
            return false;
        }else if(potential_services == null){
            swal('Please select a potential services');
            return false;
        }else if(branch == undefined){
            swal('Please add a branch');
            return false;
        }else if(branchChk==false){
            swal('Please select a branch');
            return false;
        }
        return true;
    }

var CF_userimg='' ;
var CF_cardimg='';
    //integrating new form data into the api
    $(document).on('click','#addContact_submit',function(event){
    //  $(document).on('click',"#frmHorizontalWizard",function(event){
        

        var leads = {}
        leads.originators =1;
        leads.assignees = 1;
        leads.source = 1;
        leads.reference = "" ;
        leads.status = 1;
        leads.priority = 5;
        leads.potential_services = [1];
        leads.notes = " ";

        var valid = checkValidation();
        if(valid){
            //personal form data
            console.log(currentContactsId);
            if( currentContactsId != undefined){
                
                    var contactData = new Object();
                if(UpdateCont != undefined && UpdateCont.length > 0 ){
                    
                    //mundane fields
                    $.each(UpdateCont, function(key, value){
                        $(value).each(function(index){
                            var dataType = value.attr('update-ctrl');
                            var Val = value.val();
                            
                            switch(dataType){
                                // case 'name':
                                //     Val = getFullName();
                                //     break;
                                case 'address':
                                    Val = getFullAddress();
                                    break;
                                case 'social_media_links':
                                    Val =  getWebsiteRow();
                                    break;
                                case 'lead':
                                    Val = getLeads();
                                    break;
                                case 'contact_organisation':
                                    Val = getOrg();
                                    break;
                                    console.log(dataType + "changed");
                                case 'person_image':
                                    Val = CF_userimg;
                                    break;
                                case 'card_image':
                                    Val = CF_cardimg;
                                    break;
                                }
                                contactData[dataType] = Val;
                            });
                            
                        });
                        contactData['title'] = $('#addContact_title').val();
                        contactData['name'] = getFullName();
                        contactData['gender'] = $('#addContact_gender').val();
                        contactData['dob'] = getFormateDateToServer($('#addContact_dob').val());
                        contactData['email_addresses'] = getEmailRow();
                        contactData['phone_numbers'] = getContactRow();
                    }
                
                var contactJSON = JSON.stringify(contactData);
                console.log('The json file for new contact is = \n'+contactJSON);

                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'contacts/'+currentContactsId+'/?',
                    datatype:'JSON',
                    headers:{
                        "X-CSRFToken": csrftoken
                    },
                    type:'PUT',
                    headers: {
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "5a0f1205-d343-2e60-7420-1da75ea0043e"
                    },
                    processData: false,
                    data:contactJSON,
                    success:function(data){
                        swal('Contact updated to server');
                        var urL = 'ContactList.html?listOf=contact';
                        $(location).attr('href',urL);
                    },
                    error:function(error){
                        swal('Please fill the valid fields!');
                        console.log(error.responseText);
                    }
                });

            }else{
                
                var CF_title = $('#addContact_title').val();
                var CF_fullName = getFullName();
                var CF_gender = $('#addContact_gender').val();
                var CF_address = $('#addContact_addresses').val();
                var CF_state = $('#addContact_state').val();
                var CF_city = $('#addContact_city').val();
                var CF_pincode = $('#addContact_pincode').val();
                var CF_ModAddress = getFullAddress();
                var CF_image = $('#addContact_image').val();
                var CF_vcard = $('#addContact_vcard').val();
                var CF_dob = $('#addContact_dob').val();
                //lead status form data
                var CF_leadStatus = $('#addContact_lead_status').val();
                var CF_priority = $('#range_02').val();
                var CF_originator = [1];//$('#addContact_originator').val();
                var CF_assignee = [1];//$('#addContact_assignee').val();
                var CF_potentialService = $('#addContact_potential_service').val();
                var CF_source = $('#addContact_source').val();
                var CF_reference = $('#addContact_reference').val();
                var CF_notes = $('#addContact_notes').val();
                
                //organistional form data
                var CF_designation = $('#addContact_designation').val();
                var CF_department = $('#addContact_department').val();
                var CF_branch = $('.hoaddress_from:checked').attr('id');
                
                var leads = {}
                leads.originators = CF_originator;
                leads.assignees = CF_assignee;
                leads.source = CF_source;
                leads.reference = CF_reference;
                leads.status = CF_leadStatus;
                leads.priority = CF_priority;
                leads.potential_services = CF_potentialService;
                leads.notes = CF_notes;
            
                var contactOrg = {};
                contactOrg.designation = CF_designation;
                contactOrg.department = CF_department;
                contactOrg.branch = CF_branch;
                    
                getHoaddressRow();
                
                console.log('Date is : ' + getFormateDateToServer(CF_dob));
                
                var contactData = new Object();
                contactData.title = CF_title;
                contactData.name = CF_fullName;
                contactData.gender = CF_gender;
                if(CF_dob){
                    contactData.dob = getFormateDateToServer(CF_dob);
                }
                contactData.address = CF_ModAddress;
                contactData.email_addresses = getEmailRow();
                contactData.phone_numbers = getContactRow();
                contactData.social_media_links = getWebsiteRow();
                contactData.contact_organisation = contactOrg;
                contactData.lead = leads;
               
                if(CF_userimg!=''){
                    contactData.person_image=CF_userimg;
                }
                if(CF_cardimg!=''){
                    contactData.card_image=CF_cardimg;
                }
                contactJSON = JSON.stringify(contactData);
                console.log("The JSON is: "+contactJSON);
                // var email=getEmailRow();
                
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url:urlRoot+'contacts/?',
                    type:'POST',
                    headers:{
                        "X-CSRFToken": csrftoken
                    },
                    contentType:'application/json',
                    datatype:'JSON',
                    data:contactJSON,
                    success:function(data){
                        swal('contact added to server');
                        var urL = 'ContactList.html?listOf=contact';
                        $(location).attr('href',urL);
                    },
                    error:function(error){
                        swal('Cannot add new Contact');
                        console.log(error.responseText);
                    }
                });
            }
        }
    });
    
   


    $('#file2').on('change' ,function(){    
        var mimeType=$(this)[0].files[0]['type'];
        //$('#addContact_vcard').val($(this).val());
        //if(mimeType.split('/')[0]=='image'){
            var ggg2=$(this)[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(ggg2);
            reader.onload = function () {
                console.log('cardimg:'+reader.result);
                CF_cardimg=reader.result;
            }
        // }
        // else{
        //     $('#addContact_vcard').val("");
        //     swal('Select image. Wrong file format used');
        //     return false;
        // }
    });

    $('#file').on('change', function(){
        var mimeType=$(this)[0].files[0]['type'];
        //$('#addContact_image').val($(this).val());
        if(mimeType.split('/')[0]=='image'){
            var ggg1=$(this)[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(ggg1);
            reader.onload = function () {
                console.log('personimg:'+reader.result);
                CF_userimg=reader.result;
            }
        }
        else{
            $('#addContact_image').val("");
            swal('Select image. Wrong file format used');
            return false;
        }
    });
});   