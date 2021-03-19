import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskModel } from './models/task-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'gantt-angular';
  taskData:TaskModel[] = [];
  taskData1:TaskModel[] = [];
  taskData2:TaskModel[] = [];
  taskData3:TaskModel[] = [];
  enableDataZoom:boolean = false
  enableDarkTheme:boolean = false

  constructor(){
    
  }

  toggleDataZoom(): void{
    this.enableDataZoom = !this.enableDataZoom
    if(this.enableDataZoom)
      alert("The vertical scroll will stop to work!")
  }

  toggleDarkTheme(): void{
    this.enableDarkTheme = !this.enableDarkTheme
  }

  changeDataClicked(dataNumber:number): void{
    switch(dataNumber){
      case 1:
        this.taskData = this.taskData1
        break;
      case 2:
        this.taskData = this.taskData2
        break;
      case 3:
        this.taskData = this.taskData3
        break;
      default:
        this.taskData = []
        break;
    }
  }

  onEditClicked(event:boolean){
    alert("do what do you want")
  }

  ngAfterContentChecked(): void {
    //console.log("zicaaaa")
  }
  

  ngOnInit(): void {
    var now = new Date()
    var now1_1 = new Date((new Date()).setDate(now.getDate() + 3));
    var now1_2 = new Date((new Date()).setDate(now.getDate() + 22));

    var now2_1 = new Date((new Date()).setDate(now.getDate() + 25));
    var now2_2 = new Date((new Date()).setDate(now.getDate() + 33));

    var now3_1 = new Date((new Date()).setDate(now.getDate() - 30));
    var now3_2 = new Date((new Date()).setDate(now.getDate() - 12));

    var now4_1 = new Date((new Date()).setDate(now.getDate() + 33));
    var now4_2 = new Date((new Date()).setDate(now.getDate() + 40));

    var now5_1 = new Date((new Date()).setDate(now.getDate() + 43));
    var now5_2 = new Date((new Date()).setDate(now.getDate() + 70));

    var now6_1 = new Date((new Date()).setDate(now.getDate() + 68));
    var now6_2 = new Date((new Date()).setDate(now.getDate() + 75));

    this.taskData1 = [
      {
          groupName: "Group 1",
          groupOrder: 1,
          taskName: "tarefa 1",
          taskId: 1,
          taskDependencies: [],
          start: now1_1,
          end: now1_2,
          donePercentage: 10,
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
          image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
      }
    ];

    this.taskData2 = [
      {
          groupName: "Group 1",
          groupOrder: 1,
          taskName: "tarefa 1",
          taskId: 1,
          taskDependencies: [],
          start: now1_1,
          end: now1_2,
          donePercentage: 10,
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
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
          owner: '',
          image: 'http://carismartes.com.br/assets/global/images/avatars/avatar1_big@2x.png'
      }
    ];

    this.taskData3 = [
      {
          groupName: "Group 1",
          groupOrder: 1,
          taskName: "tarefa 1",
          taskId: 1,
          taskDependencies: [],
          start: now1_1,
          end: now1_2,
          donePercentage: 10,
          owner: '',
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
          owner: '',
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
          owner: '',
          image: 'http://carismartes.com.br/assets/global/images/avatars/avatar3_big@2x.png'
      }
    ];

    this.taskData = this.taskData2;
  }
}
