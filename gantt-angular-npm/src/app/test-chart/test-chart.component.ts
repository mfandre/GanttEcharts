import { AfterContentChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.css']
})
export class TestChartComponent implements OnInit, AfterViewInit, OnChanges, AfterContentChecked {
  @ViewChild('wrapper') wrapper: ElementRef | undefined;
  @ViewChild('gantt') gantt: ElementRef | undefined;

  @Input()
  public loading: boolean = false;

  @Input()
  public height: number = 300;

  public ganttWidth: number = 300;

  public ganttHeight: number = 300;
  
  public chartOptions: any;

  echartsInstance: any;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      title: {text: "Test Chart"},
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
      ],
    };
  }

  ngAfterViewInit(): void {
    //import * as echarts from 'echarts';

    //@ViewChild('gantt')
    //public gantt: ElementRef | undefined;
    //public ganttEchart: any;

    //this.ganttEchart = echarts.init(this.gantt!.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changed =>", changes)
  }

  ngAfterContentChecked(): void {
    if(this.wrapper == undefined)
      return

    this.ganttWidth = this.wrapper!.nativeElement.offsetWidth;
    this.ganttHeight = this.wrapper!.nativeElement.offsetHeight;
  }

  onChartInit(ec:any) {
    console.log("chart init")
    this.echartsInstance = ec;
    this.echartsInstance.resize();
  }
  
  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  @HostListener('window:resize', ['$event'])
  sizeChange(event:any) {
    this.resizeChart()
  }
}
