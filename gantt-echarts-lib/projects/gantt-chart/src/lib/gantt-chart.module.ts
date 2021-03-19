import { NgModule } from '@angular/core';
import { GanttComponent } from './gantt/gantt.component';

import { NgxEchartsModule } from 'ngx-echarts'

@NgModule({
  declarations: [GanttComponent],
  imports: [
    NgxEchartsModule
  ],
  exports: [GanttComponent]
})
export class GanttChartModule { }
