$(document).ready(function () {

    var currentList = [];
    var urlParams = GetURLParams();

    var listOf = urlParams['listOf'];

    window.onscroll = function () {
        myFunction()
    };

    // Get the row
    var navbar = $("#sticky_row");

    // Get the offset position of the row
    var sticky = 200;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.addClass("sticky");
        } else if (window.pageYOffset <= sticky) {
            navbar.removeClass("sticky");
        }
    }

    //pass a parameter i.e. the list of contacts
    //function for creating cards for each contacts found in the array
    //currentList => array
    function contactListBody(currentList) {

        var listContact = "";
        var contactLink = "AddContact.html?contact=";
        var clientLink = "AddClient.html?client=";
        var contactViewLink = "ViewContact.html"

        if (currentList) {
            currentList.forEach(element => {
                var img = '';
                if (element.person_image != null) {
                    img = element.person_image;
                    img = urlRoot + img.substr(img.indexOf("media"));
                    // console.log(img);
                }
                //var
                //cosole.log(img2);
                listContact += `
                <div class="col-sm-4 col-lg-4" class="lilement">
                    <div class="counter-widget variant-1 color-1">
                        <div class="counter-icon">
                            <div class="front-content">
                                <a class="pull-left" href="#">
                                    <img height="60px" width="60px" class="img-circle personimg" src="${img}" alt="">
                                </a>

                                <h4 class="m-t-0 m-b-5 header-title">
                                    <b class="name">${element.name}</b>
                                </h4>
                                <p class="text-muted text-bold">${element.designation!=null?element.designation:''}</p>
                                <p class="text-dark">
                                    <small>${element.organisation!=null?element.organisation:''}</small>
                                </p>
                                <p class="text-dark">
                                    <small>${element.phone!=null?element.phone:''}</small>
                                </p>
                                <p class="text-dark m-l-50">
                                    <small>${element.email!=null? element.email : ''}</small>
                                </p>
                            </div>
                        </div>
                        <div class="counter-content">
                            <h3 class="color-white">Actions</h3>
                            <a title="Select/Deselect" class="btn bg-grey btn-sm selectable">
                                <i class="glyphicon glyphicon-ok-circle"></i>
                            </a>
                            <a title="View" href="${contactViewLink}?contact=${element.id}" class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon glyphicon-user"></i>
                            </a>
                            <a title="Edit" href="${contactLink}${element.id}" class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon-pencil"></i>
                            </a>
                            <a title="Delete" id="${element.id}" class="deleteContact btn btn-danger btn-sm">
                                <i class="glyphicon glyphicon-trash"></i>
                            </a>
                            <a title="Convert to Client" href="${clientLink}${element.id}" class="btn btn-primary btn-sm CTC">
                                <i class="glyphicon glyphicon-random"></i>
                            </a>
                            <a title="Export .PDF/.DOC" href="" class="btn btn-info btn-sm sm">
                                <i class="linear-icons li icon-cloud-upload f-s-18"></i>
                            </a> 
                        </div>
                    </div>
                </div>
                `
            });
            listContact += "</div>"
            $('.cList').html(listContact);
        }
        var Totalpages = $(".col-sm-4").length;
        var templateLI;
        var blocks = Math.ceil(Totalpages / pageSize);
        templateLI = `<li><a href="#">« PREV</a></li>`;
        for (let i = 0; i < blocks; i++) {
            templateLI += `<li><a href="#">${i+1}</a>`;
        }
        templateLI += `<li><a href="#">NEXT »</a></li>`;
        $("#pagin").html(templateLI);
        $("#pagin li:nth-child(2)").addClass('active');
        showPage(1);
    }

    //pass a parameter i.e. the list of clients
    //function for creating cards for each client found in the array
    //currentList => array 
    function clientListBody(currentList) {
        var listClient = "";
        var clientLink = "AddClient.html?client=";
        var clientViewLink = "ViewClient.html"
        var legal_stats, legal_No;
        if (currentList.length) {
            currentList.forEach(element => {
                switch (element.legalstatus) {
                    case 'I':
                        legal_stats = 'Individuals';
                        legal_No = 1;
                        break;
                    case 'H':
                        legal_stats = 'Hufs';
                        legal_No = 2;
                        break;
                    case 'N':
                        legal_stats = 'Partnership';
                        legal_No = 4;
                        break;
                    case 'P':
                        legal_stats = 'Proprietors';
                        legal_No = 3;
                        break;
                    case 'C':
                        legal_stats = 'Company';
                        legal_No = 6;
                        break;
                    case 'L':
                        legal_stats = 'LLP';
                        legal_No = 5;
                        break;
                    case 'A':
                        legal_stats = 'AOP/BOI';
                        legal_No = 7;
                        break;
                    case 'T':
                        legal_stats = 'Trusts';
                        legal_No = 8;
                        break;
                }

                listClient += `
                <div class="col-sm-4 col-lg-4">
                    <div class="counter-widget variant-1 color-1">
                        <div class="counter-icon">
                            <div class="front-content">
                                
                                <h4 class="m-t-0 m-b-5 header-title">
                                    <b class="name">${element.name?element.name:'Name'}</b>
                                </h4>
                                <p class="text-dark">
                                    <small>${legal_stats?legal_stats:'Legal Status'}</small>
                                </p>
                                <p class="text-dark">
                                    <small>${element.phone!=null?element.phone:''}</small>
                                </p>
                                <p class="text-dark">
                                    <small>${element.email!=null?element.email:''}</small>
                                </p>
                                <p class="text-dark">
                                    <small>${legal_stats == 'Individuals'?element.designation!=null?element.designation:'':''}</small>
                                </p>

                            </div>
                        </div>
                        <div class="counter-content">
                            <h3 class="color-white">Actions</h3>
                            <a title="Select/Deselect" class="btn bg-grey btn-sm selectable">
                                <i class="glyphicon glyphicon-ok-circle"></i>
                            </a>
                            <a title="View" href="ViewClient.html?id=${element.id}&legalstats=${legal_No}" class="btn btn-success btn-sm">
                                <i class="glyphicon glyphicon glyphicon-user"></i>
                            </a>
                            <a title="Edit" href="${clientLink}${element.id}&legal=${legal_No}" class="btn btn-success btn-sm">
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
            $('.cList').html(listClient);
        }
        $('.personimg').attr('height', $('.personimg').attr('width'));
        
        //Pagination for the list
        var Totalpages = $(".col-sm-4").length;
        var templateLI;
        var blocks = Math.ceil(Totalpages / pageSize);
        templateLI = `<li><a href="#">« PREV</a></li>`;
        for (let i = 0; i < blocks; i++) {
            templateLI += `<li><a href="#">${i+1}</a>`;
        }
        templateLI += `<li><a href="#">NEXT »</a></li>`;
        $("#pagin").html(templateLI);
        $("#pagin li:nth-child(2)").addClass('active');
        showPage(1);
    }

    if (listOf === 'contact') {
        $.ajax({
            url: urlRoot + 'contacts/',
            datatype: "JSON",
            type: 'GET',
            success: function (contactListData) {

                contactListBody(contactListData);
                currentList = contactListData;

            }
        });
    } else if (listOf === 'client') {
        $.ajax({
            url: urlRoot + 'clients/allclients',
            datatype: "JSON",
            type: 'GET',
            success: function (clientListData) {

                clientListBody(clientListData);
                currentList = clientListData;

            }
        });
        $('.CTC').addClass('hide');
    }

    //Custom Pagination
    var pageSize = 12;

    showPage = function (page) {
        $(".col-sm-4").hide();
        $(".col-sm-4").each(function (n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
        });
    }

    $(document).on('click', '#pagin li a', function (e) {
        e.preventDefault();
        $("#pagin li").removeClass("active");
        $(this).parent().addClass("active");
        showPage(parseInt($(this).text()));
    });

    $('#pagin li').css('display', 'inline-block');
    $('#paginate').css('text-align', 'center');

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
                        url: urlRoot + 'contacts/' + id + '/',
                        type: 'DELETE',
                        async: false,
                        datatype: "JSON",
                        success: function () {
                            swal('Contact Id' + id + ' has been deleted!!');
                        }
                    });
                    $('.cList').empty();
                    $.ajax({
                        url: urlRoot + 'contacts/',
                        datatype: 'JSON',
                        type: 'GET',
                        success: function (contactListData) {
                            contactListBody(contactListData);
                            currentList = contactListData
                        }
                    });

                }
            });
    });

    $(document).on('click', '.deleteSelected', function () {
        var ids = [];
        $('.color-4').each(function () {
            ids.push($(this).find('.deleteContact').attr('id'));
        });
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
                    for (let i = 0; i < ids.length; i++) {
                        $.ajax({
                            url: urlRoot + 'contacts/' + ids[i] + '/',
                            type: 'DELETE',
                            async: false,
                            datatype: "JSON",
                            success: function () {
                                swal('Contact Id has been deleted!!');
                            },
                            error: function (error) {
                                swal(error.responseText);
                            }

                        });
                    }
                    $('.cList').empty();
                    $.ajax({
                        url: urlRoot + 'contacts/',
                        datatype: 'JSON',
                        type: 'GET',
                        success: function (contactListData) {
                            contactListBody(contactListData);
                            currentList = contactListData
                        }
                    });
                }
            });
    });

    //Select Function for Deleting
    $(document).on('click', '.selectable', function () {
        if ($(this).hasClass('bg-grey')) {
            $(this).removeClass('bg-grey');
            $(this).addClass('btn-info');
        } else {
            $(this).removeClass('btn-info');
            $(this).addClass('bg-grey');
            if ($('.selectable').hasClass('btn-info') == false) {
                $('.actionBut').attr('disabled', true);
            }
        }

        if ($(this).children('.glyphicon').hasClass('glyphicon-ok-circle')) {
            $(this).children('.glyphicon').removeClass('glyphicon-ok-circle');
            $(this).parents('.counter-widget').removeClass('color-1');
            $(this).parents('.counter-widget').addClass('color-4');
            $(this).children('.glyphicon').addClass('glyphicon-remove-circle');
            $('.actionBut').attr('disabled', false);
            $('.counter-widget.variant-1 .counter-icon .front-content p').addClass('color-white');
            $('.header-title').addClass('color-white');
        } else if ($(this).children('.glyphicon').hasClass('glyphicon-remove-circle')) {
            $(this).children('.glyphicon').removeClass('glyphicon-remove-circle');
            $(this).parents('.counter-widget').removeClass('color-4');
            $(this).parents('.counter-widget').addClass('color-1');
            $(this).children('.glyphicon').addClass('glyphicon-ok-circle');
            $('.counter-widget.variant-1 .counter-icon .front-content p').addClass('color-black');
            $('.header-title').addClass('color-black');
        }
    });

    $(document).on('click', ".selectAll", function () {
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


    //Sort By Functions
    function compareFName(a, b) {
        if (a.name.split(' ')[0] <= b.name.split(' ')[0])
            return -1;
        if (a.name.split(' ')[0] > b.name.split(' ')[0])
            return 1;
    }

    function compareLName(a, b) {
        if (a.name.split(' ')[a.name.split(' ').length - 1] <= b.name.split(' ')[b.name.split(' ').length - 1])
            return -1;
        if (a.name.split(' ')[a.name.split(' ').length - 1] > b.name.split(' ')[b.name.split(' ').length - 1])
            return 1;
    }

    function compareOrganisation(a, b) {
        if (a.organisation == null)
            return 1;
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

    $(document).on('click', ".sortByFName", function () {
        var sortByFName = currentList.sort(compareFName);
        (listOf == 'contact' ? contactListBody(sortByFName) : clientListBody(sortByFName));
    });
    $(document).on('click', ".sortByLName", function () {
        var sortByLName = currentList.sort(compareLName);
        (listOf == 'contact' ? contactListBody(sortByLName) : clientListBody(sortByLName));
    });
    $(document).on('click', ".sortByOrganisation", function () {
        var sortByOrganisation = currentList.sort(compareOrganisation);    
        (listOf == 'contact' ? contactListBody(sortByOrganisation) : clientListBody(sortByOrganisation));
    });
    $(document).on('click', ".sortByDesignation", function () {
        var sortByDesignation = currentList.sort(compareDesignation);
        (listOf == 'contact' ? contactListBody(sortByDesignation) : clientListBody(sortByDesignation));
    });

    $(document).on('click', '.searchContact', function (e) {
        e.preventDefault();
        var searchData = $('.searchContactText').val();
        $('.cList').empty();
        if(true){
            $.ajax({
                url: urlRoot + 'contacts/?name=' + searchData,
                datatype: 'JSON',
                type: 'GET',
                success: function (searchResult) {
                    contactListBody(searchResult);
                },
                error: function (err) {
                    swal('server not conected!!!' + err);
                },
                complete: function (data) {
                    if ($('.cList').children().length == 0) {
                        swal('No data found!');
                    }
                }
            });
        }else{
            // $.ajax({
            //     url: urlRoot + 'clients/allclients/?name=' + searchData,
            //     datatype: 'JSON',
            //     type: 'GET',
            //     success: function (searchResult) {
            //         clientListBody(searchResult);
            //     },
            //     error: function (err) {
            //         swal('server not conected!!!' + err);
            //     },
            //     complete: function (data) {
            //         if ($('.cList').children().length == 0) {
            //             swal('No data found!');
            //         }
            //     }
            // });
        }
    });
});