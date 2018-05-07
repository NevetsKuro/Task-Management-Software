$(document).ready(function(){

    $(document).on('click',"#addSubTask",function(){
        $("#subTaskTable").find('tbody').append(`
                    <tr>
                        <td>
                            <label class="input">
                                <input id="SubTask_name" type="text">
                            </label>
                        </td>
                        <td>
                            <label class="input">
                                <input id="SubTask_duration" type="text" placeholder="HH.MM">
                            </label>
                        </td>
                        <td>
                            <label class="input">
                                <input id="SubTask_Deadline_Date" type="text" class="datepickr">
                                <input id="SubTask_Deadline_Time" type="text" class="timepicker">
                            </label>
                        </td>
                        <td>
                            <label class="select">
                                <select id="SubTask_Assignee" class="select2"></select>
                            </label>
                        </td>
                        <td>
                            <label class="input">
                                <input id="SubTask_Weightage" type="text">
                            </label>
                        </td>
                        <td>
                            <label class="input">
                                <input id="SubTask_perCompleted" type="text">
                            </label>
                        </td>
                        <td>
                            <label class="select">
                                <select id="SubTask_Status" class="select2"></select>
                            </label>
                        </td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-xs btn-primary">
                                    <i class="glyphicon glyphicon-pencil"></i>
                                </button>
                                <button data-toggle="dropdown" class="btn btn-xs btn-primary dropdown-toggle">
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu pull-right">
                                    <li>
                                        <a href="#">Action</a>
                                    </li>
                                    <li>
                                        <a href="#">Another action</a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a href="#">Separated link</a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
        `);
        $('.select2').select2({
            placeholder: "Select...",
            allowClear: true
        });
        datetime();
    });
    
    $('.table-responsive').responsiveTable({
        addFocusBtn:false
    });
    console.log('running!');
})