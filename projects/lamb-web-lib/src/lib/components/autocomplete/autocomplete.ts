import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, fromEvent, Subscription, BehaviorSubject } from 'rxjs';
// import { letProto } from 'rxjs/operator/let';
// import { _do } from 'rxjs/operator/do';
import { switchMap, tap, map } from 'rxjs/operators';
import { positionElements, PlacementArray } from './util/positioning';
import { LambAutocompleteWindowComponent, ResultTemplateContext } from './autocomplete-window';
import { PopupService } from './util/popup';
import { toString, isDefined } from './util/util';
import { LiveService } from './util/accessibility/live.service';
import { LambAutocompleteConfig } from './autocomplete-config';

enum Key {
    Tab = 9,
    Enter = 13,
    Escape = 27,
    ArrowUp = 38,
    ArrowDown = 40,
}

// const LAMB_AUTOCOMPLETE_VALUE_ACCESSOR = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => LambAutocompleteDirective),
//     multi: true,
// };


/**
 * Payload of the selectItem event.
 */
export interface LambAutocompleteSelectItemEvent {
    /**
     * An item about to be selected
     */
    item: any;

    /**
     * Function that will prevent item selection if called
     */
    preventDefault: () => void;
}

let nextWindowId = 0;

/**
 * LambAutocomplete directive provides a simple way of creating powerful autocompletes from any text input
 */
@Directive({
    selector: 'input[lambAutocomplete]',
    exportAs: 'lambAutocomplete',
    host: {
        '(blur)': 'handleBlur()',
        '[class.open]': 'isPopupOpen()',
        '(document:click)': 'onDocumentClick($event)',
        '(keydown)': 'handleKeyDown($event)',
        'autocomplete': 'off',
        'autocapitalize': 'off',
        'autocorrect': 'off',
        'role': 'combobox',
        'aria-multiline': 'false',
        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
        '[attr.aria-activedescendant]': 'activeDescendant',
        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
        '[attr.aria-expanded]': 'isPopupOpen()',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LambAutocompleteDirective),
            multi: true,
        },
    ],
})
export class LambAutocompleteDirective implements ControlValueAccessor,
    OnInit, OnDestroy {
    private _popupService: PopupService<LambAutocompleteWindowComponent>;
    private _subscription: Subscription;
    private _inputValueBackup: string;
    private _valueChanges: Observable<string>;
    private _resubscribeAutocomplete: BehaviorSubject<any>;
    private _windowRef: ComponentRef<LambAutocompleteWindowComponent>;
    private _zoneSubscription: any;


    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     */
    @Input() container: string;

    /**
     * A flag indicating if model values should be restricted to the ones selected from the popup only.
     */
    @Input() editable: boolean;

    /**
     * A flag indicating if the first match should automatically be focused as you type.
     */
    @Input() focusFirst: boolean;

    /**
     * A function to convert a given value into string to display in the input field
     */
    @Input() inputFormatter: (value: any) => string;

    /**
     * A function to transform the provided observable text into the array of results.  Note that the "this" argument
     * is undefined so you need to explicitly bind it to a desired "this" target.
     */
    @Input() lambAutocomplete: (text: Observable<string>) => Observable<any[]>;

    /**
     * A function to format a given result before display. This function should return a formatted string without any
     * HTML markup
     */
    @Input() resultFormatter: (value: any) => string;

    /**
     * A template to override a matching result default display
     */
    @Input() resultTemplate: TemplateRef<ResultTemplateContext>;

    /**
     * Show hint when an option in the result list matches.
     */
    @Input() showHint: boolean;

    /** Placement of a autocomplete accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
    */
    @Input() placement: PlacementArray = 'bottom-left';

    /**
     * An event emitted when a match is selected. Event payload is of type LambAutocompleteSelectItemEvent.
     */
    @Output() selectItem = new EventEmitter<LambAutocompleteSelectItemEvent>();

    activeDescendant: string;
    popupId = `lamb-autocomplete-${nextWindowId++}`;

    private _onTouched = () => { };
    private _onChange = (_: any) => { };

    constructor(
        private _elementRef: ElementRef,
        _viewContainerRef: ViewContainerRef,
        private _renderer: Renderer2,
        _injector: Injector,
        componentFactoryResolver: ComponentFactoryResolver,
        config: LambAutocompleteConfig,
        ngZone: NgZone,
        private _live: LiveService,
    ) {
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;

        this._valueChanges = fromEvent<Event>(_elementRef.nativeElement, 'input')
            .pipe(map($event => ($event.target as HTMLInputElement).value));

        this._resubscribeAutocomplete = new BehaviorSubject(null);

        this._popupService = new PopupService<LambAutocompleteWindowComponent>(
            LambAutocompleteWindowComponent, _injector, _viewContainerRef, _renderer, componentFactoryResolver);

        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this.isPopupOpen()) {
                positionElements(
                    this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
                    this.container === 'body');
            }
        });
    }

    ngOnInit(): void {
        const inputValues$ = this._valueChanges.pipe(tap(value => {
            this._inputValueBackup = value;
            if (this.editable) {
                this._onChange(value);
            }
        }));
        // const results$ = letProto.call(inputValues$, this.lambAutocomplete);
        const results$ = inputValues$.pipe(this.lambAutocomplete);
        const processedResults$ = results$.pipe(tap(() => {
            if (!this.editable) {
                this._onChange(undefined);
            }
        }));
        // const userInput$ = switchMap.call(this._resubscribeAutocomplete, () => processedResults$);
        const userInput$ = this._resubscribeAutocomplete.pipe(switchMap(() => processedResults$));
        this._subscription = this._subscribeToUserInput(userInput$);
    }

    ngOnDestroy(): void {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }

    registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

    registerOnTouched(fn: () => any): void { this._onTouched = fn; }

    writeValue(value) { this._writeInputValue(this._formatItemForInput(value)); }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }

    onDocumentClick(event) {
        if (event.target !== this._elementRef.nativeElement) {
            this.dismissPopup();
        }
    }

    /**
     * Dismisses typeahead popup window
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._closePopup();
            this._writeInputValue(this._inputValueBackup);
        }
    }

    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen() { return this._windowRef != null; }

    handleBlur() {
        this._resubscribeAutocomplete.next(null);
        this._onTouched();
    }

    handleKeyDown(event: KeyboardEvent) {
        if (!this.isPopupOpen()) {
            return;
        }

        if (Key[toString(event.which)]) {
            switch (event.which) {
                case Key.ArrowDown:
                    event.preventDefault();
                    this._windowRef.instance.next();
                    this._showHint();
                    break;
                case Key.ArrowUp:
                    event.preventDefault();
                    this._windowRef.instance.prev();
                    this._showHint();
                    break;
                case Key.Enter:
                case Key.Tab:
                    const result = this._windowRef.instance.getActive();
                    if (isDefined(result)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this._selectResult(result);
                    }
                    this._closePopup();
                    break;
                case Key.Escape:
                    event.preventDefault();
                    this._resubscribeAutocomplete.next(null);
                    this.dismissPopup();
                    break;
            }
        }
    }

    private _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent
                .subscribe((result: any) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent
                .subscribe((activeId: string) => this.activeDescendant = activeId);

            if (this.container === 'body') {
                window.document.querySelector(this.container)
                    .appendChild(this._windowRef.location.nativeElement);
            }
        }
    }

    private _closePopup() {
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    }

    private _selectResult(result: any) {
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
        this._resubscribeAutocomplete.next(null);

        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }

    private _selectResultClosePopup(result: any) {
        this._selectResult(result);
        this._closePopup();
    }

    private _showHint() {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());

            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(
                    this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            } else {
                this.writeValue(this._windowRef.instance.getActive());
            }
        }
    }

    private _formatItemForInput(item: any): string {
        return item && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }

    private _writeInputValue(value: string): void {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }

    private _subscribeToUserInput(userInput$: Observable<any[]>): Subscription {
        return userInput$.subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            } else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();

                this._showHint();
            }
            const count = results.length;
            this._live
                .say(count === 0 ? 'No hay resultador disponibles'
                    : `${count} resultado${count === 1 ? '' : 's'} disponible`);
        });
    }

    private _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
