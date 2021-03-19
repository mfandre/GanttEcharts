import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GanttChartModule } from 'iamferraz-gantt-chart';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import { RoadMapComponent } from './roadmap/roadmap.component';
import { TestChartComponent } from './test-chart/test-chart.component'

/*import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
);*/

@NgModule({
  declarations: [
    AppComponent,
    TestChartComponent,
    RoadMapComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    GanttChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
