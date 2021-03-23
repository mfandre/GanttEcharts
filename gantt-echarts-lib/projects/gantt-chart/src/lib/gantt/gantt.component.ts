import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';
import { TaskModel } from '../models/task-data.model';
import { GanttRenderers } from '../shared/gantt-renderers';
import { TaskDataManipulator } from '../shared/task-data-manipulator';

@Component({
  selector: 'iamferraz-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit, AfterViewInit, OnChanges, AfterContentChecked {
  @ViewChild('wrapper') wrapper: ElementRef | undefined;
  @ViewChild('gantt') gantt: ElementRef | undefined;

  @Input()
  public taskData: TaskModel[] = [];
  @Output() 
  public taskDataChange: EventEmitter<TaskModel[]> = new EventEmitter<TaskModel[]>();
  //this.dataChange.emit(this.size);

  @Output()
  public editClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() 
  public taskClicked: EventEmitter<TaskModel | null> = new EventEmitter<TaskModel | null>();
  /**
   * The scroll will stop to work... its a bug that I cant figure it out :(
   */
  @Input()
  public enableDataZoom: boolean = false;

  @Input()
  public enableDarkTheme: boolean = false;

  @Input()
  public enableGroup: boolean = true;

  @Input()
  public chartTitle: string = "";

  @Input()
  public dateFormat: string = "{MM}/{dd}/{yyyy}";

  @Input()
  public colours: string[] = ["#F94144","#F3722C", "#F8961E", "#F9844A", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590", "#277DA1"];

  @Input()
  public heightRatio: number = 0.6

  @Input()
  public loading: boolean = false;

  @Input()
  public height: number = 300;

  /**
   * To replace the strings
   */
  @Input()
  public translation: any = {
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

  /**
   * Variable to control chart
   */
  ganttWidth: number = 700;

  ganttHeight: number = 500;
  
  chartOptions: any;

  echartsInstance: any;

  private renderers?:GanttRenderers;
  private taskDataManipulator:TaskDataManipulator;
  private mappedData:any[];
  private zebraData:any[];
  private todayData:any[];

  constructor() { 
    this.taskDataManipulator = new TaskDataManipulator(this.colours, this.enableGroup)
    
    this.taskData = this.taskData.sort(this.taskDataManipulator.compareTasks)

    //after sort we map to maintain the order
    this.mappedData = this.taskDataManipulator.mapData(this.taskData)
    this.zebraData = this.taskDataManipulator.mapZebra(this.taskData)
    this.todayData = [new Date()]
  }

  getTitleOption():any{
    if(this.chartTitle === "")
      return {}
    
    return {
      text: this.chartTitle,
      textStyle: {
        color: this.enableDarkTheme ? '#fff' : '#000'
      },
      left: 'center'
    }
  }

  getGridOption():any{
    return {
        show: true,
        top: 70,
        bottom: 20,
        left: 225,
        right: 20,
        //height: '1000px',
        backgroundColor: '#fff',
        borderWidth: 0
    }
  }

  getTooltipOption():any{
    let DATE_FORMAT = this.dateFormat
    let translation = this.translation
    return {
      confine: true,
      appendToBody: true,
      trigger: 'item',
      formatter: function (info:any) {
          //removing tooltip from the lines
          if(info != undefined && info.seriesIndex != 2){
              return "";
          }
          //console.log("info", info)
          var value = info.value;

          var taskName = value[1];
          var start = echarts.time.format(
              (new Date(value[2])),
              DATE_FORMAT,
              false
          );
          var end = echarts.time.format(
              (new Date(value[3])),
              DATE_FORMAT,
              false
          );
          var donePercentage = value[5]

          return [
              '<div class="tooltip-title">' + echarts.format.encodeHTML(taskName) + '</div>',
              start + ' - ',
              end + '<br>', donePercentage + '% ' + (translation ? translation.DONE : "DONE")
          ].join('');
      }
    }
  }

  resetZoomAction():void{
    this.echartsInstance.dispatchAction({
      type: 'dataZoom',
      start: 0,
      end: 100
    })
  }

  editAction():void{
    this.editClicked.emit(true)
  }

  getToolboxOption():any{
    return {
      left: 20,
      top: 0,
      itemSize: 20,
      feature: {
          myEditor: {
              show: true,
              title: 'Edit',
              icon: 'path://M990.55 380.08 q11.69 0 19.88 8.19 q7.02 7.01 7.02 18.71 l0 480.65 q-1.17 43.27 -29.83 71.93 q-28.65 28.65 -71.92 29.82 l-813.96 0 q-43.27 -1.17 -72.5 -30.41 q-28.07 -28.07 -29.24 -71.34 l0 -785.89 q1.17 -43.27 29.24 -72.5 q29.23 -29.24 72.5 -29.24 l522.76 0 q11.7 0 18.71 7.02 q8.19 8.18 8.19 18.71 q0 11.69 -7.6 19.29 q-7.6 7.61 -19.3 7.61 l-518.08 0 q-22.22 1.17 -37.42 16.37 q-15.2 15.2 -15.2 37.42 l0 775.37 q0 23.39 15.2 38.59 q15.2 15.2 37.42 15.2 l804.6 0 q22.22 0 37.43 -15.2 q15.2 -15.2 16.37 -38.59 l0 -474.81 q0 -11.7 7.02 -18.71 q8.18 -8.19 18.71 -8.19 l0 0 ZM493.52 723.91 l-170.74 -170.75 l509.89 -509.89 q23.39 -23.39 56.13 -21.05 q32.75 1.17 59.65 26.9 l47.94 47.95 q25.73 26.89 27.49 59.64 q1.75 32.75 -21.64 57.3 l-508.72 509.9 l0 0 ZM870.09 80.69 l-56.13 56.14 l94.72 95.9 l56.14 -57.31 q8.19 -9.35 8.19 -21.05 q-1.17 -12.86 -10.53 -22.22 l-47.95 -49.12 q-10.52 -9.35 -23.39 -9.35 q-11.69 -1.17 -21.05 7.01 l0 0 ZM867.75 272.49 l-93.56 -95.9 l-380.08 380.08 l94.73 94.73 l378.91 -378.91 l0 0 ZM322.78 553.16 l38.59 39.77 l-33.92 125.13 l125.14 -33.92 l38.59 38.6 l-191.79 52.62 q-5.85 1.17 -12.28 0 q-6.44 -1.17 -11.11 -5.84 q-4.68 -4.68 -5.85 -11.7 q-2.34 -5.85 0 -11.69 l52.63 -192.97 l0 0 Z',
              onclick: this.editAction.bind(this)
          },
          myZoomMinus: this.enableDataZoom ? {
            show: true,
            title: 'Reset Zoom',
            icon: 'path://M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z M13.388,9.624H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h6.775c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z',
            onclick: this.resetZoomAction.bind(this)
          } : {},
          saveAsImage : {
            show: true,
            icon: 'path://M6.523,7.683c0.96,0,1.738-0.778,1.738-1.738c0-0.96-0.778-1.738-1.738-1.738c-0.96,0-1.738,0.778-1.738,1.738 C4.785,6.904,5.563,7.683,6.523,7.683z M5.944,5.365h1.159v1.159H5.944V5.365z M18.113,0.729H1.888 c-0.64,0-1.159,0.519-1.159,1.159v16.224c0,0.64,0.519,1.159,1.159,1.159h16.225c0.639,0,1.158-0.52,1.158-1.159V1.889 C19.271,1.249,18.752,0.729,18.113,0.729z M18.113,17.532c0,0.321-0.262,0.58-0.58,0.58H2.467c-0.32,0-0.579-0.259-0.579-0.58 V2.468c0-0.32,0.259-0.579,0.579-0.579h15.066c0.318,0,0.58,0.259,0.58,0.579V17.532z M15.91,7.85l-4.842,5.385l-3.502-2.488 c-0.127-0.127-0.296-0.18-0.463-0.17c-0.167-0.009-0.336,0.043-0.463,0.17l-3.425,4.584c-0.237,0.236-0.237,0.619,0,0.856 c0.236,0.236,0.62,0.236,0.856,0l3.152-4.22l3.491,2.481c0.123,0.123,0.284,0.179,0.446,0.174c0.16,0.005,0.32-0.051,0.443-0.174 l5.162-5.743c0.238-0.236,0.238-0.619,0-0.856C16.529,7.614,16.146,7.614,15.91,7.85z'
          }
      }
    }
  }

  getXAxisOption():any{
    
    return {
      type: 'time',
      position: 'top',
      splitLine: {
          lineStyle: {
              color: ['#E9EDFF']
          }
      },
      axisLine: {
          show: false
      },
      axisTick: {
          lineStyle: {
              color: '#929ABA'
          }
      },
      axisLabel: {
          color: '#929ABA',
          inside: false,
          align: 'center',
          formatter: this.formatLabelDate.bind(this)
      }
    }
  }

  formatLabelDate(value:Date, index:number):string{
    let valueDate = new Date(value)

    let dayToday = valueDate.getDate()
    let monthToday = valueDate.getMonth()
    if(this.isFirstDay(dayToday,monthToday)){
      return this.getMonthName(monthToday)
    }
    return dayToday + "";
    /*let DATE_FORMAT = this.dateFormat
    return echarts.time.format(
        value,
        DATE_FORMAT,
        false
    );*/
  }

  /**
   * 
   * @param dayToday day reference to check if is the last day of the month
   * @param month (0-11) month reference to check if the day passed is the last day of the month.
   * @returns true if day is the last day of the month. False otherwise
   */
  getLastDayMonth(dayToday:number, month:number):boolean{
    //var month = 0; // January
    var d = new Date(new Date().getFullYear(), month + 1, 0).getDate();

    return d == dayToday
  }

  isFirstDay(dayToday:number, month:number):boolean{
    return dayToday == 1
  }

  getMonthName(month:number):string{
    switch(month){
      case 0:
        return this.translation ? this.translation.JANUARY : "Jan"
      case 1:
        return this.translation ? this.translation.FEBRUARY : "Fev"
      case 2:
        return this.translation ? this.translation.MARCH : "Mar"
      case 3:
        return this.translation ? this.translation.APRIL : "Apr"
      case 4:
        return this.translation ? this.translation.MAY : "May"
      case 5:
        return this.translation ? this.translation.JUNE : "Jun"
      case 6:
        return this.translation ? this.translation.JULY : "Jul"
      case 7:
        return this.translation ? this.translation.AUGUST : "Aug"
      case 8:
        return this.translation ? this.translation.SEPTEMBER : "Sep"
      case 9:
        return this.translation ? this.translation.OCTOBER : "Oct"
      case 10:
        return this.translation ? this.translation.NOVEMBER : "Nov"
      case 11:
        return this.translation ? this.translation.DECEMBER : "Dec"
    }
    return ""
  }

  getYAxisOption():any{
    return {
      axisTick: {show: false},
      splitLine: {show: false},
      axisLine: {show: false},
      axisLabel: {show: false},
      min: 0,
      max: this.taskData.length
    }
  }

  getSerieZebra():any{
    var _zebraDataDimensions = [
      {name: 'index', type: 'number'},
      {name: 'start', type: 'time'},
      {name: 'end', type: 'time'},
      {name: 'taskId', type: 'number'}
    ]
    return {
      id: 'zebra',
      type: 'custom',
      renderItem: this.renderers!.renderZebra.bind(this.renderers),
      dimensions: _zebraDataDimensions,
      encode: {
          x: -1,//[1, 2],
          y: 3,//reference of taskid
      },
      data: this.zebraData //Im changing the item object to array... this is why the encode is filled with indexed
    }
  }

  getSerieArrow(taskDataDimensions:any[]):any{
    return {
      id:'arrow',
      type: 'custom',
      clip: true,
      silent: true,
      itemStyle: {
          borderType: 'dashed'
      },
      renderItem: this.renderers!.renderArrowsItem.bind(this.renderers),
      dimensions: taskDataDimensions,
      tooltip: null,
      encode: {
          x: -1, // Then this series will not controlled by x.
          y: 4, //reference of taskid
      },
      data: this.mappedData //Im changing the item object to array... this is why the encode is filled with indexed
    }
  }

  getSerieGantt(taskDataDimensions:any[]):any{
    return {
      id: 'taskData',
      type: 'custom',
      itemStyle: {
      },
      renderItem: this.renderers!.renderGanttItem.bind(this.renderers),
      dimensions: taskDataDimensions,
      encode: {
          x: [1, 2, 3, 4],
          y: 4,//reference of taskid
          tooltip: [0, 1, 2]
      },
      data: this.mappedData //Im changing the item object to array... this is why the encode is filled with indexed
    }
  }

  getSerieAxisY(taskDataDimensions:any[]):any{
    return {
      type: 'custom',
      renderItem: this.renderers!.renderAxisLabelItem.bind(this.renderers),
      dimensions: taskDataDimensions,
      encode: {
          x: -1, // Then this series will not controlled by x.
          y: 4, //reference of taskid
          tooltip: [0, 1, 2]
      },
      data: this.mappedData //Im changing the item object to array... this is why the encode is filled with indexed
    }
  }

  getSerieToday():any{
    return {
      id: 'today',
      type: 'custom',
      renderItem: this.renderers!.renderToday.bind(this.renderers),
      dimensions: [{name: 'today', type: 'time'}],
      encode: {
          x: 0,
          y: -1,//reference of taskid
      },
      data: this.todayData
    }
  }

  getDataZoom():any[]{
    if(this.enableDataZoom == false){
      return []
    }

    return [{
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 30,
        bottom: 0,
        start: 0,
        end: 30,
        showDetail: false
    }, {
        type: 'inside',
        id: 'insideX',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        start: 0,
        end: 30,
        zoomOnMouseWheel: false,
        moveOnMouseMove: false,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: false,
        preventDefaultMouseWheel: false
    }]
  }

  getSeries():any[]{
    var taskDataDimensions = [
      {name: 'index', type: 'number'},
      {name: 'taskName', type: 'ordinal'},
      {name: 'start', type: 'time'},
      {name: 'end', type: 'time'},
      {name: 'taskId', type: 'number'},
      {name: 'donePercentage', type: 'number'},
      {name: 'owner', type: 'ordinal'},
      {name: 'image', type: 'ordinal'},
      {name: 'groupName', type: 'ordinal'},
      {name: 'isToDrawGroup', type: 'number'},
      {name: 'groupColor', type: 'ordinal'},
    ]
    return [this.getSerieZebra(),
      this.getSerieArrow(taskDataDimensions),
      this.getSerieGantt(taskDataDimensions), 
      this.getSerieAxisY(taskDataDimensions),
      this.getSerieToday()]
  }

  setChartOptions(): void{
    this.chartOptions = {
      backgroundColor:  "transparent",
      tooltip: this.getTooltipOption(),
      animation: false,
      toolbox: this.getToolboxOption(),
      title: this.getTitleOption(),
      dataZoom: this.getDataZoom(),
      grid: this.getGridOption(),
      xAxis: this.getXAxisOption(),
      yAxis: this.getYAxisOption(),
      series: this.getSeries()
    };
    /*if(this.echartsInstance){
      this.echartsInstance.setOption(this.chartOptions)
    }*/
  }

  ngOnInit(): void {
    this.setChartOptions()
  }

  ngAfterViewInit(): void {
    //import * as echarts from 'echarts';

    //@ViewChild('gantt')
    //public gantt: ElementRef | undefined;
    //public ganttEchart: any;

    //this.ganttEchart = echarts.init(this.gantt!.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.echartsInstance){
      this.echartsInstance.clear()
    }
    this.taskDataManipulator = new TaskDataManipulator(this.colours, this.enableGroup)
    this.taskData = this.taskData.sort(this.taskDataManipulator.compareTasks)

    //after sort we map to maintain the order
    this.mappedData = this.taskDataManipulator.mapData(this.taskData)
    this.zebraData = this.taskDataManipulator.mapZebra(this.taskData)
    this.todayData = [new Date()]
    this.renderers = new GanttRenderers(this.taskData, this.mappedData,this.colours, this.dateFormat, this.heightRatio, this.translation, this.enableGroup, this.enableDarkTheme)
    this.setChartOptions()
  }

  ngAfterContentChecked(): void {
    if(this.wrapper == undefined)
      return

    this.ganttWidth = this.wrapper!.nativeElement.offsetWidth;
    this.ganttHeight = this.wrapper!.nativeElement.offsetHeight;

    var chartHeight = this.taskData.length * 80;
    this.ganttHeight = chartHeight < 300 ? 300 : chartHeight
  }

  onChartInit(ec:any) {
    this.echartsInstance = ec;
    this.echartsInstance.resize();
  }

  onTaskClicked(params:any){
    if(params != undefined){
      /*let task:TaskModel = new TaskModel()
      task.taskName = params.value[1]
      task.start = params.value[2]
      task.end = params.value[3]
      task.taskId = params.value[4]
      task.donePercentage = params.value[5]
      task.owner = params.value[6]
      task.image = params.value[7]
      task.groupName = params.value[8]*/
      //re-mapping [index, item.taskName, item.start, item.end, item.taskId, item.donePercentage, item.owner, item.image, item.groupName, isToDrawGroup, color] into taskmodel
      let task:TaskModel | null = this.taskDataManipulator.getTaskById(this.taskData, params.value[4])
      if(this.taskClicked != undefined)
        this.taskClicked.emit(task)
    }
      
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
