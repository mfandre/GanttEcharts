import { AfterViewInit, ElementRef, EventEmitter, InjectionToken, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
export interface NgxEchartsConfig {
    echarts: any | (() => Promise<any>);
}
export declare const NGX_ECHARTS_CONFIG: InjectionToken<NgxEchartsConfig>;
export declare class NgxEchartsDirective implements OnChanges, OnDestroy, OnInit, AfterViewInit {
    private el;
    private ngZone;
    options: any;
    theme: string;
    loading: boolean;
    initOpts: {
        devicePixelRatio?: number;
        renderer?: string;
        width?: number | string;
        height?: number | string;
    };
    merge: any;
    autoResize: boolean;
    loadingType: string;
    loadingOpts: object;
    chartInit: EventEmitter<any>;
    optionsError: EventEmitter<Error>;
    chartClick: EventEmitter<unknown>;
    chartDblClick: EventEmitter<unknown>;
    chartMouseDown: EventEmitter<unknown>;
    chartMouseMove: EventEmitter<unknown>;
    chartMouseUp: EventEmitter<unknown>;
    chartMouseOver: EventEmitter<unknown>;
    chartMouseOut: EventEmitter<unknown>;
    chartGlobalOut: EventEmitter<unknown>;
    chartContextMenu: EventEmitter<unknown>;
    chartLegendSelectChanged: EventEmitter<unknown>;
    chartLegendSelected: EventEmitter<unknown>;
    chartLegendUnselected: EventEmitter<unknown>;
    chartLegendScroll: EventEmitter<unknown>;
    chartDataZoom: EventEmitter<unknown>;
    chartDataRangeSelected: EventEmitter<unknown>;
    chartTimelineChanged: EventEmitter<unknown>;
    chartTimelinePlayChanged: EventEmitter<unknown>;
    chartRestore: EventEmitter<unknown>;
    chartDataViewChanged: EventEmitter<unknown>;
    chartMagicTypeChanged: EventEmitter<unknown>;
    chartPieSelectChanged: EventEmitter<unknown>;
    chartPieSelected: EventEmitter<unknown>;
    chartPieUnselected: EventEmitter<unknown>;
    chartMapSelectChanged: EventEmitter<unknown>;
    chartMapSelected: EventEmitter<unknown>;
    chartMapUnselected: EventEmitter<unknown>;
    chartAxisAreaSelected: EventEmitter<unknown>;
    chartFocusNodeAdjacency: EventEmitter<unknown>;
    chartUnfocusNodeAdjacency: EventEmitter<unknown>;
    chartBrush: EventEmitter<unknown>;
    chartBrushEnd: EventEmitter<unknown>;
    chartBrushSelected: EventEmitter<unknown>;
    chartRendered: EventEmitter<unknown>;
    chartFinished: EventEmitter<unknown>;
    animationFrameID: any;
    private chart;
    private echarts;
    private resizeSub;
    constructor(config: NgxEchartsConfig, el: ElementRef, ngZone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    private dispose;
    /**
     * resize chart
     */
    resize(): void;
    private toggleLoading;
    private setOption;
    /**
     * dispose old chart and create a new one.
     */
    refreshChart(): Promise<void>;
    private createChart;
    private initChart;
    private onOptionsChange;
    private createLazyEvent;
}
