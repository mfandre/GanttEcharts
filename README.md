# GanttEcharts
Gantt Chart using echarts

# Installation
'''
  npm install echarts -S
  npm install ngx-echarts -S
  npm install resize-observer-polyfill -D
  npm install iamferraz-gantt-chart -S
'''

# Usage
'''
    <iamferraz-gantt 
      [chartTitle]="'Gantt by André'" 
      [(taskData)]="taskData" <!-- TaskModel[] -->
      [enableDataZoom]="enableDataZoom" 
      [enableDarkTheme]="enableDarkTheme" 
      (editClicked)="onEditClicked($event)"> 
    </iamferraz-gantt>
'''

# Folders
- gantt-angular-npm (angular app example)
- gantt-angular-sandbox (angular app to sandbox)
- gantt-echarts-lib (angular lib to create npm package)
- gantt-html-js (html+js version)

# Running
![image](https://user-images.githubusercontent.com/1164677/111841394-ace7ff00-88dc-11eb-8fea-8edb1e69f4ec.png)


