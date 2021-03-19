import { TaskModel } from "../models/task-data.model";

export class TaskDataManipulator {
    COLOURS:string[]

    constructor(colours:string[]){
        this.COLOURS = colours
    }

    mapData(taskData:TaskModel[]): any[]{
        //Im changing the item object to array... this is why the encode is filled with indexed
        var _groupData = this.mapGroups(taskData)
        
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
    
    mapZebra(taskData:TaskModel[]): any[]{   
        var mappedData = []
        
        for(let index = 0; index < taskData.length; index++){    
            let item = taskData[index]
            let index_attributes = [index, this.getMinDate(taskData), this.getMaxDate(taskData), item.taskId];
            mappedData.push(index_attributes);
        }
        return mappedData
    }
    
    getMinDate(taskData:TaskModel[]):Date{
        let minDate = new Date(8640000000000000)
        for(let index = 0; index < taskData.length; index++){
            let item = taskData[index]
            if(item.start < minDate){
                minDate = item.start
            }
        }
    
        return new Date(minDate)
    }
    
    getMaxDate(taskData:TaskModel[]):Date{
        let maxDate = new Date(-8640000000000000)
        for(let index = 0; index < taskData.length; index++){
            let item = taskData[index]
            if(item.end > maxDate){
                maxDate = item.end
            }
        }
    
        return new Date(maxDate)
    }
    
    mapGroups(taskData:TaskModel[]):any{
        /**
         * return a hash 
         * { 
         *  "groupName1" => { color: "#222", tasks: [taskId1, taskId2, ..., taskIdN]} 
         *  "groupName2" => { color: "#222", tasks: [taskId1, taskId2, ..., taskIdN]} 
         * }
         */
        let countColor = 0
        let mappedGroups:any = {}
        //Im creating a map of groups => taskId
        for(let i = 0; i < taskData.length; i++){
            if(mappedGroups[taskData[i].groupName] == undefined){
                mappedGroups[taskData[i].groupName] = {}
                mappedGroups[taskData[i].groupName].color = this.getColorHex(countColor)//this.getRandomHexColor()
                mappedGroups[taskData[i].groupName].tasks = [taskData[i].taskId]
                countColor = countColor + 1
            }else
                mappedGroups[taskData[i].groupName].tasks.push(taskData[i].taskId)
        }    
        
        return mappedGroups
    }
    
    compareTasks(a:TaskModel, b:TaskModel):number {
        let dateComp = 0
        if (a.start > b.start) dateComp = -1;
        if (b.start > a.start) dateComp = 1;
        
        let groupOrderComp = 0
        if (a.groupOrder > b.groupOrder) groupOrderComp = -1;
        if (b.groupOrder > a.groupOrder) groupOrderComp = 1;

        let taskNameComp = 0
        if (a.taskName > b.taskName) taskNameComp = -1;
        if (b.taskName > a.taskName) taskNameComp = 1;
        
        return groupOrderComp || taskNameComp || dateComp;
    }
    
    getTaskById(taskData:TaskModel[], id:any):TaskModel|null{
        for(let i = 0; i < taskData.length; i++){
            if(taskData[i].taskId == id){
                return taskData[i];
            }
        }
        
        return null;
    }
    
    getTaskByIdInMappedData(mappedData:any, id:any):any[]|null{
        for(let i = 0; i < mappedData.length; i++){
            if(mappedData[i][4] == id){
                return mappedData[i];
            }
        }
        
        return null;
    }
    
    randomInt(min:number, max:number):number {
        return min + Math.floor((max - min) * Math.random());
    }
    
    getRandomHexColor(): string{
        //var randomColor = Math.floor(Math.random()*16777215).toString(16);
        //return "#" + randomColor;
    
        return this.COLOURS[this.randomInt(0, this.COLOURS.length)]
    }

    getColorHex(index:number): string{
        if(index > this.COLOURS.length)
            index = 0
    
        return this.COLOURS[index]
    }
}

