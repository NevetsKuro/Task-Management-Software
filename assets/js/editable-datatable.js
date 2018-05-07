/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: forms/forms.js;

*/


"use strict";


$(document).ready(function() {


    $('[data-target="#add-new-data-modal"]').on('click', function(){
        $('#add-new-data-modal form').find("input[type=text], textarea").val("");
    });

    $("#btn-save-new-data").on("click", function(){
    	var name = $('#add-new-data-modal .name').val();
    	var pos = $('#add-new-data-modal .position').val();
    	var office = $('#add-new-data-modal .office').val();
    	var age = $('#add-new-data-modal .age').val();

    	fnClickAddRow(name, pos, office, age);
    });

    $('#editable-datatable').dataTable({
    	columnDefs: [
    		{ "targets": [4], "searchable": false, "orderable": false, "visible": true },
    		{ "targets": [5], "searchable": false, "orderable": false, "visible": true }
    	]

    });

    $('#editable-datatable').delegate(".btn-get-data", "click", function(){

        var oTable = $('#editable-datatable').dataTable();

        var row = $(this).parent().parent();

        var row_n = row.index();

        var aData = oTable.fnGetData(row);

        $('#update-data-modal .row').val(row_n);
        $('#update-data-modal .name').val(aData[0]);
        $('#update-data-modal .position').val(aData[1]);
        $('#update-data-modal .office').val(aData[2]);
        $('#update-data-modal .age').val(aData[3]);

        $('#update-data-modal').modal('show');

    });

    $("#btn-update-data").on("click", function(){
        var row = $('#update-data-modal .row').val();
        var name = $('#update-data-modal .name').val();
        var pos = $('#update-data-modal .position').val();
        var office = $('#update-data-modal .office').val();
        var age = $('#update-data-modal .age').val();

        fnClickUpdateRow(row, name, pos, office, age);
    });

    $('#editable-datatable').delegate(".btn-delete-data", "click", function(){
        var oTable = $('#editable-datatable').dataTable();
        var target_row = $(this).closest("tr").get(0); // this line did the trick
        var aPos = oTable.fnGetPosition(target_row); 

        swal({   
            title: "Are you sure?",   
            text: "You will not be able to recover this data!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No, cancel plx!",   
            closeOnConfirm: false,   
            closeOnCancel: true 
        }, 
        function(isConfirm){   
            if (isConfirm) {     
                oTable.fnDeleteRow(aPos);
                swal("Deleted!", "Data has been deleted.", "success");   
            } 
        });
    });

});



function fnClickUpdateRow(row, name, pos, office, age) {
    $('#editable-datatable').dataTable().fnUpdate( [name, pos, office, age, fnButtonActionEdit(), fnButtonActionDelete()], $('#editable-datatable tbody tr')[row]);
    swal(
        "Good job!", 
        "Data successfully updated!", 
        "success"
    );

    $('#update-data-modal').modal('hide');
}

function fnClickAddRow(name, pos, office, age, start_date, salary) {
    $('#editable-datatable').dataTable().fnAddData( [name, pos, office, age, fnButtonActionEdit(), fnButtonActionDelete()]);

    swal(
    	"Good job!", 
    	"Data successfully added!", 
    	"success"
    );

    $('#add-new-data-modal').modal('hide');
}


function fnButtonActionEdit() {
	var html = '<button class="btn btn-primary btn-sm btn-flat btn-get-data"><i class="fa fa-edit"></i></button>';
	return html;
}

function fnButtonActionDelete() {
	var html = '<button class="btn btn-danger btn-sm btn-flat btn-delete-data"><i class="fa fa-trash"></i></button>';
	return html;
}

function dollarMoney(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$"+parts.join(".");
}