import { ModuleWithProviders } from '@angular/core';
import { NgxEchartsDirective, NgxEchartsConfig, NGX_ECHARTS_CONFIG } from './ngx-echarts.directive';
export declare class NgxEchartsModule {
    static forRoot(config: NgxEchartsConfig): ModuleWithProviders<NgxEchartsModule>;
    static forChild(): {
        ngModule: typeof NgxEchartsModule;
    };
}
export { NgxEchartsDirective, NGX_ECHARTS_CONFIG };
