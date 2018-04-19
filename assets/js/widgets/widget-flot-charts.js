/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: widgets/widget-flot-chart.js;

*/


"use strict";


$(document).ready(function(){

	setTimeout(function(){
		load_widget_flot_charts();
	}, 1000);

	$(document).delegate(".theme-color", 'click', function(){

		setTimeout(function(){
            App.initSchemeColor();
        }, 100);
        
		setTimeout(function(){
			load_widget_flot_charts();
		}, 800);
	});
	
});


function load_widget_flot_charts() {

	var flot_border_color = "#f5f5f5";


	/*
	* Set widget charts
	***************************************
	*/
	var widget_sales_charts = $("#widget-sales-chart");
	var widget_tasks_charts = $("#widget-tasks-chart");
	var widget_visits_charts = $("#widget-visits-chart");
	var widget_number_sales_chart = $("#widget-number-sales-chart");
	

	/*
	* Sales Chart: Set flot charts options
	***************************************
	*/
	var widget_sales_revenue = [["1",0], ["2",70], ["3",80], ["4",60], ["5",100], ["6",80], ["7",100]];
	var widget_sales_sales = [["1",0], ["2",30], ["3",50], ["4",45], ["5",80], ["6",90], ["7",70]];
	var widget_sales_labels = ["Revenue", "Earnings"];
	var widget_sales_colors = [App.scheme_colors[0], App.scheme_colors[2]];
	var widget_sales_borderColor = flot_border_color;
	var widget_sales_bgColor = '#fff';
	var widget_sales_options = {
		series : {
			lines : {
				show : false,
				fill : true,
				lineWidth : 1,
				fillColor : {
					colors : [{
						opacity : 0.5
					}, {
						opacity : 0.5
					}]
				}
			},
			points : {
				show : true
			},
			shadowSize : 0,
			splines: {
                show: !0,
                tension: .39,
                lineWidth: 5,
                fill: 1,
                fillColor: widget_sales_colors[0]
            }
		},
		grid : {
			hoverable : true,
			clickable : true,
			borderColor : widget_sales_borderColor,
			tickColor : flot_border_color,
			borderWidth : 1,
			labelMargin : 10,
			backgroundColor : widget_sales_bgColor
		},
		legend : {
			position : "ne",
			margin : [0, -24],
			noColumns : 0,
			labelBoxBorderColor : null,
			labelFormatter : function(label, series) {
				// just add some space to labes
				return '' + label + '&nbsp;&nbsp;';
			},
			width : 30,
			height : 2
		}
	};





	/*
	* Task Chart: Set flot charts options
	***************************************
	*/
	var  widget_task_todo = [];
	for (var i = 0; i <= 10; i += 1)
		widget_task_todo.push([i, parseInt(Math.random() * 30)]);

	var widget_task_progress = [];
	for (var i = 0; i <= 10; i += 1)
		widget_task_progress.push([i, parseInt(Math.random() * 30)]);

	var widget_task_done = [];
	for (var i = 0; i <= 10; i += 1)
		widget_task_done.push([i, parseInt(Math.random() * 30)]);

	var widget_task_ds = new Array();

	widget_task_ds.push({
		label : "Todo",
		data : widget_task_todo,
		bars : {
			order : 1
		}
	});
	widget_task_ds.push({
		label : "Progress",
		data : widget_task_progress,
		bars : {
			order : 2
		}
	});
	widget_task_ds.push({
		label : "Done",
		data : widget_task_done,
		bars : {
			order : 3
		}
	});

	var widget_task_options = {
		bars : {
			show : true,
			barWidth : 0.2,
			fill : 1
		},
		grid : {
			show : true,
			aboveData : false,
			labelMargin : 5,
			axisMargin : 0,
			borderWidth : 1,
			minBorderMargin : 5,
			clickable : true,
			hoverable : true,
			autoHighlight : false,
			mouseActiveRadius : 20,
			borderColor : flot_border_color
		},
		series : {
			stack : 1
		},
		legend : {
			position : "ne",
			margin : [0, -24],
			noColumns : 0,
			labelBoxBorderColor : null,
			labelFormatter : function(label, series) {
				// just add some space to labes
				return '' + label + '&nbsp;&nbsp;';
			},
			width : 30,
			height : 2
		},
		yaxis : {
			tickColor : flot_border_color
		},
		xaxis : {
			tickColor : flot_border_color
		},
		colors : [App.scheme_colors[4], App.scheme_colors[5], App.scheme_colors[3]]
	};





	/*
	* Visits Chart: Set flot charts options
	***************************************
	*/
	var widget_visits_users = [["1",0], ["2",70], ["3",80], ["4",60], ["5",100], ["6",80], ["7",100]];
	var widget_visits_customers = [["1",0], ["2",30], ["3",50], ["4",45], ["5",80], ["6",90], ["7",70]];
	var widget_visits_labels = ["Users", "Customers"];
	var widget_visits_colors = [App.scheme_colors[1], App.scheme_colors[2]];
	var widget_visits_borderColor = flot_border_color;
	var widget_visits_bgColor = '#fff';
	var widget_visits_options = {
		series : {
			lines : {
				show : true,
				fill : true,
				lineWidth : 1,
				fillColor : {
					colors : [{
						opacity : 0.5
					}, {
						opacity : 0.5
					}]
				}
			},
			points : {
				show : true
			},
			shadowSize : 0
		},
		grid : {
			hoverable : true,
			clickable : true,
			borderColor : widget_visits_borderColor,
			tickColor : flot_border_color,
			borderWidth : 1,
			labelMargin : 10,
			backgroundColor : widget_visits_bgColor
		},
		legend : {
			position : "ne",
			margin : [0, -24],
			noColumns : 0,
			labelBoxBorderColor : null,
			labelFormatter : function(label, series) {
				// just add some space to labes
				return '' + label + '&nbsp;&nbsp;';
			},
			width : 30,
			height : 2
		}
	};




	/*
	* Number of Sales Chart: Set flot charts options
	***************************************
	*/
	var widget_number_sales_colors = [App.scheme_colors[4], App.scheme_colors[0]];
	var widget_number_sales_labels = ["Themes", "Plugins"];

	var widget_number_sales_data_1 = [];
	for (var i = 0; i <= 11; i += 1) {
		widget_number_sales_data_1.push([i, parseInt(Math.random() * 30)]);
	}

	var widget_number_sales_data_2 = [];
	for (var i = 0; i <= 11; i += 1) {
		widget_number_sales_data_2.push([i, parseInt(Math.random() * 30)]);
	}

	var widget_number_sales_chart_options = {
		series: {
			stack: true,
			lines: {
				show: false,
				fill: true,
				steps: false
			},
			bars: {
				show: true,
				barWidth: 0.6
			}
		},
		xaxis: {
	        mode: "time",
	        tickColor : flot_border_color,
	        axisLabel: "",
	        axisLabelUseCanvas: true,
	        axisLabelFontSizePixels: 12,
	        axisLabelFontFamily: 'Verdana, Arial',
	        axisLabelPadding: 10,
	        ticks: [
	        	[0.0,"Jan"], 
	        	[1.0,"Feb"], 
	        	[2.0,"Mar"], 
	        	[3.0,"Apr"], 
	        	[4.0,"May"], 
	        	[5.0,"Jun"], 
	        	[6.0,"Jul"], 
	        	[7.0,"Aug"],
	        	[8.0,"Sep"],
	        	[9.0,"Oct"],
	        	[10.0,"Nov"],
	        	[11.0,"Dec"]
	        ],
	        axisLabelPadding: 5
	    },
	    yaxis : {
			tickColor : flot_border_color
		},
	    legend : {
			position : "ne",
			margin : [0, -24],
			noColumns : 0,
			labelBoxBorderColor : null,
			labelFormatter : function(label, series) {
				// just add some space to labes
				return '' + label + '&nbsp;&nbsp;';
			},
			width : 30,
			height : 2
		},
	    bars : {
			show : true,
			barWidth : 0.2,
			fill : 1
		},
		grid : {
			show : true,
			aboveData : false,
			labelMargin : 5,
			axisMargin : 0,
			borderWidth : 1,
			minBorderMargin : 5,
			clickable : true,
			hoverable : true,
			autoHighlight : false,
			mouseActiveRadius : 20,
			borderColor : flot_border_color
		},
	    colors: widget_number_sales_colors
	};




	try {
	    /*
		* Initialize flot charts
		***************************************
		*/

		$.plot(widget_sales_charts, [{
			data : widget_sales_revenue,
			label : widget_sales_labels[0],
			color : widget_sales_colors[0]
		}, {
			data : widget_sales_sales,
			label : widget_sales_labels[1],
			color : widget_sales_colors[1]
		}], widget_sales_options);
		widget_sales_charts.UseTooltip();


		$.plot(widget_tasks_charts, widget_task_ds, widget_task_options);
		widget_tasks_charts.UseTooltip();

		$.plot(widget_visits_charts, [{
			data : widget_visits_users,
			label : widget_visits_labels[0],
			color : widget_visits_colors[0]
		}, {
			data : widget_visits_customers,
			label : widget_visits_labels[1],
			color : widget_visits_colors[1]
		}], widget_visits_options);
		widget_visits_charts.UseTooltip();

    	$.plot(widget_number_sales_chart, [ 
    		{label: widget_number_sales_labels[0], data: widget_number_sales_data_1 },
    		{label: widget_number_sales_labels[1], data: widget_number_sales_data_2 }
    	], widget_number_sales_chart_options);
    	widget_number_sales_chart.customerChartTooltip();
		
	}
	catch(err) {
	    console.log(err);
	}
}


function gd(year, month, day) {
    return new Date(year, month, day).getTime();
}

function year(year) {    
    return new Date(year, 1, 1).getTime();
}

var previousPoint = null, previousLabel = null;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];



$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];

                var color = item.series.color;
                var month = new Date(x).getMonth();

                //console.log(item);

                if (item.seriesIndex == 0) {
                    showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "%</strong>");
                } else {
                    showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(%)");
                }
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};


$.fn.customerChartTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];

                var color = item.series.color;
                var month = new Date(x).getMonth();

                //console.log(item);

                if (item.seriesIndex == 0) {
                    showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>");
                } else {
                    showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(%)");
                }
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};


function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 20,
        left: x - 70,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}


$.fn.showMemo = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (!item) { return; }
        console.log(item.series.data)
        var html = [];
        var percent = parseFloat(item.series.percent).toFixed(2);        

        html.push("<div style=\"border:1px solid grey;background-color:",
             item.series.color,
             "\">",
             "<span style=\"color:white\">",
             item.series.label,
             " : ",
             $.formatNumber(item.series.data[0][1], { format: "#,###", locale: "us" }),
             " (", percent, "%)",
             "</span>", 
             "</div>");
        $("#flot-memo").html(html.join(''));
    });
}