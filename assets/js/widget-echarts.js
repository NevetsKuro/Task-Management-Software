/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: widgets/widget-echarts.js;

*/


"use strict";



$(document).ready(function(){

    

    setTimeout(function(){
        echart_init();
    }, 100);

    $(document).delegate(".theme-color", 'click', function(){
        var id = $(this).attr('id');

        setTimeout(function(){
            App.initSchemeColor();
        }, 100);

        setTimeout(function(){
            echart_init();
        }, 100);
    });
});


function echart_init() {
    var pie7_idx = 1;

    var myChart = [];
    var domMain = $("[data-md='main']");

    var delay = $('html').hasClass('firefox') ? 50 : 0;


    var echarts_options = {
        0 :  {
            color: App.scheme_colors,
            roamController: {
                padding: 20
            },
            grid: { 
                x: 45,
                y: 32,
                x2: 58,
                y2: 70
            },
            title : {
                y: 'bottom',
                x: 'center',
                text: 'Site Activity',
                subtext: '',
                textStyle: {
                    color: App.scheme_colors[0]
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: App.scheme_colors[0],
                        width: 2,
                        type: 'solid'
                    }
                }
            },
            legend: {
                data:['Google', 'Bing', 'Baidu', 'Naver']
            },
            toolbox: {
                show : true,
                orient: 'vertical',
                backgroundColor: 'rgba(0,0,0,0)', // Toolbox background color
                borderColor: '#eee',       // Toolbox border color
                borderWidth:.5,            // Toolbox border lineweight, in px, defaults to 0 (no border)
                padding: 10,   
                feature : {
                    mark : {
                        show: true,
                         title : {
                            mark : 'Mark',
                            markUndo : 'Undo',
                            markClear : 'Clear'
                        }
                    },
                    dataZoom : {
                        show : true,
                        title : {
                            dataZoom : 'Area Zoom',
                            dataZoomReset : 'Area Zoom - Back'
                        }
                    },
                    dataView : {
                        show: true, 
                        title : 'Data View',
                        readOnly: false,
                        lang : ['The data view', 'Close', 'Refresh'],
                    },
                    magicType : {
                        show: true, 
                        title : {
                            line : 'Dynamic Type Switching - Line chart',
                            bar : 'Dynamic Type Switching - Column Chart',
                            stack : 'Dynamic Type Switching - Stacking',
                            tiled : 'Dynamic Type Toggle - Tile'
                        },
                        type: []
                    },
                    restore : {
                        show: true,
                        title: 'Refresh',
                        color: ''
                    },
                    saveAsImage : {
                        show: true,
                        title: 'Save as picture',
                        type : 'jpeg',
                        lang : ['Click Save locally']
                    }
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: App.scheme_colors[0],
                            width: 2,
                            type: 'solid'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: App.scheme_colors[0],
                            width: 2,
                            type: 'solid'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'Google',
                    type:'bar',
                    smooth:true,
                    data:[23021, 16092, 35423, 18291, 32431, 17801, 28093],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }   
                },
                {
                    name:'Bing',
                    type:'bar',
                    smooth:true,
                    data:[12091, 32001, 13095, 15420, 31021, 15402, 26093],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }   
                },
                {
                    name:'Baidu',
                    type:'bar',
                    smooth:true,
                    data:[25021, 18201, 10271, 8012, 18721, 30121, 30121],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }   
                },
                {
                    name:'Naver',
                    type:'bar',
                    smooth:true,
                    data:[2310, 4301, 3461, 6053, 4031, 5941, 7631],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }     
                }
            ]
        },

        1 :  { //Audience Overview
            color: [App.scheme_colors[0], App.scheme_colors[2]],
            grid: { 
                x: 45,
                y: 32,
                x2: 58,
                y2: 26
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: App.scheme_colors[0],
                        width: 2,
                        type: 'solid'
                    }
                }
            },
            legend: {
                data:['Page Views', 'Visitors']
            },
            toolbox: {
                show : true,
                orient: 'vertical',
                backgroundColor: 'rgba(0,0,0,0)', // Toolbox background color
                borderColor: '#eee',       // Toolbox border color
                borderWidth:.5,            // Toolbox border lineweight, in px, defaults to 0 (no border)
                padding: 10,   
                feature : {
                    mark : {
                        show: true,
                         title : {
                            mark : 'Mark',
                            markUndo : 'Undo',
                            markClear : 'Clear'
                        }
                    },
                    dataZoom : {
                        show : true,
                        title : {
                            dataZoom : 'Area Zoom',
                            dataZoomReset : 'Area Zoom - Back'
                        }
                    },
                    dataView : {
                        show: true, 
                        title : 'Data View',
                        readOnly: false,
                        lang : ['The data view', 'Close', 'Refresh'],
                    },
                    magicType : {
                        show: true, 
                        title : {
                            line : 'Dynamic Type Switching - Line chart',
                            bar : 'Dynamic Type Switching - Column Chart',
                            stack : 'Dynamic Type Switching - Stacking',
                            tiled : 'Dynamic Type Toggle - Tile'
                        },
                        type: ['stack', 'tiled']
                    },
                    restore : {
                        show: true,
                        title: 'Refresh',
                        color: ''
                    },
                    saveAsImage : {
                        show: true,
                        title: 'Save as picture',
                        type : 'jpeg',
                        lang : ['Click Save locally']
                    }
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['January','February','March','April','May','June','July', 'August', 'September', 'November', 'December'],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: App.scheme_colors[0],
                            width: 2,
                            type: 'solid'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: App.scheme_colors[0],
                            width: 2,
                            type: 'solid'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'Page Views',
                    type:'line',
                    data:[0, 20312, 12021, 23831, 32431, 17801, 28093, 20541, 10216, 9810, 23011]   
                },
                {
                    name:'Visitors',
                    type:'line',
                    data:[20, 25981, 15091, 30121, 12051, 18901, 30121, 23164, 13012, 20121, 29081]   
                }
            ]
        },

        2 :  { //Summary
            color: App.scheme_colors,
            grid: { 
                x: 45,
                y: 32,
                x2: 58,
                y2: 26
            },
            title : {
                text: '',
                subtext: '',
                textStyle: {
                    color: App.scheme_colors[0]
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: App.scheme_colors[0],
                        width: 2,
                        type: 'solid'
                    }
                }
            },
            legend: {
                data:['Members', 'Sales', 'Earnings']
            },
            toolbox: {
                show : true,
                orient: 'vertical',
                backgroundColor: 'rgba(0,0,0,0)', // Toolbox background color
                borderColor: '#eee',       // Toolbox border color
                borderWidth:.5,            // Toolbox border lineweight, in px, defaults to 0 (no border)
                padding: 10,   
                feature : {
                    mark : {
                        show: true,
                         title : {
                            mark : 'Mark',
                            markUndo : 'Undo',
                            markClear : 'Clear'
                        }
                    },
                    dataZoom : {
                        show : true,
                        title : {
                            dataZoom : 'Area Zoom',
                            dataZoomReset : 'Area Zoom - Back'
                        }
                    },
                    dataView : {
                        show: true, 
                        title : 'Data View',
                        readOnly: false,
                        lang : ['The data view', 'Close', 'Refresh'],
                    },
                    magicType : {
                        show: true, 
                        title : {
                            line : 'Dynamic Type Switching - Line chart',
                            bar : 'Dynamic Type Switching - Column Chart',
                            stack : 'Dynamic Type Switching - Stacking',
                            tiled : 'Dynamic Type Toggle - Tile'
                        },
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore : {
                        show: true,
                        title: 'Refresh',
                        color: ''
                    },
                    saveAsImage : {
                        show: true,
                        title: 'Save as picture',
                        type : 'jpeg',
                        lang : ['Click Save locally']
                    }
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: App.scheme_colors[0],
                            width: 2,
                            type: 'solid'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: App.scheme_colors[0],
                            width: 2,
                            type: 'solid'
                        }
                    }
                }
            ],
           
            series : [
                {
                    name:'Members',
                    type:'bar',
                    stack: 'total',
                    smooth:false,
                    data:[23021, 16092, 35423, 18291, 32431, 17801, 28093],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }                
                },
                {
                    name:'Sales',
                    type:'bar',
                    stack: 'total',
                    smooth:false,
                    data:[12091, 32001, 13095, 15420, 31021, 15402, 26093],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }   
                },
                {
                    name:'Earnings',
                    type:'bar',
                    stack: 'total',
                    smooth:false,
                    data:[25021, 18201, 10271, 8012, 18721, 30121, 30121],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 0,
                            areaStyle: {
                                type: 'default'
                            }
                        },
                        emphasis: {
                            barBorderRadius: 0
                        }
                    }   
                }
            ]
        },
        3 :  {
            grid: { 
                x: 45,
                y: 32,
                x2: 58,
                y2: 26
            },
            timeline : {
                autoPlay: true,
                backgroundColor: '#fff',
                data : [
                    '2016-01-01', '2016-02-01', '2016-03-01', '2016-04-01', '2016-05-01',
                    { name:'2013-06-01', symbol:'emptyStar6', symbolSize:8 },
                    '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01', '2016-11-01',
                    { name:'2016-12-01', symbol:'star6', symbolSize:8 }
                ],
                label : {
                    formatter : function(s) {
                        return s.slice(0, 7);
                    }
                },
                lineStyle: {
                    color: App.scheme_colors[0],
                    width: 1,
                    type: 'dashed',
                    textStyle: {
                        color: App.scheme_colors[0]
                    }
                },
                controlStyle: {
                    itemSize: 15,
                    itemGap: 5,
                    normal : {
                        color : App.scheme_colors[0]
                    },
                    emphasis : {
                        color : App.scheme_colors[0]
                    }
                }          
            },
            options : [
                {
                    color: App.scheme_colors,
                    title : {
                        text: '',
                        subtext: '',
                        textStyle: {
                            color: App.scheme_colors[0]
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        data:['Wordpress','HTML','Marketing','CMS','eCommerce']
                    },
                    toolbox: {
                        show : true,
                        orient: 'vertical',
                        backgroundColor: 'rgba(0,0,0,0)', // Toolbox background color
                        borderColor: '#eee',       // Toolbox border color
                        borderWidth:.5,            // Toolbox border lineweight, in px, defaults to 0 (no border)
                        padding: 10,   
                        feature : {
                            mark : {
                                show: true,
                                 title : {
                                    mark : 'Mark',
                                    markUndo : 'Undo',
                                    markClear : 'Clear'
                                }
                            },
                            dataView : {
                                show: true, 
                                title : 'Data View',
                                readOnly: false,
                                lang : ['The data view', 'Close', 'Refresh'],
                            },
                            magicType : {
                                show: true, 
                                type: ['pie', 'funnel'],
                                title : {
                                    pie : 'Dynamic Type Switching - Pie chart',
                                    funnel : 'Dynamic Type Switching - Funnel Chart'
                                },
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1700
                                    }
                                }
                            },
                            restore : {
                                show: true,
                                title: 'Refresh',
                                color: ''
                            },
                            saveAsImage : {
                                show: true,
                                title: 'Save as picture',
                                type : 'jpeg',
                                lang : ['Click Save locally']
                            }
                        }
                    },
                    series : [
                        {
                            name:'Browser (data is fictitious)',
                            type:'pie',
                            center: ['50%', '45%'],
                            radius: '50%',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Browser (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Browser (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Browser (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Browser (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Browser (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Category (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Category (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Category (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Category (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Category (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                },
                {
                    series : [
                        {
                            name:'Category (data is fictitious)',
                            type:'pie',
                            data:[
                                {value: pie7_idx * 128 + 80,  name:'Wordpress'},
                                {value: pie7_idx * 64  + 160,  name:'HTML'},
                                {value: pie7_idx * 32  + 320,  name:'Marketing'},
                                {value: pie7_idx * 16  + 640,  name:'CMS'},
                                {value: pie7_idx++ * 8  + 1280, name:'eCommerce'}
                            ]
                        }
                    ]
                }
            ]
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
                for (var i = 0, l = domMain.length; i < l; i++) {
                    // Initialize charts
                    myChart[i] = ec.init(domMain[i], theme);
                    // Set charts options
                    myChart[i].setOption(option[i]);
                }
            }, delay);
            
            $(window).resize(function(){
                resizeECharts(myChart);
            });

        }
    );


    $(".toggle-sidebar").on("click", function(){
        setTimeout(function(){
            resizeECharts(myChart);
        }, 1200);
    });
}


function resizeECharts(myChart) {
    if($("[data-md='main']").length) {
        setTimeout(function(){
            for (var i = 0, l = myChart.length; i < l; i++) {
                myChart[i].resize && myChart[i].resize();
            }
        }, 300);
    }
}