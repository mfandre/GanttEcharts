# Iamferraz Gantt Echarts
Gantt Chart using echarts

# Running
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
      [dateFormat]="{MM}/{dd}/{yyyy}" 
      [(taskData)]="taskData" <!-- TaskModel[] -->
      [enableDataZoom]="enableDataZoom" 
      [enableDarkTheme]="enableDarkTheme" 
      (editClicked)="onEditClicked($event)"> 
    </iamferraz-gantt>
```