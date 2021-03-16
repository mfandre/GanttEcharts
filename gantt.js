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

var now5_1 = (new Date()).setDate(now.getDate() + 43);
var now5_2 = (new Date()).setDate(now.getDate() + 70);

var now6_1 = (new Date()).setDate(now.getDate() + 68);
var now6_2 = (new Date()).setDate(now.getDate() + 75);

var _taskData = [
    {
        groupName: "Group 1",
        groupOrder: 1,
        taskName: "tarefa 1",
        taskId: 1,
        taskDependencies: [],
        start: now1_1,
        end: now1_2,
        donePercentage: 10,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar2_big@2x.png'
    },{
        groupName: "Group 3",
        groupOrder: 3,
        taskName: "tarefa 5",
        taskId: 5,
        taskDependencies: [1,3],
        start: now1_1,
        end: now1_2,
        donePercentage: 30,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
    },
    {
        groupName: "Group 2",
        groupOrder: 2,
        taskName: "tarefa 2",
        taskId: 2,
        taskDependencies: [1],
        start: now2_1,
        end: now2_2,
        donePercentage: 10,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar3_big@2x.png'
    },
   {
        groupName: "Group 3",
        groupOrder: 3,
        taskName: "tarefa 3",
        taskId: 3,
        taskDependencies: [],
        start: now3_1,
        end: now3_2,
        donePercentage: 80,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
    },
    {
        groupName: "Group 2",
        groupOrder: 2,
        taskName: "tarefa 4",
        taskId: 4,
        taskDependencies: [2,3],
        start: now4_1,
        end: now4_2,
        donePercentage: 60,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar4_big@2x.png'
    },{
        groupName: "Group 2",
        groupOrder: 2,
        taskName: "tarefa 6",
        taskId: 6,
        taskDependencies: [1,3,5],
        start: now2_1,
        end: now2_2,
        donePercentage: 100,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
    },{
        groupName: "Group 4",
        groupOrder: 4,
        taskName: "tarefa 7",
        taskId: 7,
        taskDependencies: [1],
        start: now5_1,
        end: now5_2,
        donePercentage: 100,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
    },{
        groupName: "Group 4",
        groupOrder: 4,
        taskName: "tarefa 8",
        taskId: 8,
        taskDependencies: [7],
        start: now5_1,
        end: now5_2,
        donePercentage: 80,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
    },{
        groupName: "Group 5",
        groupOrder: 5,
        taskName: "tarefa 9",
        taskId: 9,
        taskDependencies: [7,8],
        start: now6_1,
        end: now6_2,
        donePercentage: 30,
        ower: '',
        image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
    }
];

_taskData = _taskData.sort(compareTasks)

//after sort we mapp to maintain the order
var _mappedData = mapData(_taskData)

console.log(_mappedData)

var _taskDataDimensions = [
    {name: 'index', type: 'number'},
    {name: 'taskName', type: 'ordinal'},
    {name: 'start', type: 'time'},
    {name: 'end', type: 'time'},
    {name: 'taskId', type: 'number'},
    {name: 'donePercentage', type: 'number'},
    {name: 'owner', type: 'ordinal'},
    {name: 'image', type: 'ordinal'},
    {name: 'groupName', type: 'ordinal'},
    {name: 'isToDrawGroup', type: 'number'},
    {name: 'groupColor', type: 'ordinal'},
]

option = {
        tooltip: {
            trigger: 'item',
            formatter: function (info) {
                //removing tooltip from the lines
                if(info != undefined && info.seriesIndex >= 2){
                    return;
                }
                //console.log("info", info)
                var value = info.value;

                var taskName = value[1];
                var start = (new Date(value[2])).toLocaleDateString("pt-BR");
                var end = (new Date(value[3])).toLocaleDateString("pt-BR");
                var donePercentage = value[5]

                return [
                    '<div class="tooltip-title">' + echarts.format.encodeHTML(taskName) + '</div>',
                    start + ' - ',
                    end + '<br>', donePercentage + '% done'
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
            //handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //handleSize: '80%',
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
        }],
        grid: {
            show: true,
            top: 70,
            bottom: 20,
            left: 220,
            right: 20,
            //height: '1000px',
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
                y: 4, //reference of taskid
            },
            data: _mappedData //Im changing the item object to array... this is why the encode is filled with indexed
        },{
            id: 'taskData',
            type: 'custom',
            renderItem: renderGanttItem,
            dimensions: _taskDataDimensions,
            encode: {
                x: [1, 2, 3, 4],
                y: 4,//reference of taskid
                tooltip: [0, 1, 2]
            },
            data: _mappedData //Im changing the item object to array... this is why the encode is filled with indexed
        }, {
            type: 'custom',
            renderItem: renderAxisLabelItem,
            dimensions: _taskDataDimensions,
            encode: {
                x: -1, // Then this series will not controlled by x.
                y: 4, //reference of taskid
                tooltip: [0, 1, 2]
            },
            data: _mappedData //Im changing the item object to array... this is why the encode is filled with indexed
        }/*,{
            type: 'custom',
            renderItem: renderBackgroundLeft,
            data: _mappedData
        }*/]
    };
    
function renderGanttItem(params, api) {
    var index = api.value(0);
    var taskName = api.value(1);
    var timeStart = api.coord([api.value(2), index]);
    var timeEnd = api.coord([api.value(3), index]);
    var taskId = api.value(4);
    var donePercentage = api.value(5)
    
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
    var rectPercent = clipRectByRect(params, {
        x: x, y: y, width: barLength*donePercentage/100, height: 10
    });

    return {
        type: 'group',
        info: {bunda: 'bunda'},
        children: [{
            type: 'rect',
            ignore: !rectNormal,
            shape: rectNormal,
            style: api.style({
                fill: 'rgb(0, 48, 73)'
            })
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
        }, {
            type: 'rect',
            ignore: !rectPercent,
            shape: rectPercent,
            style: api.style({
                fill: 'rgba(214, 40, 40, 1)',
                stroke: 'transparent',
            })
        }]
    };
}

function renderAxisLabelItem(params, api) {
    
    //console.log("renderAxisLabelItem", api.value(0), api.value(1), api);
    //console.log("api.coord([0, api.value(0)])", api.coord([0, api.value(0)]))
    var index = api.value(0)
    var taskName = api.value(1)
    var taskId = api.value(4)
    var start = api.value(2)
    var end = api.value(3)
    var owner = api.value(6)
    var image = api.value(7)
    var groupName = api.value(8)
    var isToDrawGroup = api.value(9)
    var groupColor = api.value(10)
    
    //console.log(taskId, groupName, isToDrawGroup, groupColor)
    
    var totalLeft = datediff(start, end)
    var daysToEnd = daysLeft(end)
    var y = api.coord([0, index])[1];
    
    if (y < params.coordSys.y + 5) {
        return;
    }
    
    
    let groupedElement = {
        type: 'group',
        silent: true,
        position: [
            10,
            y
        ],
        children: [{
            type: 'rect',
            shape: {x: 0, y: -46, width: 210, height: 46},
            style: {
                fill: groupColor,
                //stroke: 'rgb(247, 127, 0)',
                //lineWidth: 2,
                //shadowBlur: 8,
                //shadowOffsetX: 3,
                //shadowOffsetY: 3,
                //shadowColor: 'rgba(0,0,0,0.3)'
            }
        },{ // Position the image at the bottom center of its container.
            type: 'image',
            //left: 'center', // Position at the center horizontally.
            //bottom: '10%',  // Position beyond the bottom boundary 10%.
            style: {
                image: image,
                x: 5,
                y: -35,
                width: 25,
                height: 25
            }
        }, {
            type: 'text',
            style: {
                x: 35,
                y: -20,
                text: taskName,
                textVerticalAlign: 'bottom',
                textAlign: 'left',
                textFill: '#000'
            }
        }, {
            type: 'text',
            style: {
                x: 35,
                y: -10,
                textVerticalAlign: 'bottom',
                textAlign: 'left',
                text: daysToEnd,
                textFill: '#000',
                fontSize: 9,
            }
        }]
    };
    
    if(isToDrawGroup == 1){
        groupedElement.children.push({
            type: 'rect',
            shape: {x: 0, y: -91, width: 10, height: 46},
            style: {
                fill: groupColor,
            }
        })
    }else{
        groupedElement.children.push({
            type: 'text',
            style: {
                x: -10,
                y: -46,
                text: groupName,
                textVerticalAlign: 'bottom',
                textAlign: 'left',
                textFill: '#000'
            }
        })
    }
    
    return groupedElement
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
    var index = api.value(0);
    var taskName = api.value(1);
    var timeStart = api.coord([api.value(2), index]);
    var timeEnd = api.coord([api.value(3), index]);
    var taskId = api.value(4);
    
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
        var indexFather = taskFather[0]; //index
        var timeStartFather = api.coord([taskFather[2], indexFather]);
        var timeEndFather = api.coord([taskFather[3], indexFather]);
        
        var barLengthFather = timeEndFather[0] - timeStartFather[0];
        // Get the heigth corresponds to length 1 on y axis.
        var barHeightFather = api.size([0, 1])[1] * HEIGHT_RATIO;
        var xFather = timeStartFather[0];
        var yFather = timeStartFather[1] - barHeightFather;
        
        let arrow = {}
        //condition to draw the arrow correctly when a dependent task is exactly below another task
        if (x < xFather + barLengthFather/2) {
            if(y > yFather){
                arrow = {
                    type: 'polygon',
                    shape: {
                        points: [[xFather + barLengthFather/2-5,(y)-10],[xFather + barLengthFather/2+5,(y) - 10],[xFather + barLengthFather/2,(y)] ]
                    },
                    style: api.style({
                        fill: "#000",
                        //stroke: "#000"
                    })
                }
            }else{
                arrow = {
                    type: 'polygon',
                    shape: {
                        points: [[xFather + barLengthFather/2-5,(y+barHeightFather+10)],[xFather + barLengthFather/2+5,(y+barHeightFather+10)],[xFather + barLengthFather/2,(y+barHeightFather)] ]
                    },
                    style: api.style({
                        fill: "#000",
                        //stroke: "#000"
                    })
                }
            }
        }else{
            //draw normaly
            arrow = {
                type: 'polygon',
                shape: {
                    points: [[x-5,(y + barHeight/2)-5],[x-5,(y + barHeight/2) + 5],[x+5,(y + barHeight/2)] ]
                },
                style: api.style({
                    fill: "#000",
                    //stroke: "#000"
                })
            }
        }
            
        let verticalLine = {
                type: 'line',
                shape: {
                    x1: xFather + barLengthFather/2,
                    y1: yFather + barHeightFather,
                    x2: xFather + barLengthFather/2,
                    y2: y + barHeightFather/2
                },
                style: api.style({
                    fill: "#000",
                    stroke: "#000"
                })
            }
            
        let horizontalLine = {
                type: 'line',
                shape: {
                    x1: xFather + barLengthFather/2,
                    y1: y + barHeightFather/2,
                    x2: x,
                    y2: y + barHeightFather/2
                },
                style: api.style({
                    fill: "#000",
                    stroke: "#000"
                })
            }
        
        links.push({
            type: 'group',
            children: [verticalLine,horizontalLine, arrow]
        })
    }

    return {
        type: 'group',
        children: links
    };
}

function renderArrowsItem2(params, api) {
    var index = api.value(0);
    var taskName = api.value(1);
    var timeStart = api.coord([api.value(2), index]);
    var timeEnd = api.coord([api.value(3), index]);
    var taskId = api.value(4);
    
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
        var indexFather = taskFather[0]; //index
        var timeStartFather = api.coord([taskFather[2], indexFather]);
        var timeEndFather = api.coord([taskFather[3], indexFather]);
        
        var barLengthFather = timeEndFather[0] - timeStartFather[0];
        // Get the heigth corresponds to length 1 on y axis.
        var barHeightFather = api.size([0, 1])[1] * HEIGHT_RATIO;
        var xFather = timeStartFather[0];
        var yFather = timeStartFather[1] - barHeightFather;
        
        
        links.push({
            type: 'group',
            children: [/*{
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
            },*/{
                type: 'line',
                shape: {
                    x1: xFather + barLengthFather,
                    y1: yFather + barHeightFather/2,
                    x2: x,
                    y2: yFather + barHeightFather/2
                },
                style: api.style({
                    fill: "#000",
                    stroke: "#000"
                })
            },{
                type: 'line',
                shape: {
                    x1: x,
                    y1: yFather + barHeightFather/2,
                    x2: x-10,
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
    var _groupData = mapGroups(_taskData)
    
    var mappedData = []
    
    for(let index = 0; index < taskData.length; index++){
        let item = taskData[index]
        
        //filling the group information
        // here I get the taskID gorupped by mapGroups functions and compare the position of taskid with the array present in the groupped. If the current taskid is in the end of array I dont need to draw the group
        let isToDrawGroup = 0
        let groupInfo = _groupData[item.groupName]
        if(groupInfo != undefined && groupInfo.tasks.length > 1){
            if(groupInfo.tasks.indexOf(item.taskId) < groupInfo.tasks.length-1)
                isToDrawGroup = 1
        }
        
        let index_attributes = [index, item.taskName, item.start, item.end, item.taskId, item.donePercentage, item.owner, item.image, item.groupName, isToDrawGroup, groupInfo.color];
        mappedData.push(index_attributes);
    }
    
    return mappedData
}

function mapGroups(taskData){
    let mappedGroups = {}
    //Im creating a map of groups => taskId
    for(let i = 0; i < _taskData.length; i++){
        if(mappedGroups[_taskData[i].groupName] == undefined){
            mappedGroups[_taskData[i].groupName] = {}
            mappedGroups[_taskData[i].groupName].color = getRandomHexColor()
            mappedGroups[_taskData[i].groupName].tasks = [_taskData[i].taskId]
        }else
            mappedGroups[_taskData[i].groupName].tasks.push(_taskData[i].taskId)
    }    
    
    return mappedGroups
}

function compareTasks(a, b) {
    let dateComp = 0
    if (a.start > b.start) dateComp = -1;
    if (b.start > a.start) dateComp = 1;
    
    let groupOrderComp = 0
    if (a.groupOrder > b.groupOrder) groupOrderComp = -1;
    if (b.groupOrder > a.groupOrder) groupOrderComp = 1;
    
    return groupOrderComp || dateComp;
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
        if(mappedData[i][4] == id){
            return mappedData[i];
        }
    }
    
    return null;
}

function getRandomHexColor(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

myChart.on('click', function (params) {
    alert("you clicked at "+ JSON.stringify(params.value) +" and we will change percentage to 100%")
    console.log("click",params.value)
    _mappedData[params.value[0]][5] = 100
    myChart.setOption(option);
});


myChart.setOption(option);

var chartHeight = _mappedData.length * 31 + 200;
$('#graph-container').css({'height': chartHeight});
