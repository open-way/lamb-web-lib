import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LambHighlightComponent } from './highlight';
import { LambAutocompleteWindowComponent } from './autocomplete-window';
import { LambAutocompleteDirective } from './autocomplete';
import { LambAutocompleteConfig } from './autocomplete-config';
import {
    LiveService, ARIA_LIVE_DELAY,
    DEFAULT_ARIA_LIVE_DELAY,
} from './util/accessibility/live.service';

export { LambHighlightComponent } from './highlight';
export { LambAutocompleteWindowComponent } from './autocomplete-window';
export { LambAutocompleteConfig } from './autocomplete-config';
export { LambAutocompleteDirective, LambAutocompleteSelectItemEvent } from './autocomplete';

@NgModule({
    declarations: [
        LambAutocompleteDirective,
        LambHighlightComponent,
        LambAutocompleteWindowComponent,
    ],
    exports: [
        LambAutocompleteDirective,
        LambHighlightComponent,
    ],
    imports: [
        CommonModule,
    ],
    entryComponents: [
        LambAutocompleteWindowComponent,
    ],
    providers: [
        LambAutocompleteConfig,
        LiveService,
        {
            provide: ARIA_LIVE_DELAY,
            useValue: DEFAULT_ARIA_LIVE_DELAY,
        },
    ],
})
export class LambAutocompleteModule { }
