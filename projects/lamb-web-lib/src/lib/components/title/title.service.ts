import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalConfig, LAMB_TITLE_CONFIG, TitleToken } from './config';

@Injectable()
export class LambTitleService {
    public titleConfig: GlobalConfig;

    constructor(private titleService: Title,
        @Inject(LAMB_TITLE_CONFIG) protected config: TitleToken) {
        this.titleConfig = {
            ...config.default,
            ...config.config,
        };
    }

    public getTitle(): string {
        return this.titleService.getTitle();
    }
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle ? `${newTitle} | ${this.titleConfig.appName}` : this.titleConfig.appName);
    }
}
