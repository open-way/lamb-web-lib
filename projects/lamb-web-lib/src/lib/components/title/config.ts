import { InjectionToken } from '@angular/core';

export interface GlobalConfig {
    appName: string;
}

export const DefaultGlobalConfig: GlobalConfig = {
    appName: 'Mi Aplicación!',
};

export interface TitleToken {
    default: GlobalConfig;
    config: Partial<GlobalConfig>;
}

export const LAMB_TITLE_CONFIG = new InjectionToken<TitleToken>('Configuración del Título');
