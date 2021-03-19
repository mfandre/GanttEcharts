import { InjectionToken, EventEmitter, Directive, Inject, ElementRef, NgZone, Input, Output, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import ResizeObserver from 'resize-observer-polyfill';
import { of, EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

class ChangeFilter {
    constructor(changes) {
        this.changes = changes;
    }
    static of(changes) {
        return new ChangeFilter(changes);
    }
    notEmpty(key) {
        if (this.changes[key]) {
            const value = this.changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return EMPTY;
    }
    has(key) {
        if (this.changes[key]) {
            const value = this.changes[key].currentValue;
            return of(value);
        }
        return EMPTY;
    }
    notFirst(key) {
        if (this.changes[key] && !this.changes[key].isFirstChange()) {
            const value = this.changes[key].currentValue;
            return of(value);
        }
        return EMPTY;
    }
    notFirstAndEmpty(key) {
        if (this.changes[key] && !this.changes[key].isFirstChange()) {
            const value = this.changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return of(value);
            }
        }
        return EMPTY;
    }
}

const NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
class NgxEchartsDirective {
    constructor(config, el, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.autoResize = true;
        this.loadingType = 'default';
        // ngx-echarts events
        this.chartInit = new EventEmitter();
        this.optionsError = new EventEmitter();
        // echarts mouse events
        this.chartClick = this.createLazyEvent('click');
        this.chartDblClick = this.createLazyEvent('dblclick');
        this.chartMouseDown = this.createLazyEvent('mousedown');
        this.chartMouseMove = this.createLazyEvent('mousemove');
        this.chartMouseUp = this.createLazyEvent('mouseup');
        this.chartMouseOver = this.createLazyEvent('mouseover');
        this.chartMouseOut = this.createLazyEvent('mouseout');
        this.chartGlobalOut = this.createLazyEvent('globalout');
        this.chartContextMenu = this.createLazyEvent('contextmenu');
        // echarts mouse events
        this.chartLegendSelectChanged = this.createLazyEvent('legendselectchanged');
        this.chartLegendSelected = this.createLazyEvent('legendselected');
        this.chartLegendUnselected = this.createLazyEvent('legendunselected');
        this.chartLegendScroll = this.createLazyEvent('legendscroll');
        this.chartDataZoom = this.createLazyEvent('datazoom');
        this.chartDataRangeSelected = this.createLazyEvent('datarangeselected');
        this.chartTimelineChanged = this.createLazyEvent('timelinechanged');
        this.chartTimelinePlayChanged = this.createLazyEvent('timelineplaychanged');
        this.chartRestore = this.createLazyEvent('restore');
        this.chartDataViewChanged = this.createLazyEvent('dataviewchanged');
        this.chartMagicTypeChanged = this.createLazyEvent('magictypechanged');
        this.chartPieSelectChanged = this.createLazyEvent('pieselectchanged');
        this.chartPieSelected = this.createLazyEvent('pieselected');
        this.chartPieUnselected = this.createLazyEvent('pieunselected');
        this.chartMapSelectChanged = this.createLazyEvent('mapselectchanged');
        this.chartMapSelected = this.createLazyEvent('mapselected');
        this.chartMapUnselected = this.createLazyEvent('mapunselected');
        this.chartAxisAreaSelected = this.createLazyEvent('axisareaselected');
        this.chartFocusNodeAdjacency = this.createLazyEvent('focusnodeadjacency');
        this.chartUnfocusNodeAdjacency = this.createLazyEvent('unfocusnodeadjacency');
        this.chartBrush = this.createLazyEvent('brush');
        this.chartBrushEnd = this.createLazyEvent('brushend');
        this.chartBrushSelected = this.createLazyEvent('brushselected');
        this.chartRendered = this.createLazyEvent('rendered');
        this.chartFinished = this.createLazyEvent('finished');
        this.animationFrameID = null;
        this.echarts = config.echarts;
    }
    ngOnChanges(changes) {
        const filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe((opt) => this.onOptionsChange(opt));
        filter.notFirstAndEmpty('merge').subscribe((opt) => this.setOption(opt));
        filter.has('loading').subscribe((v) => this.toggleLoading(!!v));
        filter.notFirst('theme').subscribe(() => this.refreshChart());
    }
    ngOnInit() {
        if (this.autoResize) {
            this.resizeSub = new ResizeObserver(() => {
                this.animationFrameID = window.requestAnimationFrame(() => this.resize());
            });
            this.resizeSub.observe(this.el.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.resizeSub) {
            this.resizeSub.unobserve(this.el.nativeElement);
            window.cancelAnimationFrame(this.animationFrameID);
        }
        this.dispose();
    }
    ngAfterViewInit() {
        setTimeout(() => this.initChart());
    }
    dispose() {
        if (this.chart) {
            if (!this.chart.isDisposed()) {
                this.chart.dispose();
            }
            this.chart = null;
        }
    }
    /**
     * resize chart
     */
    resize() {
        if (this.chart) {
            this.chart.resize();
        }
    }
    toggleLoading(loading) {
        if (this.chart) {
            loading
                ? this.chart.showLoading(this.loadingType, this.loadingOpts)
                : this.chart.hideLoading();
        }
    }
    setOption(option, opts) {
        if (this.chart) {
            try {
                this.chart.setOption(option, opts);
            }
            catch (e) {
                console.error(e);
                this.optionsError.emit(e);
            }
        }
    }
    /**
     * dispose old chart and create a new one.
     */
    refreshChart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dispose();
            yield this.initChart();
        });
    }
    createChart() {
        const dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            const prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') && (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        // here a bit tricky: we check if the echarts module is provided as function returning native import('...') then use the promise
        // otherwise create the function that imitates behaviour above with a provided as is module
        return this.ngZone.runOutsideAngular(() => {
            const load = typeof this.echarts === 'function' ? this.echarts : () => Promise.resolve(this.echarts);
            return load().then(({ init }) => init(dom, this.theme, this.initOpts));
        });
    }
    initChart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onOptionsChange(this.options);
            if (this.merge && this.chart) {
                this.setOption(this.merge);
            }
        });
    }
    onOptionsChange(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!opt) {
                return;
            }
            if (this.chart) {
                this.setOption(this.options, true);
            }
            else {
                this.chart = yield this.createChart();
                this.chartInit.emit(this.chart);
                this.setOption(this.options, true);
            }
        });
    }
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    createLazyEvent(eventName) {
        return this.chartInit.pipe(switchMap((chart) => new Observable((observer) => {
            chart.on(eventName, (data) => this.ngZone.run(() => observer.next(data)));
            return () => {
                if (this.chart) {
                    if (!this.chart.isDisposed()) {
                        chart.off(eventName);
                    }
                }
            };
        })));
    }
}
NgxEchartsDirective.decorators = [
    { type: Directive, args: [{
                selector: 'echarts, [echarts]',
                exportAs: 'echarts',
            },] }
];
NgxEchartsDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGX_ECHARTS_CONFIG,] }] },
    { type: ElementRef },
    { type: NgZone }
];
NgxEchartsDirective.propDecorators = {
    options: [{ type: Input }],
    theme: [{ type: Input }],
    loading: [{ type: Input }],
    initOpts: [{ type: Input }],
    merge: [{ type: Input }],
    autoResize: [{ type: Input }],
    loadingType: [{ type: Input }],
    loadingOpts: [{ type: Input }],
    chartInit: [{ type: Output }],
    optionsError: [{ type: Output }],
    chartClick: [{ type: Output }],
    chartDblClick: [{ type: Output }],
    chartMouseDown: [{ type: Output }],
    chartMouseMove: [{ type: Output }],
    chartMouseUp: [{ type: Output }],
    chartMouseOver: [{ type: Output }],
    chartMouseOut: [{ type: Output }],
    chartGlobalOut: [{ type: Output }],
    chartContextMenu: [{ type: Output }],
    chartLegendSelectChanged: [{ type: Output }],
    chartLegendSelected: [{ type: Output }],
    chartLegendUnselected: [{ type: Output }],
    chartLegendScroll: [{ type: Output }],
    chartDataZoom: [{ type: Output }],
    chartDataRangeSelected: [{ type: Output }],
    chartTimelineChanged: [{ type: Output }],
    chartTimelinePlayChanged: [{ type: Output }],
    chartRestore: [{ type: Output }],
    chartDataViewChanged: [{ type: Output }],
    chartMagicTypeChanged: [{ type: Output }],
    chartPieSelectChanged: [{ type: Output }],
    chartPieSelected: [{ type: Output }],
    chartPieUnselected: [{ type: Output }],
    chartMapSelectChanged: [{ type: Output }],
    chartMapSelected: [{ type: Output }],
    chartMapUnselected: [{ type: Output }],
    chartAxisAreaSelected: [{ type: Output }],
    chartFocusNodeAdjacency: [{ type: Output }],
    chartUnfocusNodeAdjacency: [{ type: Output }],
    chartBrush: [{ type: Output }],
    chartBrushEnd: [{ type: Output }],
    chartBrushSelected: [{ type: Output }],
    chartRendered: [{ type: Output }],
    chartFinished: [{ type: Output }]
};

class NgxEchartsModule {
    static forRoot(config) {
        return {
            ngModule: NgxEchartsModule,
            providers: [{ provide: NGX_ECHARTS_CONFIG, useValue: config }],
        };
    }
    static forChild() {
        return {
            ngModule: NgxEchartsModule,
        };
    }
}
NgxEchartsModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [NgxEchartsDirective],
                exports: [NgxEchartsDirective],
            },] }
];

/*
 * Public API Surface of ngx-echarts
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NGX_ECHARTS_CONFIG, NgxEchartsDirective, NgxEchartsModule };
//# sourceMappingURL=ngx-echarts.js.map
