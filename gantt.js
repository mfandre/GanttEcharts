var HEIGHT_RATIO = 0.6;

var now = new Date()
var now1_1 = (new Date()).setDate(now.getDate() + 3);
var now1_2 = (new Date()).setDate(now.getDate() + 20);

var now2_1 = (new Date()).setDate(now.getDate() + 25);
var now2_2 = (new Date()).setDate(now.getDate() + 33);

var now3_1 = (new Date()).setDate(now.getDate() - 30);
var now3_2 = (new Date()).setDate(now.getDate() - 12);

var now4_1 = (new Date()).setDate(now.getDate() + 33);
var now4_2 = (new Date()).setDate(now.getDate() + 40);

var _taskData = [
    {
        taskName: "tarefa 1",
        taskId: 1,
        taskDependencies: [],
        start: now1_1,
        end: now1_2
    },{
        taskName: "tarefa 5",
        taskId: 5,
        taskDependencies: [3],
        start: now1_1,
        end: now1_2
    },
    {
        taskName: "tarefa 2",
        taskId: 2,
        taskDependencies: [1],
        start: now2_1,
        end: now2_2
    },
   {
        taskName: "tarefa 3",
        taskId: 3,
        taskDependencies: [],
        start: now3_1,
        end: now3_2
    },
    {
        taskName: "tarefa 4",
        taskId: 4,
        taskDependencies: [2,3],
        start: now4_1,
        end: now4_2
    },{
        taskName: "tarefa 6",
        taskId: 6,
        taskDependencies: [1,3,5],
        start: now2_1,
        end: now2_2
    }
];

var _mappedData = mapData(_taskData)

var _taskDataDimensions = ['taskName', 'start', 'end', 'taskId', 'index'];

option = {
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                //removing tooltipo from the lines
                if(info != undefined && info.seriesIndex >= 2){
                    return;
                }
                //console.log("info", info)
                var value = info.value;

                var taskName = value[0];
                var start = (new Date(value[1])).toLocaleDateString("pt-BR");
                var end = (new Date(value[2])).toLocaleDateString("pt-BR");

                return [
                    '<div class="tooltip-title">' + echarts.format.encodeHTML(taskName) + '</div>',
                    ' &nbsp;&nbsp;' + start + ' - ',
                    end + '<br>'
                ].join('');
            }
        },
        animation: false,
        toolbox: {
            left: 20,
            top: 0,
            itemSize: 20,
            feature: {
                myDrag: {
                    show: true,
                    title: 'Edit',
                    icon: 'path://M990.55 380.08 q11.69 0 19.88 8.19 q7.02 7.01 7.02 18.71 l0 480.65 q-1.17 43.27 -29.83 71.93 q-28.65 28.65 -71.92 29.82 l-813.96 0 q-43.27 -1.17 -72.5 -30.41 q-28.07 -28.07 -29.24 -71.34 l0 -785.89 q1.17 -43.27 29.24 -72.5 q29.23 -29.24 72.5 -29.24 l522.76 0 q11.7 0 18.71 7.02 q8.19 8.18 8.19 18.71 q0 11.69 -7.6 19.29 q-7.6 7.61 -19.3 7.61 l-518.08 0 q-22.22 1.17 -37.42 16.37 q-15.2 15.2 -15.2 37.42 l0 775.37 q0 23.39 15.2 38.59 q15.2 15.2 37.42 15.2 l804.6 0 q22.22 0 37.43 -15.2 q15.2 -15.2 16.37 -38.59 l0 -474.81 q0 -11.7 7.02 -18.71 q8.18 -8.19 18.71 -8.19 l0 0 ZM493.52 723.91 l-170.74 -170.75 l509.89 -509.89 q23.39 -23.39 56.13 -21.05 q32.75 1.17 59.65 26.9 l47.94 47.95 q25.73 26.89 27.49 59.64 q1.75 32.75 -21.64 57.3 l-508.72 509.9 l0 0 ZM870.09 80.69 l-56.13 56.14 l94.72 95.9 l56.14 -57.31 q8.19 -9.35 8.19 -21.05 q-1.17 -12.86 -10.53 -22.22 l-47.95 -49.12 q-10.52 -9.35 -23.39 -9.35 q-11.69 -1.17 -21.05 7.01 l0 0 ZM867.75 272.49 l-93.56 -95.9 l-380.08 380.08 l94.73 94.73 l378.91 -378.91 l0 0 ZM322.78 553.16 l38.59 39.77 l-33.92 125.13 l125.14 -33.92 l38.59 38.6 l-191.79 52.62 q-5.85 1.17 -12.28 0 q-6.44 -1.17 -11.11 -5.84 q-4.68 -4.68 -5.85 -11.7 q-2.34 -5.85 0 -11.69 l52.63 -192.97 l0 0 Z',
                    onclick: function(){ alert("to do...") }
                }
            }
        },
        title: {
            text: 'Gantt by André',
            left: 'center'
        },
        dataZoom: [{
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'weakFilter',
            height: 20,
            bottom: 0,
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            showDetail: false
        }, {
            type: 'inside',
            id: 'insideX',
            xAxisIndex: 0,
            filterMode: 'weakFilter',
            start: 0,
           end: 100,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true
        }, {
            type: 'slider',
            yAxisIndex: 0,
            zoomLock: true,
            width: 10,
            right: 10,
            top: 70,
           bottom: 20,
            start: 0,
            end: 100,
            handleSize: 0,
            showDetail: false,
        }, {
            type: 'inside',
            id: 'insideY',
            yAxisIndex: 0,
            start: 0,
            end: 100,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true
        }],
        grid: {
            show: true,
            top: 70,
            bottom: 20,
            left: 220,
            right: 20,
            backgroundColor: '#fff',
            borderWidth: 0
        },
        xAxis: {
            type: 'time',
            position: 'top',
            splitLine: {
                lineStyle: {
                    color: ['#E9EDFF']
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                lineStyle: {
                    color: '#929ABA'
                }
            },
            axisLabel: {
                color: '#929ABA',
                inside: false,
                align: 'center'
            }
        },
        yAxis: {
            axisTick: {show: false},
            splitLine: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false},
            min: 0,
            max: _taskData.length
        },
        series: [{
            id: 'taskData',
            type: 'custom',
            renderItem: renderGanttItem,
            dimensions: _taskDataDimensions,
            encode: {
                x: [1, 2],
                y: 3,//reference of taskid
                tooltip: [0, 1, 2]
            },
            data: _mappedData //Im changing the item object to array... this is why the encode is filled with indexed
        }, {
            type: 'custom',
            renderItem: renderAxisLabelItem,
            dimensions: _taskDataDimensions,
            encode: {
                x: -1, // Then this series will not controlled by x.
                y: 3, //reference of taskid
                tooltip: [0, 1, 2]
            },
            data: _mappedData //Im changing the item object to array... this is why the encode is filled with indexed
        },{
            type: 'custom',
            clip: true,
            itemStyle: {
                borderType: 'dashed'
            },
            renderItem: renderArrowsItem,
            dimensions: _taskDataDimensions,
            tooltip: null,
            encode: {
                x: -1, // Then this series will not controlled by x.
                y: 3, //reference of taskid
            },
            data: _mappedData //Im changing the item object to array... this is why the encode is filled with indexed
        }/*,{
            type: 'custom',
            renderItem: renderBackgroundLeft,
            data: _mappedData
        }*/]
    };
    
function renderGanttItem(params, api) {
    var index = api.value(4);
    var timeStart = api.coord([api.value(1), index]);
    var timeEnd = api.coord([api.value(2), index]);
    var taskName = api.value(0);
    var taskId = api.value(3);
    
    var coordSys = params.coordSys;

    var barLength = timeEnd[0] - timeStart[0];
    // Get the heigth corresponds to length 1 on y axis.
    var barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;
    var x = timeStart[0];
    var y = timeStart[1] - barHeight;
    
    var taskNameWidth = echarts.format.getTextRect(taskName).width;
    var text = (barLength > taskNameWidth + 40 && x + barLength >= 180)
        ? taskName : '';

    var rectNormal = clipRectByRect(params, {
        x: x, y: y, width: barLength, height: barHeight
    });
    var rectText = clipRectByRect(params, {
        x: x, y: y, width: barLength, height: barHeight
    });

    return {
        type: 'group',
        children: [{
            type: 'rect',
            ignore: !rectNormal,
            shape: rectNormal,
            style: api.style()
        }, {
            type: 'rect',
            ignore: !rectText,
            shape: rectText,
            style: api.style({
                fill: 'transparent',
                stroke: 'transparent',
                text: text,
                textFill: '#fff'
            })
        }]
    };
}

function renderAxisLabelItem(params, api) {
    
    //console.log("renderAxisLabelItem", api.value(0), api.value(1), api);
    //console.log("api.coord([0, api.value(0)])", api.coord([0, api.value(0)]))
    var index = api.value(4)
    var taskName = api.value(0)
    var taskId = api.value(3)
    var start = api.value(1)
    var end = api.value(2)
    
    var totalLeft = datediff(start, end)
    var daysToEnd = daysLeft(end)
    var y = api.coord([0, index])[1];
    
    if (y < params.coordSys.y + 5) {
        return;
    }
    return {
        type: 'group',
        position: [
            10,
            y
        ],
        children: [{
            type: 'path',
            shape: {
                d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
                x: 0,
                y: -20,
                width: 210,
                height: 20,
                layout: 'cover'
            },
            style: {
                fill: '#368c6c'
            }
        }, {
            type: 'text',
            style: {
                x: 24,
                y: -3,
                text: taskName,
                textVerticalAlign: 'bottom',
                textAlign: 'center',
                textFill: '#fff'
            }
        }, {
            type: 'text',
            style: {
                x: 207,
                y: -2,
                textVerticalAlign: 'bottom',
                textAlign: 'right',
                text: daysToEnd,
                textFill: '#000',
                fontSize: 9,
            }
        }]
    };
}

function clipRectByRect(params, rect) {
    return echarts.graphic.clipRectByRect(rect, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
    });
}

function renderArrowsItem(params, api) {
    var index = api.value(4);
    var timeStart = api.coord([api.value(1), index]);
    var timeEnd = api.coord([api.value(2), index]);
    var taskName = api.value(0);
    var taskId = api.value(3);
    
    var barLength = timeEnd[0] - timeStart[0];
    // Get the heigth corresponds to length 1 on y axis.
    var barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;
    var x = timeStart[0];
    var y = timeStart[1] - barHeight;
    
    //the api.value only suports numeric and string values to get... to get taskDependencies I need to get from my real data variable
    var currentData = _taskData[params.dataIndex]
    var taskDependencies = currentData.taskDependencies
    
    let links = []
    let dependencies = taskDependencies
    for(let j = 0; j < dependencies.length; j++){
        taskFather = getTaskByIdInMappedData(_mappedData, dependencies[j])
        //console.log("dependencies", taskName, taskFather)
        var indexFather = taskFather[4]; //index
        var timeStartFather = api.coord([taskFather[3], indexFather]);
        var timeEndFather = api.coord([taskFather[2], indexFather]);
        
        var barLengthFather = timeEndFather[0] - timeStartFather[0];
        // Get the heigth corresponds to length 1 on y axis.
        var barHeightFather = api.size([0, 1])[1] * HEIGHT_RATIO;
        var xFather = timeStartFather[0];
        var yFather = timeStartFather[1] - barHeightFather;
        
        
        links.push({
            type: 'group',
            children: [{
                type: 'line',
                shape: {
                    x1: xFather + barLengthFather,
                    y1: yFather + barHeightFather/2,
                    x2: x,
                    y2: y + barHeight/2
                },
                style: api.style({
                    fill: "#000",
                    stroke: "#000"
                })
            },{
                type: 'polygon',
                shape: {
                    points: [[x-5,(y + barHeight/2)-5],[x-5,(y + barHeight/2) + 10],[x+5,(y + barHeight/2)], ]
                },
                style: api.style({
                    fill: "#000",
                    stroke: "#000"
                })
            }]
        })
    }

    return {
        type: 'group',
        children: links
    };
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

function daysLeft(baseDate){
    //get days left based on today
    var left = datediff(baseDate, new Date())
    if(left < 0){
        return (-left) + " dias até o fim";
    }else{
        return left + " dias atrasado" ;
    }
}

function mapData(taskData){
    //Im changing the item object to array... this is why the encode is filled with indexed
    return echarts.util.map(_taskData, function (item, index) {
        let index_attributes = [item.taskName, item.start, item.end, item.taskId, index];
        return index_attributes;
    })
}

function getTaskById(taskData, id){
    for(let i = 0; i < taskData.length; i++){
        if(taskData[i].taskId == id){
            return taskData[i];
        }
    }
    
    return null;
}

function getTaskByIdInMappedData(mappedData, id){
    for(let i = 0; i < mappedData.length; i++){
        if(mappedData[i][3] == id){
            return mappedData[i];
        }
    }
    
    return null;
}

myChart.setOption(option);
