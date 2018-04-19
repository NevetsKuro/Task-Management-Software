/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: widgets/widget-echarts-box.js;

*/


"use strict";


$(document).ready(function(){
	setTimeout(function(){
        App.initSchemeColor();
    }, 100);

	setTimeout(function(){
		echart_box_init();
	},  100);

	$(document).delegate(".theme-color", 'click', function(){
        var id = $(this).attr('id');

        setTimeout(function(){
            App.initSchemeColor();
        }, 100);

        setTimeout(function(){
            echart_box_init();
        }, 100);
    });
});


function echart_box_init() {

	var echart_box = [];
    var echart_box_dom = $("[data-md='echart-box']");
    var week_days = [
    	"MON",
    	"TUE",
    	"WED",
    	"THU",
    	"FRI",
    	"SAT"
    ];

    var delay = $('html').hasClass('firefox') ? 50 : 0;



    var echarts_options = {
        0 :  {
        	color: App.scheme_colors,
        	grid: { 
                x: 30,
                y: 23,
                x2: 58,
                y2: 23
            },
	        title : {
	            y: 'top',
	            x: 'center',
	            // padding: 20,
	            itemGap: 2,
	            text: 'BUDGET',
	            subtext: '',
	            textStyle : {
            		color : "#fff"
            	}
	        },
	        tooltip : { 
	            trigger: 'axis',
	            showDelay: 0,
	            hideDelay: 50,
	            transitionDuration:0,
	            backgroundColor : 'rgba(0,0,0,0.5)',
	            borderRadius : 4,
	            borderWidth: 0,
	            padding: 10,    // [5, 10, 15, 20],
	            axisPointer: {
                    lineStyle: {
                        width: 2,
                        type: 'solid'
                    }
                }
	        },
	        legend: {
	        	show: false,
	            x: 'center', // 'center' | 'left' | {number},
	            data:['Budget']
	        },
	        toolbox: {
	            show : false
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : week_days,
	                axisLine : {   
		                show: true,
		                lineStyle: {
		                    type: 'solid',
		                    width: 1
		                }
		            },
		            axisLabel : {
		            	textStyle : {
		            		// color : App.scheme_colors[3]
		            	}
		            }
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                axisLine : {   
		                show: false,
		                // color: App.scheme_colors[3],
		                lineStyle: {
		                    // color: App.scheme_colors[3],
		                    type: 'solid',
		                    width: 1
		                }
		            },
		            axisLabel : {
		            	textStyle : {
		            		// color : App.scheme_colors[3]
		            	}
		            }
	            }
	        ],
	        series : [
	            {
	                name:'Budget',
	                type:'bar',
	                data:[1021.0, 2321.0, 802.0, 1293.0, 1503.0, 1890.0, 1698.0],
	                markPoint : {
	                    data : [
	                        {type : 'max', name: 'Max'},
	                        {type : 'min', name: 'Min'}
	                    ]
	                },
	                markLine : {
	                    data : [
	                        {type : 'average', name: 'Average Value'}
	                    ]
	                },
	                itemStyle: {
	                    normal: {
	                        barBorderRadius: 0
	                    },
	                    emphasis: {
	                        barBorderRadius: 0
	                    }
	                }
	            }
	        ],
	        textStyle: {
	            fontFamily: 'Microsoft yahei, Arial, Verdana, sans-serif'
	        },
	        axis: {
	        	show: false
	        }
	    },
	    1:  {
	    	color: [App.scheme_colors[2]],
        	backgroundColor: "#fff",
        	grid: {	
        		x: 45,
        		y: 30,
        		x2: 60,
        		y2: 30
        	},
		    title : {
	            y: 'bottom',
	            x: 'center',
	            padding: 0,
	            text: '',
	            subtext: '',
	            textStyle : {
            		// color : App.scheme_colors[1],
            	}
	        },
		    tooltip : { 
	            trigger: 'axis',
	            showDelay: 0,
	            hideDelay: 50,
	            transitionDuration:0,
	            backgroundColor : 'rgba(0,0,0,0.5)',
	            borderRadius : 4,
	            borderWidth: 0,
	            padding: 10,    // [5, 10, 15, 20],
	            axisPointer: {
                    lineStyle: {
                        // color: App.scheme_colors[1],
                        width: 2,
                        type: 'solid'
                    }
                }
	        },
		    legend: {
		    	show: true,
		        data:['Today\'s Visits']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'value',
		            boundaryGap : [0, 0.01],
		            axisLine : {   
		                show: true,
		                // color: App.scheme_colors[1],
		                lineStyle: {
		                    // color: App.scheme_colors[1],
		                    type: 'solid',
		                    width: 1
		                }
		            },
		            axisLabel : {
		            	textStyle : {
		            		// color : App.scheme_colors[1],
		            	}
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            data : ['Firefox','IE','Chrome','Opera','Safari'],
		            axisLine : {   
		                show: true,
		                // color: App.scheme_colors[1],
		                lineStyle: {
		                    // color: App.scheme_colors[1],
		                    type: 'solid',
		                    width: 1
		                }
		            },
		            axisLabel : {
		            	textStyle : {
		            		// color : App.scheme_colors[1]
		            	}
		            }
		        }
		    ],
		    series : [
		        {
		            name:'Today\'s Visits',
		            type:'bar',
		            data:[40510, 23489, 29034, 10497, 13174, 13023],
		            itemStyle: {
	                    normal: {
	                        barBorderRadius: 0
	                    },
	                    emphasis: {
	                        barBorderRadius: 0
	                    }
	                }
		        }
		    ]
		},
		2: {
			color : ["#3b5998", "#55acee", "#dd4b39", "#125688", "#0072b1", "#007bb5", "#1769ff"],
		    title : {
		        text: '',
		        subtext: '',
		        x:'center',
		        y: 'top'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	show: false,
		        x : 'center',
		        y : 'bottom',
		        data:['Facebook','Twitter','Google Plus','Instagram','Foursquare','LinkedIn','Behance']
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : true,
		    series : [
		        {
		            name:'Today\'s Visits',
		            type:'pie',
		            radius : [30, 110],
		            center : ['50%', 200],
		            roseType : 'area',
		            x: '50%',               // for funnel
		            max: 40,                // for funnel
		            sort : 'ascending',     // for funnel
		            data:[
		                {value:10, name:'Facebook'},
		                {value:5, name:'Twitter'},
		                {value:15, name:'Google +'},
		                {value:25, name:'Instagram'},
		                {value:20, name:'Foursquare'},
		                {value:35, name:'LinkedIn'},
		                {value:30, name:'Behance'}
		            ]
		        }
		    ]
		},
		3: {
        	color: [App.scheme_colors[1]],
        	backgroundColor: "#fff",
        	grid: {	
        		x: 45,
        		y: 4,
        		x2: 62,
        		y2: 30
        	},
	        title : {
	            y: 'top',
	            x: 'center',
	            padding: 0,
	            // itemGap: 10,
	            text: '',
	            subtext: '',
	            textStyle : {
            		color : App.scheme_colors[1]
            	}
	        },
	        tooltip : { 
	            trigger: 'axis',
	            showDelay: 0,
	            hideDelay: 50,
	            transitionDuration:0,
	            backgroundColor : 'rgba(0,0,0,0.5)',
	            borderRadius : 4,
	            borderWidth: 0,
	            padding: 10,    // [5, 10, 15, 20],
	            axisPointer: {
                    lineStyle: {
                        color: App.scheme_colors[1],
                        width: 2,
                        type: 'solid'
                    }
                }
	        },
	        legend: {
	        	show: false,
	            x: 'center', // 'center' | 'left' | {number},
	            data:['Earnings']
	        },
	        toolbox: {
	            show : false
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : ["SEP", "OCT", "NOV", "DEC"],
	                axisLine : {   
		                show: true,
		                lineStyle: {
		                    color: App.scheme_colors[1],
		                    type: 'solid',
		                    width: 1
		                }
		            },
		            axisLabel : {
		            	textStyle : {
		            		color : "#fff"
		            	}
		            }
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                axisLine : {   
		                show: false,
		                color: App.scheme_colors[1],
		                lineStyle: {
		                    color: App.scheme_colors[1],
		                    type: 'solid',
		                    width: 1
		                }
		            },
		            axisLabel : {
		            	textStyle : {
		            		color : App.scheme_colors[1]
		            	}
		            }
	            }
	        ],
	        series : [
	            {
	                name:'Earnings',
	                type:'bar',
	                data:[23221.0, 26471.0, 31022.0, 34201.0],
	                markPoint : {
	                    data : [
	                        {type : 'max', name: 'Max'},
	                        {type : 'min', name: 'Min'}
	                    ]
	                },
	                markLine : {
	                    data : [
	                        {type : 'average', name: 'Average Value'}
	                    ]
	                },
	                itemStyle: {
	                    normal: {
	                        barBorderRadius: 0
	                    },
	                    emphasis: {
	                        barBorderRadius: 0
	                    }
	                }
	            }
	        ],
	        textStyle: {
	            fontFamily: 'Microsoft yahei, Arial, Verdana, sans-serif'
	        },
	        axis: {
	        	show: false
	        }
	    }

    };



	var option = echarts_options;

    // Setup the path
    require.config({
        paths: {
            echarts: '../../assets/vendors/echarts'
        }
    });

    // Configuration
    require(
        [
            'echarts',
            'echarts/theme/macarons',
            'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/scatter',
            'echarts/chart/k',
            'echarts/chart/pie',
            'echarts/chart/radar',
            'echarts/chart/force',
            'echarts/chart/chord',
            'echarts/chart/gauge',
            'echarts/chart/funnel',
            'echarts/chart/eventRiver',
            'echarts/chart/venn',
            'echarts/chart/treemap',
            'echarts/chart/tree',
            'echarts/chart/wordCloud',
            'echarts/chart/heatmap',
            'echarts/chart/map',
        ],

        // Charts setup
        function (ec, macarons) {

            var theme = macarons;

            setTimeout(function(){
            	for (var i = 0, l = echart_box_dom.length; i < l; i++) {
	                // Initialize charts
	                echart_box[i] = ec.init(echart_box_dom[i], theme);
	                // Set charts options
	                echart_box[i].setOption(option[i]);
	            }
            }, delay);

            $(window).resize(function(){
            	var width = getViewport(1, 0);

		    	if(width >= 500) {
		    		resizeECharts(echart_box);
		    	}
                
            });

        }
    );


    $(".toggle-sidebar").on("click", function(){
    	setTimeout(function(){
	        App.initSchemeColor();
	    }, 1000);

	    console.log(App.scheme_colors[1]);

        setTimeout(function(){
            resizeECharts(echart_box);
        }, 1200);
    });

    $(window).resize(function(){
    	var width = getViewport(1, 0);

    	if(width >= 500) {
    		setTimeout(function(){
	            resizeECharts(echart_box);
	        }, 1200);
    	}
	    
	});

}


function resizeECharts(echart_box) {
    if($("[data-md='echart-box']").length) {
        setTimeout(function(){
            for (var i = 0, l = echart_box.length; i < l; i++) {
                echart_box[i].resize && echart_box[i].resize();
            }
        }, 300);
    }
}