import * as echarts from 'echarts/core';
import { TaskModel } from '../models/task-data.model';
import { DateManipulator } from './date-manipulator';
import { TaskDataManipulator } from './task-data-manipulator';

export class GanttRenderers {
    private HEIGHT_RATIO:number
    private DATE_FORMAT:string
    private _darkTheme:boolean
    private _enableGroup:boolean
    private _taskData:TaskModel[]
    private _mappedData:any[]
    private taskDataManipulator:TaskDataManipulator
    private _translation:any

    //normal|dark
    private arrowColors:string[] = ["#000", "#fff"]
    private zebraColor:any[] = [["#f2f2f2","#e6e6e6"],["#212529","#2C3034"]]

    constructor(taskData:TaskModel[], mappedData:any[], colours:string[], dateFormat:string, heightRatio :number, translation: any,enableGroup:boolean = true,darkTheme:boolean = false){
        this._taskData = taskData
        this._mappedData = mappedData
        this.taskDataManipulator = new TaskDataManipulator(colours, enableGroup)
        this.DATE_FORMAT = dateFormat
        this.HEIGHT_RATIO = heightRatio
        this._darkTheme = darkTheme
        this._enableGroup = enableGroup
        this._translation = translation
    }

    renderGanttItem(params:any, api:any) {
        var index = api.value(0);
        var taskName = api.value(1);
        
        var timeStart = api.coord([api.value(2), index]);
        var timeEnd = api.coord([api.value(3), index]);
        var taskId = api.value(4);
        var donePercentage = api.value(5)
        var groupColor = api.value(10)
        
        var barLength = timeEnd[0] - timeStart[0];
        // Get the heigth corresponds to length 1 on y axis.
        var barHeight = api.size([0, 1])[1] * this.HEIGHT_RATIO;
        var x = timeStart[0] ;
        var y = (timeStart[1] - barHeight)-(barHeight/3);
        
        var taskNameWidth = echarts.format.getTextRect(taskName).width;
        var text = (barLength > taskNameWidth + 40 && x + barLength >= 180)
            ? taskName : '';
    
        var rectNormal = this.clipRectByRect(params, {
            x: x, y: y, width: (barLength), height: barHeight
        });
        var rectText = this.clipRectByRect(params, {
            x: x, y: y, width: (barLength), height: barHeight
        });
        var rectPercent = this.clipRectByRect(params, {
            x: x, y: y, width: (barLength)*donePercentage/100, height: 3
        });
    
        return {
            type: 'group',
            children: [{
                type: 'rect',
                ignore: !rectNormal,
                shape: rectNormal,
                style: api.style({
                    fill: groupColor
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

    renderAxisLabelItem(params:any, api:any) {
    
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
        var daysToEnd = DateManipulator.daysLeft(end,this._translation)
        var y = api.coord([0, index])[1];
        var barHeight = api.size([0, 1])[1];
        
        let groupedElement = {
            type: 'group',
            silent: true,
            position: [
                10,
                y
            ],
            children: [{
                type: 'rect',
                shape: {x: 0, y: (params.coordSys.y-2*barHeight)+(barHeight/6), width: 210, height: 46},
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
                    y: (params.coordSys.y-2*barHeight)+(barHeight/3),
                    width: 25,
                    height: 25
                }
            }, {
                type: 'text',
                style: {
                    x: 35,
                    y: (params.coordSys.y-2*barHeight)+(barHeight*0.5),
                    text: taskName,
                    textVerticalAlign: 'bottom',
                    textAlign: 'left',
                    textFill: '#000'
                }
            }, {
                type: 'text',
                style: {
                    x: 35,
                    y: (params.coordSys.y-2*barHeight)+(barHeight*0.7),
                    textVerticalAlign: 'bottom',
                    textAlign: 'left',
                    text: daysToEnd,
                    textFill: '#000',
                    fontSize: 9,
                }
            }]
        };
        
        if(this._enableGroup){
            if(isToDrawGroup == 1){ // group agrupator (Vertical rectangle)
                groupedElement.children.push({
                    type: 'rect',
                    shape: {x: 105, y: (params.coordSys.y-2*barHeight)-(barHeight/3), width: 10, height: 46},
                    style: {
                        fill: groupColor,
                    }
                })
            }else{
                groupedElement.children.push({
                    type: 'text',
                    style: {
                        x: -10,
                        y: (params.coordSys.y-2*barHeight)+(barHeight/9),
                        text: groupName,
                        textVerticalAlign: 'bottom',
                        textAlign: 'left',
                        textFill: this._darkTheme ? '#fff' : '#000'
                    }
                })
            }
        }
        
        return groupedElement
    }

    renderArrowsItem(params:any, api:any) {                                                                                                                                                                
        var index = api.value(0);
        var taskName = api.value(1);
        var timeStart = api.coord([api.value(2), index]);
        var timeEnd = api.coord([api.value(3), index]);
        var taskId = api.value(4);
        
        var barLength = timeEnd[0] - timeStart[0];
        // Get the heigth corresponds to length 1 on y axis.
        var barHeight = api.size([0, 1])[1] * this.HEIGHT_RATIO;
        var x = timeStart[0];
        var y = (timeStart[1] - barHeight)-(barHeight/3);
        
        //the api.value only suports numeric and string values to get... to get taskDependencies I need to get from my real data variable
        var currentData = this._taskData[params.dataIndex]
        var taskDependencies = currentData.taskDependencies
        
        let links = []
        let dependencies = taskDependencies
        for(let j = 0; j < dependencies.length; j++){
            let taskFather = this.taskDataManipulator.getTaskByIdInMappedData(this._mappedData, dependencies[j])
            if(taskFather == null)
                continue
            //console.log("dependencies", taskName, taskFather)
            var indexFather = taskFather[0]; //index
            var timeStartFather = api.coord([taskFather[2], indexFather]);
            var timeEndFather = api.coord([taskFather[3], indexFather]);
            
            var barLengthFather = timeEndFather[0] - timeStartFather[0];
            // Get the heigth corresponds to length 1 on y axis.
            var barHeightFather = api.size([0, 1])[1] * this.HEIGHT_RATIO;
            var xFather = timeStartFather[0];
            var yFather = (timeStartFather[1] - barHeightFather)-(barHeightFather/3);
            
            let color = this._darkTheme ? this.arrowColors[1] : this.arrowColors[0]

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
                            fill: color,
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
                            fill: color,
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
                        fill: color,
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
                        fill: color,
                        stroke: color
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
                        fill: color,
                        stroke: color
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
    
    renderArrowsItem2(params:any, api:any) {
        var index = api.value(0);
        var taskName = api.value(1);
        var timeStart = api.coord([api.value(2), index]);
        var timeEnd = api.coord([api.value(3), index]);
        var taskId = api.value(4);
        
        var barLength = timeEnd[0] - timeStart[0];
        // Get the heigth corresponds to length 1 on y axis.
        var barHeight = api.size([0, 1])[1] * this.HEIGHT_RATIO;
        var x = timeStart[0];
        var y = timeStart[1] - barHeight;
        
        //the api.value only suports numeric and string values to get... to get taskDependencies I need to get from my real data variable
        var currentData = this._taskData[params.dataIndex]
        var taskDependencies = currentData.taskDependencies
        
        let links = []
        let dependencies = taskDependencies
        for(let j = 0; j < dependencies.length; j++){
            let taskFather = this.taskDataManipulator.getTaskByIdInMappedData(this._mappedData, dependencies[j])
            if(taskFather == null)
                continue
            //console.log("dependencies", taskName, taskFather)
            var indexFather = taskFather[0]; //index
            var timeStartFather = api.coord([taskFather[2], indexFather]);
            var timeEndFather = api.coord([taskFather[3], indexFather]);
            
            var barLengthFather = timeEndFather[0] - timeStartFather[0];
            // Get the heigth corresponds to length 1 on y axis.
            var barHeightFather = api.size([0, 1])[1] * this.HEIGHT_RATIO;
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

    renderZebra(params:any, api:any){
        var index = api.value(0);
        var timeToday = api.coord([new Date(), index]);
        var timeStart = api.coord([api.value(1), index]);
        var timeEnd = api.coord([api.value(2), index]);
    
        //if time start > timeToday we need to fix the bar lenght and x position
        var barLength = timeEnd[0] - (timeStart[0] > timeToday[0] ? timeToday[0] : timeStart[0]);
        // Get the heigth corresponds to length 1 on y axis.
        var barHeight = api.size([0, 1])[1];
        var x = timeStart[0] > timeToday[0] ? timeToday[0] : timeStart[0] ;
        var y = timeStart[1] - barHeight;
    
        //console.log("=======>",x, y)
        
        var rectNormal = this.clipRectByRect(params, {
            x: x, y: y, width: barLength, height: barHeight
        });
    
        return {
            type: 'group',
            silent: true,
            children: [{
                type: 'rect',
                ignore: !rectNormal,
                shape: rectNormal,
                style: api.style({
                    fill: this._darkTheme ? (index%2 == 0 ? this.zebraColor[1][0] : this.zebraColor[1][1]) : (index%2 == 0 ? this.zebraColor[0][0] : this.zebraColor[0][1])
                })
            }]
        };
    }
    
    renderToday(params:any, api:any){
        var today = api.coord([api.value(0), 0]);
        var barHeight = api.size([0, 1])[1];
        var x = today[0];
        var y = barHeight;
        var y_end = barHeight*1000;
        
        let todayText = echarts.time.format(
            (new Date()),
            this.DATE_FORMAT,
            false
        );
        var todayTextWidth = echarts.format.getTextRect(todayText).width;
    
        return {
            type: 'group',
            silent: true,
            children: [{
                type: 'text',
                style: {
                    x: x-todayTextWidth/2,
                    y: y,
                    text: todayText,
                    textVerticalAlign: 'bottom',
                    textAlign: 'left',
                    textFill: '#a14b27'
                }
            },{
                type: 'line',
                shape: {
                    x1: x,
                    y1: y,
                    x2: x,
                    y2: y_end
                },
                style: api.style({
                    fill: "#a14b27",
                    stroke: "#a14b27"
                })
            }]
        };
    }
    
    clipRectByRect(params:any, rect:any) {
        return echarts.graphic.clipRectByRect(rect, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        });
    }
}








