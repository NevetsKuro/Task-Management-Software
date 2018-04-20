$(document).ready(function () {

    var currentList = [];
    var urlParams = GetURLParams();

    var listOf = urlParams['listOf'];
    var listOf = urlParams['listOf'];

    function contactListBody(currentList) {

        var listContact = "";
        var contactLink = "AddContact.html?contact=";
        var clientLink = "AddClient.html?client=";
        var contactViewLink = "ViewContact.html"
        var clientViewLink = "ViewClient.html"

        if(currentList){
            currentList.forEach(element => {
                listContact += `
                <div class="col-sm-4 col-lg-4">
                    <div class="counter-widget variant-1 color-1">
                        <div class="counter-icon">
                            <div class="front-content">
                                <a class="pull-left" href="#">
                                    <img height="60px" class="img-circle" src="assets/images/avatar3.jpg" alt="">
                                </a>

                                <h4 class="m-t-0 m-b-5 header-title">
                                    <b class="name">${element.name}</b>
                                </h4>
                                <p class="text-muted text-bold">${element.designation}</p>
                                <p class="text-dark">
                                    <small>${( listOf == 'contact' ? element.organisation:" " )}</small>
                                </p>
                                <p class="text-dark">
                                    <small>${element.phone}</small>
                                </p>
                                <p class="text-dark m-l-50">
                                    <small>${(typeof element.email !== "" || typeof element.email !== 'null') ? element.email : 'Not available'}</small>
                                </p>

                            </div>
                        </div>
                        <div class="counter-content">
                            <h3>Actions</h3>
                            <a title="Select/Deselect" class="btn bg-grey btn-sm selectable">
                                <i class="glyphicon glyphicon-ok-circle"></i>
                            </a>
                            <a title="View" href="${contactViewLink}?id=${element.id}" class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon glyphicon-user"></i>
                            </a>
                            <a title="Edit" href="${contactLink}${element.id}" class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon-pencil"></i>
                            </a>
                            <a title="Delete" id="${element.id}" class="deleteContact btn btn-danger btn-sm">
                                <i class="glyphicon glyphicon-trash"></i>
                            </a>
                            <a title="Convert to Client" href="${clientLink}?client=${element.id}" class="btn btn-primary btn-sm CTC">
                                <i class="glyphicon glyphicon-random"></i>
                            </a> 

                        </div>
                    </div>

                </div>
                `
            });
        $('.cList').html(listContact);
        }
    }

    function clientListBody(currentList) {
        var listContact = "";
        // var contactLink = "AddContact.html?contact=";
        // var clientLink = "AddContact.html?client=";

        if(currentList){
            currentList.forEach(element => {
                listClient += `
                <div class="col-sm-4 col-lg-4">
                    <div class="counter-widget variant-1 color-1">
                        <div class="counter-icon">
                            <div class="front-content">
                                
                                <h4 class="m-t-0 m-b-5 header-title">
                                    <b class="name">${element.name?element.name:'Name'}</b>
                                </h4>
                                <p class="text-dark">
                                    <small>${element.group?element.group:'GROUP'}</small>
                                </p>
                                <p class="text-dark">
                                    <small>${element.legal_status?element.legal_status:'Legal Status'}</small>
                                </p>

                            </div>
                        </div>
                        <div class="counter-content">
                            <h3>Actions</h3>
                            <a title="Select/Deselect" class="btn bg-grey btn-sm selectable">
                                <i class="glyphicon glyphicon-ok-circle"></i>
                            </a>
                            <a title="View"  class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon glyphicon-user"></i>
                            </a>
                            <a title="Edit" href="${contactLink}${element.id}" class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon-pencil"></i>
                            </a>
                            <a title="Delete" id="${element.id}" class="deleteClient btn btn-danger btn-sm">
                                <i class="glyphicon glyphicon-trash"></i>
                            </a>

                        </div>
                    </div>

                </div>
                `
            });
        $('.cList').html(listContact);
        }
    }

    if(listOf === 'contact'){
    $.ajax({
        url: "https://office-management-demo.herokuapp.com/contacts/",
        datatype: "JSON",
        type: 'GET',
        success: function (contactListData) {

            contactListBody(contactListData);
            currentList = contactListData;

        }
    });
    }else if(listOf === 'client'){
        $.ajax({
            url:"https://heroku-office-client.herokuapp.com/client/individuals/", 
            datatype: "JSON",
            type: 'GET',
            success: function (clientListData) {
    
                contactListBody(clientListData);
                clientList = clientListData;
    
            }
        });
        $('.CTC').addClass('hide');
    }


    $(document).on('click', '.deleteContact', function () {
        var id = $(this).attr('id');
        swal({
                title: "Are you sure?",
                text: "You want to delete this Contact!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                   
                    swal("Poof! Your contact has been deleted!", {
                        icon: "success",
                    });
                    $.ajax({
                        url: "https://office-management-demo.herokuapp.com/contacts/" +id+'/',
                        type: 'DELETE',
                        async:false,
                        datatype: "JSON",
                        success: function () {
                           swal('Contact Id' + id + ' has been deleted!!');
                        }
                    });
                    $('.cList').empty();
                    $.ajax({
                        url: "https://office-management-demo.herokuapp.com/contacts/",
                        datatype: "JSON",
                        type: 'GET',
                        success: function (contactListData) {
                            contactListBody(contactListData);
                            currentList = contactListData
                        }
                    });

                }
            });
    });


    $(document).on('click', '.selectable', function () {
        if ($(this).hasClass('bg-grey')) {
            $(this).removeClass('bg-grey');
            $(this).addClass('btn-info');
        } else {
            $(this).removeClass('btn-info');
            $(this).addClass('bg-grey');
            if($('.selectable').hasClass('btn-info') == false){
                $('.actionBut').attr('disabled',true);
            }
        }

        if ($(this).children('.glyphicon').hasClass('glyphicon-ok-circle')) {
            $(this).children('.glyphicon').removeClass('glyphicon-ok-circle');
            $(this).parents('.counter-widget').removeClass('color-1');
            $(this).parents('.counter-widget').addClass('color-4');
            $(this).children('.glyphicon').addClass('glyphicon-remove-circle');
            $('.actionBut').attr('disabled', false);
            
        } else if ($(this).children('.glyphicon').hasClass('glyphicon-remove-circle')) {
            $(this).children('.glyphicon').removeClass('glyphicon-remove-circle');
            $(this).parents('.counter-widget').removeClass('color-4');
            $(this).parents('.counter-widget').addClass('color-1');
            $(this).children('.glyphicon').addClass('glyphicon-ok-circle');
        }


        // Manage de-select
       // ($(this).children('.glyphicon').hasClass('glyphicon-ok-circle'))
            

    });

    $(document).on('click',".selectAll", function () {
        if ($(this).is(':checked')) {
            $('.actionBut').attr('disabled', false);
            $(".selectable").children('.glyphicon').removeClass('glyphicon-ok-circle');
            $(".selectable").parents('.counter-widget').removeClass('color-1');
            $(".selectable").parents('.counter-widget').addClass('color-4');
            $(".selectable").children('.glyphicon').addClass('glyphicon-remove-circle');
            $('.selectable').removeClass('bg-grey');
            $('.selectable').addClass('btn-info');
            $(".textMuted").html('Deselect All');
        } else if (!$(this).is(':checked')) {
            $('.actionBut').attr('disabled', true);
            $(".selectable").children('.glyphicon').removeClass('glyphicon-remove-circle');
            $(".selectable").parents('.counter-widget').removeClass('color-4');
            $(".selectable").parents('.counter-widget').addClass('color-1');
            $(".selectable").children('.glyphicon').addClass('glyphicon-ok-circle');
            $('.selectable').removeClass('btn-info');
            $('.selectable').addClass('bg-grey');
            $(".textMuted").html('Select All');
        }
    });

    function compareName(a, b) {
        if (a.name <= b.name)
            return -1;
        if (a.name > b.name)
            return 1;
    }
    function compareOrganisation(a, b) {
        if (a.organisation <= b.organisation)
            return -1;
        if (a.organisation > b.organisation)
            return 1;
    }
    function compareDesignation(a, b) {
        if (a.designation <= b.designation)
            return -1;
        if (a.designation > b.designation)
            return 1;
    }

    $(document).on('click',".sortByName", function () {
        var sortByName = currentList.sort(compareName);
        contactListBody(sortByName);
    });

    $(document).on('click',".sortByOrganisation", function () {
        var sortByOrganisation = currentList.sort(compareOrganisation);
        contactListBody(sortByOrganisation);
    });

    $(document).on('click',".sortByDesignation", function () {
        var sortByDesignation = currentList.sort(compareDesignation);
        contactListBody(sortByDesignation);
    });
    $(document).on('click','.searchContact', function (e) {
        e.preventDefault();
        var searchData = $('.searchContactText').val();
        $('.cList').empty();
        $.ajax({
            url: "https://office-management-demo.herokuapp.com/contacts/?name="+searchData,
            datatype: 'JSON',
            type: 'GET',
            success: function (searchResult) {
                contactListBody(searchResult);
            },
            error: function (err) {
                swal('server not coonected!!!' + err);
            },
            complete: function (data) {
                if($('.cList').children().length == 0){
                    swal('No data found!');
                } 
            }
        });

    });

});