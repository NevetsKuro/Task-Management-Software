$(document).ready(function(){



$( function() {
    $( ".datepickr" ).datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd-mm-yy'
    });
    // $( function() {
    //     var myCalendar = $( "#calendar" );
    //     myCalendar.fullCalendar({
    //         selectable: true,
    //         header: {
    //             left: 'month,agendaWeek,agendaDay',
    //             center: 'title',
    //             right: 'prev,next today'
    //             },
    //             // dayClick: function(date) {
    //             //     alert("yuh click" + date.format('D-MM-YYYY'));
    //             //     swal({
    //             //         text: "Enter the event here.",
    //             //         content: "input",
    //             //         showCancelButton: true,
    //             //         animation: "slide-from-top",
    //             //         inputPlaceholder: "Event",
    //             //         button:{
    //             //             text:"Add",
    //             //             closeModal:false,
    //             //         },
    //             //         })
    //             //         .then((value)=>{
    //             //             swal("you typed "+ value);
    //             //         })
    //             // },
    //             select: function(startDate, endDate) {
    //             // alert('selected ' + startDate.format() + ' to ' + endDate.format());
    //             $('#lFrom').removeClass('hide');
    //             $('#lTo').removeClass('hide');
    //             $('#reas').removeClass('hide');
    //             var lf = $('#leaveFrom').val(startDate.format('D-MM-YYYY'));
    //             var lt = $('#leaveTo').val(endDate.format('D-MM-YYYY'));
                
    //             $('#leaveSubmit').on('click',function( lt, lf){

    //             var reason = $('#reason').val();

    //             swal("running!"+ lt + " " + lf);

    //             $('#calendar').fullCalendar('renderEvent',{
    //                     title:reason,
    //                     start: lf,
    //                     end: lt,
    //                     allDay: true
    //                     });
    //             });
            
    //         }
    //     });
    
    // });
            $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2018-03-12',
                    navLinks: true, // can click day/week names to navigate views
                    selectable: true,
                    selectHelper: true,
                    select: function(start, end) {
                        var title = prompt("Enter the event name!!"); 
                        var eventData;
                        if (title) {
                        eventData = {
                            title: title,
                            start: start,
                            end: end
                        };
                        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                        events.push(eventData);
                        }
                        $('#calendar').fullCalendar('unselect');
                    },
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: [
                        {
                        title: 'Birthday Party',
                        start: '2018-03-13T07:00:00'
                        },
                        {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2018-03-28'
                        }
                    ]
                    });

  });
});


$(window).load(function(){
    $(".select2").select2({
      tags: true,
      createTag: function (params) {
        return {
          id: params.term,
          text: params.term,
          newOption: true
        }
      },
      templateResult: function (data) {
        var $result = $("<span></span>");

        $result.text(data.text);

        if (data.newOption) {
          $result.append(" <em>(add new)</em>");
        }

        return $result;
      }
    });
    $('.select2').on('select2:select', function (e) {
        var data = e.params.data;
        console.log(data);
    });
});