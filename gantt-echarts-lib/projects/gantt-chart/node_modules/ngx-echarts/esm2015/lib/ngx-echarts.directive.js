import { __awaiter } from "tslib";
import { Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Output, } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
export const NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
export class NgxEchartsDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy96eGllL0RvY3VtZW50cy9HaXRIdWIvbmd4LWVjaGFydHMvcHJvamVjdHMvbmd4LWVjaGFydHMvc3JjLyIsInNvdXJjZXMiOlsibGliL25neC1lY2hhcnRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBTS9DLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLElBQUksY0FBYyxDQUFtQixvQkFBb0IsQ0FBQyxDQUFDO0FBTTdGLE1BQU0sT0FBTyxtQkFBbUI7SUE4RDlCLFlBQzhCLE1BQXdCLEVBQzVDLEVBQWMsRUFDZCxNQUFjO1FBRGQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF0RGYsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUdqQyxxQkFBcUI7UUFDWCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNwQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFbkQsdUJBQXVCO1FBQ2IsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0Msa0JBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FB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LE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGFuZ2VGaWx0ZXIgfSBmcm9tICcuL2NoYW5nZS1maWx0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5neEVjaGFydHNDb25maWcge1xuICBlY2hhcnRzOiBhbnkgfCAoKCkgPT4gUHJvbWlzZTxhbnk+KTtcbn1cblxuZXhwb3J0IGNvbnN0IE5HWF9FQ0hBUlRTX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOZ3hFY2hhcnRzQ29uZmlnPignTkdYX0VDSEFSVFNfQ09ORklHJyk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2VjaGFydHMsIFtlY2hhcnRzXScsXG4gIGV4cG9ydEFzOiAnZWNoYXJ0cycsXG59KVxuZXhwb3J0IGNsYXNzIE5neEVjaGFydHNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSBsb2FkaW5nOiBib29sZWFuO1xuICBASW5wdXQoKSBpbml0T3B0czoge1xuICAgIGRldmljZVBpeGVsUmF0aW8/OiBudW1iZXI7XG4gICAgcmVuZGVyZXI/OiBzdHJpbmc7XG4gICAgd2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XG4gICAgaGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nO1xuICB9O1xuICBASW5wdXQoKSBtZXJnZTogYW55O1xuICBASW5wdXQoKSBhdXRvUmVzaXplID0gdHJ1ZTtcbiAgQElucHV0KCkgbG9hZGluZ1R5cGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIGxvYWRpbmdPcHRzOiBvYmplY3Q7XG5cbiAgLy8gbmd4LWVjaGFydHMgZXZlbnRzXG4gIEBPdXRwdXQoKSBjaGFydEluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG9wdGlvbnNFcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG5cbiAgLy8gZWNoYXJ0cyBtb3VzZSBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0Q2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2xpY2snKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGJsQ2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGJsY2xpY2snKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VEb3duID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlZG93bicpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU1vdmUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2Vtb3ZlJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlVXAgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2V1cCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU92ZXIgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2VvdmVyJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlT3V0ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3V0Jyk7XG4gIEBPdXRwdXQoKSBjaGFydEdsb2JhbE91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdnbG9iYWxvdXQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0Q29udGV4dE1lbnUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY29udGV4dG1lbnUnKTtcblxuICAvLyBlY2hhcnRzIG1vdXNlIGV2ZW50c1xuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRTZWxlY3RDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNlbGVjdGNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmR1bnNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNjcm9sbCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmRzY3JvbGwnKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVpvb20gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXpvb20nKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVJhbmdlU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXJhbmdlc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0VGltZWxpbmVDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lY2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRUaW1lbGluZVBsYXlDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lcGxheWNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UmVzdG9yZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyZXN0b3JlJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFWaWV3Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdkYXRhdmlld2NoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TWFnaWNUeXBlQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYWdpY3R5cGVjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFBpZVNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0Y2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWVzZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXVuc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TWFwU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFVuc2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwdW5zZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRBeGlzQXJlYVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2F4aXNhcmVhc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0Rm9jdXNOb2RlQWRqYWNlbmN5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2ZvY3Vzbm9kZWFkamFjZW5jeScpO1xuICBAT3V0cHV0KCkgY2hhcnRVbmZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd1bmZvY3Vzbm9kZWFkamFjZW5jeScpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaCcpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaEVuZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaGVuZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2JydXNoc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UmVuZGVyZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVuZGVyZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0RmluaXNoZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZmluaXNoZWQnKTtcblxuICBwdWJsaWMgYW5pbWF0aW9uRnJhbWVJRCA9IG51bGw7XG4gIHByaXZhdGUgY2hhcnQ6IGFueTtcbiAgcHJpdmF0ZSBlY2hhcnRzOiBhbnk7XG4gIHByaXZhdGUgcmVzaXplU3ViOiBSZXNpemVPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE5HWF9FQ0hBUlRTX0NPTkZJRykgY29uZmlnOiBOZ3hFY2hhcnRzQ29uZmlnLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgKSB7XG4gICAgdGhpcy5lY2hhcnRzID0gY29uZmlnLmVjaGFydHM7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgZmlsdGVyID0gQ2hhbmdlRmlsdGVyLm9mKGNoYW5nZXMpO1xuICAgIGZpbHRlci5ub3RGaXJzdEFuZEVtcHR5PGFueT4oJ29wdGlvbnMnKS5zdWJzY3JpYmUoKG9wdCkgPT4gdGhpcy5vbk9wdGlvbnNDaGFuZ2Uob3B0KSk7XG4gICAgZmlsdGVyLm5vdEZpcnN0QW5kRW1wdHk8YW55PignbWVyZ2UnKS5zdWJzY3JpYmUoKG9wdCkgPT4gdGhpcy5zZXRPcHRpb24ob3B0KSk7XG4gICAgZmlsdGVyLmhhczxib29sZWFuPignbG9hZGluZycpLnN1YnNjcmliZSgodikgPT4gdGhpcy50b2dnbGVMb2FkaW5nKCEhdikpO1xuICAgIGZpbHRlci5ub3RGaXJzdDxzdHJpbmc+KCd0aGVtZScpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2hDaGFydCgpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcbiAgICAgIHRoaXMucmVzaXplU3ViID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnJlc2l6ZSgpKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZXNpemVTdWIub2JzZXJ2ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnJlc2l6ZVN1Yikge1xuICAgICAgdGhpcy5yZXNpemVTdWIudW5vYnNlcnZlKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25GcmFtZUlEKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwb3NlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmluaXRDaGFydCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgaWYgKCF0aGlzLmNoYXJ0LmlzRGlzcG9zZWQoKSkge1xuICAgICAgICB0aGlzLmNoYXJ0LmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhcnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXNpemUgY2hhcnRcbiAgICovXG4gIHJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5yZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUxvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICBsb2FkaW5nXG4gICAgICAgID8gdGhpcy5jaGFydC5zaG93TG9hZGluZyh0aGlzLmxvYWRpbmdUeXBlLCB0aGlzLmxvYWRpbmdPcHRzKVxuICAgICAgICA6IHRoaXMuY2hhcnQuaGlkZUxvYWRpbmcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbihvcHRpb246IGFueSwgb3B0cz86IGFueSkge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmNoYXJ0LnNldE9wdGlvbihvcHRpb24sIG9wdHMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB0aGlzLm9wdGlvbnNFcnJvci5lbWl0KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkaXNwb3NlIG9sZCBjaGFydCBhbmQgY3JlYXRlIGEgbmV3IG9uZS5cbiAgICovXG4gIGFzeW5jIHJlZnJlc2hDaGFydCgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCB0aGlzLmluaXRDaGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGFydCgpIHtcbiAgICBjb25zdCBkb20gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICBjb25zdCBwcm9wID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKTtcbiAgICAgIGlmICgoIXByb3AgfHwgcHJvcCA9PT0gJzBweCcpICYmICghZG9tLnN0eWxlLmhlaWdodCB8fCBkb20uc3R5bGUuaGVpZ2h0ID09PSAnMHB4JykpIHtcbiAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9ICc0MDBweCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGVyZSBhIGJpdCB0cmlja3k6IHdlIGNoZWNrIGlmIHRoZSBlY2hhcnRzIG1vZHVsZSBpcyBwcm92aWRlZCBhcyBmdW5jdGlvbiByZXR1cm5pbmcgbmF0aXZlIGltcG9ydCgnLi4uJykgdGhlbiB1c2UgdGhlIHByb21pc2VcbiAgICAvLyBvdGhlcndpc2UgY3JlYXRlIHRoZSBmdW5jdGlvbiB0aGF0IGltaXRhdGVzIGJlaGF2aW91ciBhYm92ZSB3aXRoIGEgcHJvdmlkZWQgYXMgaXMgbW9kdWxlXG4gICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGxvYWQgPVxuICAgICAgICB0eXBlb2YgdGhpcy5lY2hhcnRzID09PSAnZnVuY3Rpb24nID8gdGhpcy5lY2hhcnRzIDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZWNoYXJ0cyk7XG5cbiAgICAgIHJldHVybiBsb2FkKCkudGhlbigoeyBpbml0IH0pID0+IGluaXQoZG9tLCB0aGlzLnRoZW1lLCB0aGlzLmluaXRPcHRzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluaXRDaGFydCgpIHtcbiAgICBhd2FpdCB0aGlzLm9uT3B0aW9uc0NoYW5nZSh0aGlzLm9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMubWVyZ2UgJiYgdGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5zZXRPcHRpb24odGhpcy5tZXJnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvbk9wdGlvbnNDaGFuZ2Uob3B0OiBhbnkpIHtcbiAgICBpZiAoIW9wdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLnNldE9wdGlvbih0aGlzLm9wdGlvbnMsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXJ0ID0gYXdhaXQgdGhpcy5jcmVhdGVDaGFydCgpO1xuICAgICAgdGhpcy5jaGFydEluaXQuZW1pdCh0aGlzLmNoYXJ0KTtcbiAgICAgIHRoaXMuc2V0T3B0aW9uKHRoaXMub3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWxsb3dzIHRvIGxhemlseSBiaW5kIHRvIG9ubHkgdGhvc2UgZXZlbnRzIHRoYXQgYXJlIHJlcXVlc3RlZCB0aHJvdWdoIHRoZSBgQE91dHB1dGAgYnkgcGFyZW50IGNvbXBvbmVudHNcbiAgLy8gc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUxNzg3OTcyL29wdGltYWwtcmVlbnRlcmluZy10aGUtbmd6b25lLWZyb20tZXZlbnRlbWl0dGVyLWV2ZW50IGZvciBtb3JlIGluZm9cbiAgcHJpdmF0ZSBjcmVhdGVMYXp5RXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8VD4ge1xuICAgIHJldHVybiB0aGlzLmNoYXJ0SW5pdC5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAoY2hhcnQ6IGFueSkgPT5cbiAgICAgICAgICBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGNoYXJ0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGFydC5pc0Rpc3Bvc2VkKCkpIHtcbiAgICAgICAgICAgICAgICAgIGNoYXJ0Lm9mZihldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApIGFzIEV2ZW50RW1pdHRlcjxUPjtcbiAgfVxufVxuIl19