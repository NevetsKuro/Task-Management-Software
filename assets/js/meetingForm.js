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


    $(document).on('click','#addAttendees',function(){
        $('#attendee_row').append(`
            <tr class="new">
                <td>
                    <label class="select">
                        <select class="attendee_organisation" class="select2"></select>
                    </label>
                </td>
                <td>
                    <label class="select">
                        <select class="attendee_client" class="select2"></select>
                    </label>
                </td>
                <td>
                    <label class="select">
                        <select class="attendees_thirdParty" class="select2"></select>
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
                        <label class="input">
                            <input class="agenda_owner" type="text">
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
    });

    $('#agenda_row').on('click', '#removeAgenda', function () {
        $(this).parentsUntil('#agenda_row').remove();
    });
    
})