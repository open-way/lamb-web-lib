import { Component, OnInit, Input } from '@angular/core';

/**
 * Reveal fieldset component.
 *
 * @example
 *
 * ```
 * <lamb-fieldset>
 *  Mi Contenido
 * </lamb-fieldset>
 * ```
 * @example
 *
 * ```
 * <lamb-fieldset>
 *   <lamb-fieldset-head>
 *     <lamb-fieldset-icon [icon]="fa fa-home"></lamb-fieldset-icon>
 *     <lamb-fieldset-title>Mi título</lamb-fieldset-title>
 *   </lamb-fieldset-head>
 *     <lamb-fieldset-body>
 *       Mi contenido
 *     </lamb-fieldset-body>
 * </lamb-fieldset>
 * ```
 */
@Component({
    selector: 'lamb-fieldset',
    template: `
    <fieldset class="lamb-fieldset-border">
        <legend class="lamb-legend-border">
            <ng-content select="lamb-fieldset-head"></ng-content>
        </legend>
        <ng-content></ng-content>
        <ng-content select="lamb-fieldset-body"></ng-content>
    </fieldset>
    `,
    styleUrls: ['./fieldset.component.scss'],
})

export class LambFieldsetComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

/**
 * Reveal fieldset head component.
 *
 * @example
 *
 * ```
 * <lamb-fieldset-head>
 *  Mi título
 * </lamb-fieldset-head>
 * ```
 * @example
 *
 * ```
 * <lamb-fieldset-head>
 *   <lamb-fieldset-title> Mi Titulo </lamb-fieldset-title>
 *   <lamb-fieldset-icon icon="fa fa-home"></lamb-fieldset-icon>
 * </lamb-fieldset-head>
 * ```
 */
@Component({
    selector: 'lamb-fieldset-head',
    template: `
        <ng-content></ng-content>
        <ng-content caption="lamb-fieldset-icon" ></ng-content>
        <ng-content caption="lamb-fieldset-title"></ng-content>
    `,
})

export class LambFieldsetHeadComponent {
    constructor() { }
}

/**
 * Reveal fieldset body component.
 *
 * @example
 *
 * ```
 * <lamb-fieldset-body>
 *  Mi Contenido
 * </lamb-fieldset-body>
 * ```
 */
@Component({
    selector: 'lamb-fieldset-body',
    template: `
    <ng-content></ng-content>
    `,
})

export class LambFieldsetBodyComponent {
    constructor() { }
}

/**
 * Reveal fieldset title component.
 *
 * @example
 *
 * ```
 * <lamb-fieldset-title>
 *  Mi Titulo
 * </lamb-fieldset-title>
 * ```
 */
@Component({
    selector: 'lamb-fieldset-title',
    template: `
    <ng-content></ng-content>
    `,
})

export class LambFieldsetTitleComponent {
    constructor() { }
}

/**
 * Reveal fieldset icon component.
 *
 * @example
 *
 * ```
 * <lamb-fieldset-icon icon="fa fa-home"></lamb-fieldset-icon>
 * ```
 */
@Component({
    selector: 'lamb-fieldset-icon',
    template: `
    <span class="{{ icon }} lamb-icon" ></span>
    `,
    styles: [
        `
        .lamb-icon {
            font-size: medium;
            margin-right: 6px;
        }
        `,
    ],
})

export class LambFieldsetIconComponent {
    @Input() icon: string;
    constructor() { }
}

export const LAMB_FIELDSET_COMPONENTS = [
    LambFieldsetComponent,
    LambFieldsetHeadComponent,
    LambFieldsetTitleComponent,
    LambFieldsetBodyComponent,
    LambFieldsetIconComponent,
];
