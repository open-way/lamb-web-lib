
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
    Component, Input, QueryList,
    Directive, ContentChild, ContentChildren,
    TemplateRef, AfterContentChecked, Output, EventEmitter, OnInit,
} from '@angular/core';
import { LambTabConfig } from './tab-config';

@Directive({
    selector: 'ng-template[lambTabGroupTitle]',
})
export class LambTabGroupTitleDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: 'ng-template[lambTabTitle]',
})
export class LambTabTitleDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: 'ng-template[lambTabContent]',
})
export class LambTabContentDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

let nextId = 0;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'lamb-tab',
})
export class LambTabDirective {

    @Input() id = `lamb-tab-${nextId++}`;

    @Input() title: string;

    @Input() icon: string;

    @Input() disabled = false;

    @ContentChild(LambTabContentDirective) contentTemplate: LambTabContentDirective;
    @ContentChild(LambTabTitleDirective) titleTemplate: LambTabTitleDirective;
}

export interface LambTabChangeEvent {
    /**
     * Id de la pestaña actualmente activa.
     */
    activeId: string;

    /**
     * Id de la pestaña recién seleccionada.
     */
    nextId: string;

    /**
     * Función que evitará el cambio de pertaña si se llama.
     */
    preventDefault: () => void;

}

@Component({
    selector: 'lamb-tab-group',
    exportAs: 'lambTabset',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})

export class LambTabGroupComponent implements OnInit, AfterContentChecked {
    justifyClass: string;
    @ContentChildren(LambTabDirective) tabs: QueryList<LambTabDirective>;
    @ContentChild(LambTabGroupTitleDirective) tabGroupTitle: LambTabGroupTitleDirective;

    /**
     * Id del tab que saldrá activado por defecto.
     */
    @Input() activeId: string;

    /**
     * Id del tab activo.
     */
    // public currentActiveId: string;

    /**
     * Cuando cambia de tab se destruira el contenido anterior o solo se oculatará?
     */
    @Input() destroyOnHide = true;

    /**
     * Emite cuando hay cambios de tabs.
     */
    @Output() tabChange = new EventEmitter<LambTabChangeEvent>();

    @Input()
    set justify(className: 'start' | 'center' | 'end' | 'fill' | 'justified') {
        if (className === 'fill' || className === 'justified') {
            this.justifyClass = `nav-${className}`;
        } else {
            this.justifyClass = `justify-content-${className}`;
        }
    }

    onSelect(tabId: string) {
        const selectedTab = this.getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            let defaultPrevented = false;
            this.tabChange.emit(
                {
                    activeId: this.activeId,
                    nextId: selectedTab.id,
                    preventDefault: () => { defaultPrevented = true; },
                },
            );
            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
                // this.currentActiveId = this.activeId;
            }
        }
    }
    constructor(private config: LambTabConfig) {
        this.type = this.config.type;
        this.justify = this.config.justify;
        this.orientation = this.config.orientation;
    }
    ngOnInit() {
        // this.currentActiveId = this.activeId;
    }

    // tslint:disable-next-line:member-ordering
    @Input() orientation: 'horizontal' | 'vertical';
    // tslint:disable-next-line:member-ordering
    @Input() type: 'tabss' | 'pills';

    ngAfterContentChecked() {
        const activeTab = this.getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
        // this.currentActiveId = this.activeId;
    }

    private getTabById(id: string): LambTabDirective {
        const tabsWithId: LambTabDirective[] = this.tabs.filter(tab => tab.id === id);
        return tabsWithId.length ? tabsWithId[0] : null;
    }
}

export const LAMB_TABS_COMPONENTS = [
    LambTabGroupComponent,
    LambTabDirective,
    LambTabTitleDirective,
    LambTabContentDirective,
    LambTabGroupTitleDirective,
];


