import { NgModule, ModuleWithProviders } from '@angular/core';
import { LambTitleService } from './title.service';
import { GlobalConfig, LAMB_TITLE_CONFIG, DefaultGlobalConfig } from './config';

export { LambTitleService } from './title.service';

@NgModule({
    providers: [
        // LambTitleService,
    ],
})
export class LambTitleModule {
    static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders {
        return {
            ngModule: LambTitleModule,
            providers: [
                LambTitleService,
                {
                    provide: LAMB_TITLE_CONFIG,
                    useValue: {
                        default: DefaultGlobalConfig,
                        config: config,
                    }
                },
            ],
        };
    }
}
