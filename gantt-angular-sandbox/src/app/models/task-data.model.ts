export class TaskModel {
    taskName!: string; 
    taskId!: number|string;
    groupName!: string;
    groupOrder!: number;
    start!: Date;
    end!: Date;
    owner!: string;
    
    /**
     * integer beween 0 and 100 (inclusive)
     */
    donePercentage!:number;

    /** 
     * url to image
     */
    image!: string;

    /**
     * Array of taskId dependency
     */
    taskDependencies!: number[] | string[]
}