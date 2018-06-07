$(document).ready(function(){

    $('#taskType').bootstrapToggle({
        off: 'Client',
        on: 'Contact',
        width: '150px',
        onstyle: 'warning',
        offstyle: 'info',
        style: 'ios',
        size: 'large'
    });

    $(document).on('change','#taskType',function(){
        var meet_For = $(this);
        var referedFor = $('#meet_referedFor');
        referedFor.empty();
        if(meet_For.is(':checked')==true){
            getContactList(referedFor);
        }else{
            getClientList(referedFor);
        }
    });

    $(document).on('change','.attendee_type',function(){
        var type = $(this).val()
        var target = $(this).parentsUntil('#attendee_row').find('.attendees_list');
        target.empty();
        if(type == 'O'){
            getEmployeeList(target);
        }else if(type == 'C'){
            if($('#meet_referedFor').is(':checked')){
                $('.attendees_list').attr('disabled',true);
            }else{
                getClientList(target);
            }
        }else if(type == 'T'){
            getContactList(target);
        }
    });
    
    // $(document).on('change','.agenda_type',function(){
    //     var type = $(this).val()
    //     var target = $(this).parentsUntil('#agenda_row').find('.agenda_owner');
    //     target.empty();
    //     if(type == 'E'){
    //         getEmployeeList(target);
    //     }else if(type == 'C'){
    //         getContactList(target);
    //     }
    // });

    var empFor1 = $('.attendee_organisation');
    getEmployeeList(empFor1);
    getContactList($('.attendees_thirdParty'));
    
    
    
    var employees =[],clients=[],contacts=[];
    
    function getEmployeeList(selector){
        $.getJSON(urlRoot+'employees/',function(data){
            employees = data;
            for (var i = 0; i < employees.length; i++) {
                selector.append('<option value='+employees[i].id+'>'+employees[i].name+'</option>');
            }
        });
    }
    function getClientList(selector){
        $.getJSON(urlRoot+'clients/allclients',function(data){
            clients = data;
            for (var i = 0; i < clients.length; i++) {
                selector.append('<option value='+clients[i].id+'>'+clients[i].name+'</option>');
            }
        });
    }
    function getContactList(selector){
        $.getJSON(urlRoot+'contacts/',function(data){
            contacts = data;
            for (var i = 0; i < contacts.length; i++) {
                selector.append('<option value='+contacts[i].id+'>'+contacts[i].name+'</option>');
            }
        });
    }

    $(document).on('click','#generate',function(){
        var valueArray1 = $('.attendees_list').map(function() {
            if($(this).parentsUntil('#attendee_row').find('.attendee_type').val()=='O'){
                return this.value;
            }
        }).get();
        var valueArray2 = $('.attendees_list').map(function() {
            if($(this).parentsUntil('#attendee_row').find('.attendee_type').val()=='C'){
                return this.value;
            }
        }).get();
        var valueArray3 = $('.attendees_list').map(function() {
            if($(this).parentsUntil('#attendee_row').find('.attendee_type').val()=='T'){
                return this.value;
            }
        }).get();
        var valueArray4 = $('.agenda_number').map(function() {
            return this.value;
        }).get();
        // var valueArray5 = $('.agenda_owner').map(function() {
        //     if($(this).parentsUntil('#agenda_row').find('.agenda_type').val()=='C'){
        //         return this.value;
        //     }
        // }).get();


        var empList=[],conList=[],cliList=[],agendaEmp=[],agendaCon=[];
        for (let index = 0; index < valueArray1.length; index++) {
            var a = employees.find(function(a){return a.id==valueArray1[index]});
            empList.push(a);
        }
        for (let index = 0; index < valueArray2.length; index++) {
            var a = clients.find(function(a){return a.id==valueArray2[index]});
            cliList.push(a);
        }
        for (let index = 0; index < valueArray3.length; index++) {
            var a = contacts.find(function(a){return a.id==valueArray3[index]});
            conList.push(a);
        }
        // for (let index = 0; index < valueArray4.length; index++) {
        //     var a = employees.find(function(a){return a.id==valueArray4[index]});
        //     agendaEmp.push(a);
        // }
        // for (let index = 0; index < valueArray5.length; index++) {
        //     var a = contacts.find(function(a){return a.id==valueArray5[index]});
        //     agendaCon.push(a);
        // }

        // var new2=agendaEmp.concat(agendaCon);
        // $('.Magenda_list').empty()
        // for(var i=0;i<new2.length;i++){
        //     $('.Magenda_list').append('<option value='+new2[i].id+'>'+new2[i].name+'</option>');
        // }

        var new1 =cliList.concat(conList);
        var new3 =new1.concat(empList);

        $('.Magenda_list').empty();
        for(var i=0;i<valueArray4.length;i++){
            $('.Magenda_list').append('<option value='+valueArray4[i]+'>'+valueArray4[i]+'</option>');
        }
        $('.agenda_owner').empty();
        for(var i=0;i<new3.length;i++){
            $('.agenda_owner').append('<option value='+new3[i].id+'>'+new3[i].name+'</option>');
        }

        $('#OrganisationsSide').empty();
        for(var i=0;i<empList.length;i++){
            $('#OrganisationsSide').append('<option value='+empList[i].id+'>'+empList[i].name+'</option>');
        }
        $('#ContactsSide').empty();
        for(var i=0;i<new1.length;i++){
            $('#ContactsSide').append('<option value='+new1[i].id+'>'+new1[i].name+'</option>');
        }
    });

    $(document).on('click','#addAttendees',function(){
        $('#attendee_row').append(`
            <tr class="new">
                <td>
                    <label class="select">
                        <select class="attendee_type select2">
                            <option value="O">Organisation Side</option>
                            <option value="C">Client Side</option>
                            <option value="T">Third Party</option>
                        </select>
                    </label>
                </td>
                <td>
                    <label class="select">
                        <select class="attendees_list select2"></select>
                    </label>
                </td>
                <td>
                    <div id="removeAttendees" class="col-md-1">
                        <label class="m-l-20 m-t-10">
                            <span ><i class="glyphicon glyphicon-remove fa-lg text-danger"></i></span>
                        </label>
                    </div>
                </td>
            </tr>
        `);
        $('.attendee_type').select2();
        $('.attendees_list').select2();
    });

    $('#attendee_row').on('click', '#removeAttendees', function () {
        $(this).parentsUntil('#attendee_row').remove();
    });

    $(document).on('click','#addAgenda',function(){
        $('#agenda_row').append(`
                <tr class="new">
                    <td>
                        <label class="input">
                            <input class="agenda_number" type="text">
                        </label>
                    </td>
                    <td>
                        <label class="select">
                            <select class="agenda_type select2">
                                <option value="E">Employee</option>
                                <option value="C">Contacts</option>
                            </select>
                        </label>
                    </td>
                    <td>
                        <label class="select">
                            <select class="agenda_owner select2"></select>
                        </label>
                    </td>
                    <td>
                        <label class="input custom_inline m-l-0">
                            <input class="agenda_duration" type="text" placeholder="HH.MM">
                        </label>
                    </td>
                    <td>
                        <div id="removeAgenda" class="col-md-1">
                            <label class="m-l-20 m-t-10">
                                <span ><i class="glyphicon glyphicon-remove fa-lg text-danger"></i></span>
                            </label>
                        </div>
                    </td>
                </tr>
        `);
        $('.agenda_type').select2();
        $('.agenda_owner').select2();
    });

    $('#agenda_row').on('click', '#removeAgenda', function () {
        $(this).parentsUntil('#agenda_row').remove();
    });
    
    $(document).on('click','#addMAgenda',function(){
        $('#Magenda_row').append(`
                <tr class="new">
                    <td>
                        <label class="select2">
                            <select class="Magenda_list select2"></select>
                        </label>
                    </td>
                    <td>
                        <label class="textarea">
                            <textarea class="Magenda_note textarea" rows="2"></textarea>
                        </label>
                    </td>
                    <td>
                        <div id="removeMAgendas" class="col-md-1">
                            <label class="m-l-20 m-t-10">
                                <span ><i class="glyphicon glyphicon-remove fa-lg text-danger"></i></span>
                            </label>
                        </div>
                    </td>
                </tr>
        `);
        $('.Magenda_list').select2();
        $('.Magenda_note').select2();
    });

    $('#Magenda_row').on('click', '#removeMAgendas', function () {
        $(this).parentsUntil('#Magenda_row').remove();
    });

    var attend, agend;
    var attendArr, agendArr;
    
    function getAttendee(){
        $('#attendee-row .new').each(function(index){
            attend = new Object(); 
            attend['employees'] = $(this).find('.attendee_type').val();
            attend['contacts'] = $(this).find('.attendees_list').val();
            attendArr.push(attend);
        });
    }
    function getAgenda(){
        $('#agenda_row .new').each(function(index){
            agend = new Object();
            agend['agenda'] = $(this).find('.agenda_number').val();
            if($(this).find('.agenda_type').val()=='E'){
                agend['employee_owner'] = $(this).find('.agenda_owner').val();
            }else{
                agend['contact_owner'] = $(this).find('.agenda_owner').val();
            }
            agend['duration'] = $(this).find('.agenda_duration').val();
            agendArr.push(agend);
        });
        return agendArr
    }

    $(document).on('click','#submitMeeting',function(){
        var referedFor = $('#meet_referedFor').val();
        var purpose = $('#meet_purpose').val();
        var mode = $('#meet_mode').val();
        var location = $('#meet_location').val();
        var date = $('#meet_date').val();
        var STime = $('#meet_STime').val();
        var ETime = $('#meet_ETime').val();
        var notes = $('#meet_notes').val();

        var MeetingData = new Object();
        if(meet_For.is(':checked')==true){
            MeetingData.contact = referedFor;
        }else{
            MeetingData.client = referedFor;
        }
        //MeetingData.subject = ;   ???????
        MeetingData.location = location;
        MeetingData.date = getFormateDateToServer(date);
        MeetingData.start_time = STime;
        MeetingData.end_time = ETime;
        MeetingData.purpose = purpose;
        MeetingData.notes = notes;
        
        var MeetingJSON = JSON.stringify(MeetingData);
        console.log(MeetingJSON);

        $.ajax({
            async: true,
            crossDomain: true,
            url:urlRoot+'meetings/',
            datatype:'JSON',
            method:'POST',
            headers: {
                "X-CSRFToken": csrftoken,
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            processData: false,
            data:MeetingJSON,
            success:function(){
                swal('Meeting Details Created');
            },
            error:function(error){
                console.log(error.responseText());
            }
        })
    })
})