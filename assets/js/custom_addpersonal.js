$(document).ready(function(){

console.log('addpersonal js file running...');

$('#add_sibling').on('click',function(){
    $('.siblings').append(`
    
        <div class="more_sibling">
            <div class="col-sm-6">
            <label class="label">Sibling's Name:</label>
            <label class="input">
                <input type="text">
            </label>
            </div>
            <div class="col-sm-5">
            <label class="label">Nature of Business:</label>
            <label class="input">
                <input type="text">
            </label>
            </div>
            <div id="remove_sibling" class="col-sm-1 p-t-10">
                <label class="label">&nbsp;</label>
                <span class="m-l-25 text-danger"><i class="glyphicon glyphicon-remove"></i></span>
            </div>
        </div>
    `);
});

$('.siblings').on('click','#remove_sibling',function(){
    $(this).parent('.more_sibling').remove();
});

var Pers_table = $('#personal_datatable').DataTable({
    responsive: true
});

var counter = 1;

$('#add_personal').on('click',function(){
    var pers_degree = $('#pers_degree').val();
    var institute = $('#institute').val();
    var noattempts = $('#noattempts').val();
    var pers_fYear = $('#pers_fYear').val();
    var pers_tYear = $('#pers_tYear').val();
    var pers_perc = $('#pers_perc').val();
    var grade = $('#grade').val();
    
    Pers_table.row.add([
            counter,
            pers_degree,
            institute,
            noattempts,
            pers_fYear,
            pers_tYear,
            pers_perc,
            grade,
            '<div class="per_remove text-danger text-center"><i class="glyphicon glyphicon-remove"></i></div>'
    ]).draw(false);
    
    $('#personal_datatable tbody').on('click','div.per_remove',function(){
        var conf = swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Pers_table.row($(this).parents('tr')).remove().draw();
                swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("The selected row is deleted!");
            }
          });
        //var conf = confirm("Are you sure");
    });

    counter++;
    swal("Row added","Look in the above table!","success");
});

$('#add_certificate').on('click',function(){
    $('#education_form').removeClass('hide');   
});

$('#close_add_certificate').on('click',function(){
    $('#education_form').addClass('hide');
});


var exp_table = $('#experience_datatable').DataTable({
    responsive: true
});

var i=0;

$('#add_to_experience').on('click',function(){
    var exp_company = $('#exp_company').val(); 
    var exp_fYear = $('#exp_fYear').val();
    var exp_tYear = $('#exp_tYear').val();
    var exp_rol = $('#exp_rol').val();

    exp_table.row.add([
        i+1,
        exp_company,
        exp_fYear,
        exp_tYear,
        exp_rol,
        '<div class="exp_remove text-danger text-center"><i class="glyphicon glyphicon-remove"></i></div>'
    ]).draw(false);

    $('#experience_datatable tbody').on('click','div.exp_remove',function(){
        var conf2 = swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this row!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                exp_table.row($(this).parents('tr')).remove().draw();
                swal("Poof! The row has been deleted!", {
                icon: "success",
              });   
            } else {
              swal("Not deleted! ");
            }
          });
        //var conf = confirm('Are you sure?');
        
    });
    swal("Row added","Look in the above table!","success");
});

$('#add_experience').on('click',function(){
    $('#experience_form').removeClass('hide');   
});

$('#close_add_experience').on('click',function(){
    $('#experience_form').addClass('hide');
});

$('#addDocument').on('click',function(){
    $('.browseDocument').append(`
    <div class="row new well">
        <div class="col-sm-4">
            <label class="label"></label>
            <label class="select">
                <select class="select2">

                </select>
            </label>
        </div>
        <div class="col-sm-6">
            <label class="label"></label>
            <div class="input input-file">
                <div class="button"><input type="file" id="file" onchange="this.parentNode.nextSibling.value = this.value">Browse</div><input type="text" readonly="">
            </div>
        </div>
        <div class="col-sm-2">
            <label class="label"></label>
            <div class="removeDocument">
            <span class="centerAlign text-center text-danger">
                <i class="glyphicon glyphicon-remove fa-lg"></i>
            <span>
            </div>
        </div>
    </div>
    `);
    $('.browseDocument .new:last').addClass('zoomInUp animated').show('fast');
});

$('.browseDocument').on('click','.removeDocument',function(){
    $(this).parents('.new').remove();
});
});