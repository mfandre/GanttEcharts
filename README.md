# Iamferraz Gantt Echarts
Gantt Chart using echarts

# Example
[Running Example](http://iamferraz.com.br/gantt)

# Screenshot
![image](https://user-images.githubusercontent.com/1164677/111841394-ace7ff00-88dc-11eb-8fea-8edb1e69f4ec.png)

# Installation
```
  npm install echarts -S
  npm install ngx-echarts -S
  npm install resize-observer-polyfill -D
  npm install iamferraz-gantt-chart -S
```

# Usage
```
  <iamferraz-gantt 
    [chartTitle]="'Gantt by André'" 
    [dateFormat]="'{MM}/{dd}/{yyyy}'" 
    [(taskData)]="taskData" <!-- TaskModel[] -->
    [enableDataZoom]="enableDataZoom" 
    [enableDarkTheme]="enableDarkTheme" 
    [enableGroup]="true" <!-- is to group elements? -->
    (editClicked)="onEditClicked($event)"
    (taskClicked)="onTaskClicked($event)" <!-- $event = TaskModel -->
    [colours]="['#f00','#0f0','#00f']" <!-- task colours -->
    [loading]="false" <!-- loading animation -->
    [translation]="see below"
    > 
  </iamferraz-gantt>
```

Translation object:
```
translation: any = {
    DONE: "done",
    TO_END: "days to finish",
    DELAYED: "delayed",
    JANUARY : "Jan",
    FEBRUARY : "Fev",
    MARCH : "Mar",
    APRIL : "Apr",
    MAY : "May",
    JUNE : "Jun",
    JULY : "Jul",
    AUGUST : "Aug",
    SEPTEMBER : "Sep",
    OCTOBER : "Oct",
    NOVEMBER : "Nov",
    DECEMBER : "Dec"
  };
```

Dont forget to import the NgxEchartsModule into your app module!

```
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    ...,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
})
export class AppModule { }
```