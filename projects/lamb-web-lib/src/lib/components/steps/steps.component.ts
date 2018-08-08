
/**
 * @license
 * Copyright Lamb Team. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
    Component, Input, QueryList,
    Directive, ContentChild,
    ContentChildren, TemplateRef, AfterContentChecked,
    Output, EventEmitter, OnInit, OnDestroy,
} from '@angular/core';
import { LambStepConfig, ConfigNames } from './step-config';
import { slideOfRight } from './animations/slide-of-right.animation';

@Directive({
    selector: 'ng-template[lambStepTitle]',
})
export class LambStepTitleDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: 'ng-template[lambStepContent]',
})
export class LambStepContentDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}

let nextId = 0;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'lamb-step',
})
export class LambStepDirective {

    @Input() id = `lamb-step-${nextId++}`;

    @Input() title: string;

    @Input() icon: string;

    /**
     * Guarda Cualquier dato. Creado por el Equipo Lamb.
     */
    @Input() data: any;

    @Input() disabled = false;
    // @Input() disabled = true;

    public isValidStep = true;
    // public isValidStep: boolean = false;

    @Input()
    set validStep(value: string | boolean) {
        this.isValidStep = (value === 'true' || value === true) ? true : false;
    }

    @ContentChild(LambStepContentDirective) contentTemplate: LambStepContentDirective;
    @ContentChild(LambStepTitleDirective) titleTemplate: LambStepTitleDirective;
}

export interface LambStepChangeEvent {
    /**
     * Id de la pestaña actualmente activa.
     */
    activeId: string;

    /**
     * Id de la pestaña recién seleccionada.
     */
    nextId: string;

    /**
     * data guardada en la pestaña actualmente activa.
     */
    activeData: any;

    /**
     * Función que evitará el cambio de pertaña si se llama.
     */
    preventDefault: () => void;

}

@Component({
    selector: 'lamb-step-group',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss'],
    // animations: [Animations.slideInOut, Animations.slideOfRight],
    animations: [slideOfRight],
})

export class LambStepGroupComponent implements OnInit, AfterContentChecked, OnDestroy {
    justifyClass: string;
    public hideContent = false;

    @ContentChildren(LambStepDirective) steps: QueryList<LambStepDirective>;

    /**
     * Id del step que saldrá activado por defecto.
     */
    @Input() activeId: string;
    /**
     * Personalizar el nombre 'Anterior | siguiente y Finalizar'
     * Formato de variable : objecto
     * Ej. configNames: object = {buttonBack: 'Regresar', buttonNext: 'Grabar', buttonFinish: 'Fin'}
     */
    public iConfigNames: ConfigNames;
    @Input()
    set configNames(confign: ConfigNames) {
        this.iConfigNames.buttonBack = confign.buttonBack || this.iConfigNames.buttonBack;
        this.iConfigNames.buttonNext = confign.buttonNext || this.iConfigNames.buttonNext;
        this.iConfigNames.buttonFinish = confign.buttonFinish || this.iConfigNames.buttonFinish;
    }

    /**
     * Cuando cambia de step se destruira el contenido anterior o solo se oculatará?
     */
    // @Input() destroyOnHide: boolean = true;
    @Input() destroyOnHide = false;

    /**
     * Emite cuando hay cambios de steps.
     */
    @Output() stepChange = new EventEmitter<LambStepChangeEvent>();

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onComplete = new EventEmitter<any>();

    @Input()
    set justify(className: 'start' | 'center' | 'end' | 'fill' | 'justified') {
        if (className === 'fill' || className === 'justified') {
            this.justifyClass = `nav-${className}`;
        } else {
            this.justifyClass = `justify-content-${className}`;
        }
    }

    onSelect(stepId: string) {

        const selectedStep = this.getStepById(stepId);
        const selectedActive = this.getStepById(this.activeId);
        // console.log('selectedStep');
        // console.log(selectedStep);

        if (selectedStep && !selectedStep.disabled && this.activeId !== selectedStep.id) {
            let defaultPrevented = false;
            this.stepChange.emit(
                {
                    activeId: this.activeId,
                    activeData: selectedActive.data || null,
                    nextId: selectedStep.id,
                    preventDefault: () => { defaultPrevented = true; },
                },
            );
            if (!defaultPrevented) {
                this.activeId = selectedStep.id;
            }
        }
    }
    constructor(private config: LambStepConfig) {
        this.type = this.config.type;
        this.justify = this.config.justify;
        this.orientation = this.config.orientation;
        this.iConfigNames = this.config.configNames;
    }
    ngOnInit() {
    }

    // tslint:disable-next-line:member-ordering
    @Input() orientation: 'horizontal' | 'vertical';
    // tslint:disable-next-line:member-ordering
    @Input() type: 'stepss' | 'pills';

    ngAfterContentChecked() {
        const activeStep = this.getStepById(this.activeId);
        this.activeId = activeStep ? activeStep.id : (this.steps.length ? this.steps.first.id : null);
    }

    private getStepById(id: string): LambStepDirective {
        const stepsWithId: LambStepDirective[] = this.steps.filter(step => step.id === id);
        return stepsWithId.length ? stepsWithId[0] : null;
    }

    public back() {
        const back = this.getStepIdSplice(-1);
        this.onSelect(back);
    }
    public next() {
        const next = this.getStepIdSplice(+1);
        this.onSelect(next);
    }

    public complete() {
        this.onComplete.emit();
    }

    private getStepIdSplice(condicion: number) {
        const actual = this.activeId;
        const splice = actual.slice(0, actual.length - 1);
        const index = parseInt(actual.slice((actual.length - 1), actual.length), 10);
        const next = `${splice}${(index + (condicion))}`;
        return next;
    }

    get hidePrevious(): boolean {
        return this.activeId !== 'lamb-step-0';
    }
    get hideNext(): boolean {
        const allLength = (this.steps.length - 1);
        return this.activeId !== 'lamb-step-' + allLength;
    }

    public hideLineRight(stepId) {
        const step = parseInt(stepId.slice(stepId.length - 1, stepId.length), 10);
        return (this.steps.length !== (step + 1));
    }

    public ngOnDestroy() {
        nextId = 0;
    }
}

export const LAMB_STEPS_COMPONENTS = [
    LambStepGroupComponent,
    LambStepDirective,
    LambStepTitleDirective,
    LambStepContentDirective,
];

