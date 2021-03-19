(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('resize-observer-polyfill'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-echarts', ['exports', '@angular/core', 'resize-observer-polyfill', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-echarts'] = {}, global.ng.core, global.ResizeObserver, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, ResizeObserver, rxjs, operators) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ResizeObserver__default = /*#__PURE__*/_interopDefaultLegacy(ResizeObserver);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var ChangeFilter = /** @class */ (function () {
        function ChangeFilter(changes) {
            this.changes = changes;
        }
        ChangeFilter.of = function (changes) {
            return new ChangeFilter(changes);
        };
        ChangeFilter.prototype.notEmpty = function (key) {
            if (this.changes[key]) {
                var value = this.changes[key].currentValue;
                if (value !== undefined && value !== null) {
                    return rxjs.of(value);
                }
            }
            return rxjs.EMPTY;
        };
        ChangeFilter.prototype.has = function (key) {
            if (this.changes[key]) {
                var value = this.changes[key].currentValue;
                return rxjs.of(value);
            }
            return rxjs.EMPTY;
        };
        ChangeFilter.prototype.notFirst = function (key) {
            if (this.changes[key] && !this.changes[key].isFirstChange()) {
                var value = this.changes[key].currentValue;
                return rxjs.of(value);
            }
            return rxjs.EMPTY;
        };
        ChangeFilter.prototype.notFirstAndEmpty = function (key) {
            if (this.changes[key] && !this.changes[key].isFirstChange()) {
                var value = this.changes[key].currentValue;
                if (value !== undefined && value !== null) {
                    return rxjs.of(value);
                }
            }
            return rxjs.EMPTY;
        };
        return ChangeFilter;
    }());

    var NGX_ECHARTS_CONFIG = new core.InjectionToken('NGX_ECHARTS_CONFIG');
    var NgxEchartsDirective = /** @class */ (function () {
        function NgxEchartsDirective(config, el, ngZone) {
            this.el = el;
            this.ngZone = ngZone;
            this.autoResize = true;
            this.loadingType = 'default';
            // ngx-echarts events
            this.chartInit = new core.EventEmitter();
            this.optionsError = new core.EventEmitter();
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
        NgxEchartsDirective.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var filter = ChangeFilter.of(changes);
            filter.notFirstAndEmpty('options').subscribe(function (opt) { return _this.onOptionsChange(opt); });
            filter.notFirstAndEmpty('merge').subscribe(function (opt) { return _this.setOption(opt); });
            filter.has('loading').subscribe(function (v) { return _this.toggleLoading(!!v); });
            filter.notFirst('theme').subscribe(function () { return _this.refreshChart(); });
        };
        NgxEchartsDirective.prototype.ngOnInit = function () {
            var _this = this;
            if (this.autoResize) {
                this.resizeSub = new ResizeObserver__default['default'](function () {
                    _this.animationFrameID = window.requestAnimationFrame(function () { return _this.resize(); });
                });
                this.resizeSub.observe(this.el.nativeElement);
            }
        };
        NgxEchartsDirective.prototype.ngOnDestroy = function () {
            if (this.resizeSub) {
                this.resizeSub.unobserve(this.el.nativeElement);
                window.cancelAnimationFrame(this.animationFrameID);
            }
            this.dispose();
        };
        NgxEchartsDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this.initChart(); });
        };
        NgxEchartsDirective.prototype.dispose = function () {
            if (this.chart) {
                if (!this.chart.isDisposed()) {
                    this.chart.dispose();
                }
                this.chart = null;
            }
        };
        /**
         * resize chart
         */
        NgxEchartsDirective.prototype.resize = function () {
            if (this.chart) {
                this.chart.resize();
            }
        };
        NgxEchartsDirective.prototype.toggleLoading = function (loading) {
            if (this.chart) {
                loading
                    ? this.chart.showLoading(this.loadingType, this.loadingOpts)
                    : this.chart.hideLoading();
            }
        };
        NgxEchartsDirective.prototype.setOption = function (option, opts) {
            if (this.chart) {
                try {
                    this.chart.setOption(option, opts);
                }
                catch (e) {
                    console.error(e);
                    this.optionsError.emit(e);
                }
            }
        };
        /**
         * dispose old chart and create a new one.
         */
        NgxEchartsDirective.prototype.refreshChart = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.dispose();
                            return [4 /*yield*/, this.initChart()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NgxEchartsDirective.prototype.createChart = function () {
            var _this = this;
            var dom = this.el.nativeElement;
            if (window && window.getComputedStyle) {
                var prop = window.getComputedStyle(dom, null).getPropertyValue('height');
                if ((!prop || prop === '0px') && (!dom.style.height || dom.style.height === '0px')) {
                    dom.style.height = '400px';
                }
            }
            // here a bit tricky: we check if the echarts module is provided as function returning native import('...') then use the promise
            // otherwise create the function that imitates behaviour above with a provided as is module
            return this.ngZone.runOutsideAngular(function () {
                var load = typeof _this.echarts === 'function' ? _this.echarts : function () { return Promise.resolve(_this.echarts); };
                return load().then(function (_a) {
                    var init = _a.init;
                    return init(dom, _this.theme, _this.initOpts);
                });
            });
        };
        NgxEchartsDirective.prototype.initChart = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.onOptionsChange(this.options)];
                        case 1:
                            _a.sent();
                            if (this.merge && this.chart) {
                                this.setOption(this.merge);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        NgxEchartsDirective.prototype.onOptionsChange = function (opt) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!opt) {
                                return [2 /*return*/];
                            }
                            if (!this.chart) return [3 /*break*/, 1];
                            this.setOption(this.options, true);
                            return [3 /*break*/, 3];
                        case 1:
                            _a = this;
                            return [4 /*yield*/, this.createChart()];
                        case 2:
                            _a.chart = _b.sent();
                            this.chartInit.emit(this.chart);
                            this.setOption(this.options, true);
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // allows to lazily bind to only those events that are requested through the `@Output` by parent components
        // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
        NgxEchartsDirective.prototype.createLazyEvent = function (eventName) {
            var _this = this;
            return this.chartInit.pipe(operators.switchMap(function (chart) { return new rxjs.Observable(function (observer) {
                chart.on(eventName, function (data) { return _this.ngZone.run(function () { return observer.next(data); }); });
                return function () {
                    if (_this.chart) {
                        if (!_this.chart.isDisposed()) {
                            chart.off(eventName);
                        }
                    }
                };
            }); }));
        };
        return NgxEchartsDirective;
    }());
    NgxEchartsDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'echarts, [echarts]',
                    exportAs: 'echarts',
                },] }
    ];
    NgxEchartsDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [NGX_ECHARTS_CONFIG,] }] },
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    NgxEchartsDirective.propDecorators = {
        options: [{ type: core.Input }],
        theme: [{ type: core.Input }],
        loading: [{ type: core.Input }],
        initOpts: [{ type: core.Input }],
        merge: [{ type: core.Input }],
        autoResize: [{ type: core.Input }],
        loadingType: [{ type: core.Input }],
        loadingOpts: [{ type: core.Input }],
        chartInit: [{ type: core.Output }],
        optionsError: [{ type: core.Output }],
        chartClick: [{ type: core.Output }],
        chartDblClick: [{ type: core.Output }],
        chartMouseDown: [{ type: core.Output }],
        chartMouseMove: [{ type: core.Output }],
        chartMouseUp: [{ type: core.Output }],
        chartMouseOver: [{ type: core.Output }],
        chartMouseOut: [{ type: core.Output }],
        chartGlobalOut: [{ type: core.Output }],
        chartContextMenu: [{ type: core.Output }],
        chartLegendSelectChanged: [{ type: core.Output }],
        chartLegendSelected: [{ type: core.Output }],
        chartLegendUnselected: [{ type: core.Output }],
        chartLegendScroll: [{ type: core.Output }],
        chartDataZoom: [{ type: core.Output }],
        chartDataRangeSelected: [{ type: core.Output }],
        chartTimelineChanged: [{ type: core.Output }],
        chartTimelinePlayChanged: [{ type: core.Output }],
        chartRestore: [{ type: core.Output }],
        chartDataViewChanged: [{ type: core.Output }],
        chartMagicTypeChanged: [{ type: core.Output }],
        chartPieSelectChanged: [{ type: core.Output }],
        chartPieSelected: [{ type: core.Output }],
        chartPieUnselected: [{ type: core.Output }],
        chartMapSelectChanged: [{ type: core.Output }],
        chartMapSelected: [{ type: core.Output }],
        chartMapUnselected: [{ type: core.Output }],
        chartAxisAreaSelected: [{ type: core.Output }],
        chartFocusNodeAdjacency: [{ type: core.Output }],
        chartUnfocusNodeAdjacency: [{ type: core.Output }],
        chartBrush: [{ type: core.Output }],
        chartBrushEnd: [{ type: core.Output }],
        chartBrushSelected: [{ type: core.Output }],
        chartRendered: [{ type: core.Output }],
        chartFinished: [{ type: core.Output }]
    };

    var NgxEchartsModule = /** @class */ (function () {
        function NgxEchartsModule() {
        }
        NgxEchartsModule.forRoot = function (config) {
            return {
                ngModule: NgxEchartsModule,
                providers: [{ provide: NGX_ECHARTS_CONFIG, useValue: config }],
            };
        };
        NgxEchartsModule.forChild = function () {
            return {
                ngModule: NgxEchartsModule,
            };
        };
        return NgxEchartsModule;
    }());
    NgxEchartsModule.decorators = [
        { type: core.NgModule, args: [{
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

    exports.NGX_ECHARTS_CONFIG = NGX_ECHARTS_CONFIG;
    exports.NgxEchartsDirective = NgxEchartsDirective;
    exports.NgxEchartsModule = NgxEchartsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-echarts.umd.js.map
