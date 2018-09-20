import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from '@angular/core';

import { toString } from './util/util';

/**
 * Context for the autocomplete result template in case you want to override the default one
 */
export interface ResultTemplateContext {
  /**
   * Your autocomplete result data model
   */
  result: any;

  /**
   * Search term from the input used to get current result
   */
  term: string;
}

@Component({
  selector: 'lamb-autocomplete-window',
  exportAs: 'lambAutocompleteWindow',
  host: {
    'class': 'dropdown-menu',
    'style': 'display: block; overflow-y: scroll; max-height: 20rem',
    'role': 'listbox',
    '[id]': 'id',
  },
  template: `
    <ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
      <lamb-highlight [result]="formatter(result)" [term]="term"></lamb-highlight>
    </ng-template>
    <ng-template ngFor [ngForOf]="results" let-result let-idx="index">
      <button type="button" class="dropdown-item" role="option"
        [id]="id + '-' + idx"
        [class.active]="idx === activeIdx"
        (mouseenter)="markActive(idx)"
        (click)="select(result)">
          <ng-template [ngTemplateOutlet]="resultTemplate || rt"
          [ngTemplateOutletContext]="{result: result, term: term, formatter: formatter}"></ng-template>
      </button>
    </ng-template>
  `,
})
export class LambAutocompleteWindowComponent implements OnInit {
  activeIdx = 0;

  /**
   *  The id for the autocomplete widnow. The id should be unique and the same
   *  as the associated autocomplete's id.
   */
  @Input() id: string;

  /**
   * Flag indicating if the first row should be active initially
   */
  @Input() focusFirst = true;

  /**
   * Autocomplete match results to be displayed
   */
  @Input() results;

  /**
   * Search term used to get current results
   */
  @Input() term: string;

  /**
   * A function used to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() formatter = toString;

  /**
   * A template to override a matching result default display
   */
  @Input() resultTemplate: TemplateRef<ResultTemplateContext>;

  /**
   * Event raised when user selects a particular result row
   */
  // @Output('select') selectEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  // @Output('activeChange') activeChangeEvent = new EventEmitter();
  @Output() activeChangeEvent = new EventEmitter();

  hasActive() { return this.activeIdx > -1 && this.activeIdx < this.results.length; }

  getActive() { return this.results[this.activeIdx]; }

  markActive(activeIdx: number) {
    this.activeIdx = activeIdx;
    this._activeChanged();
  }

  next() {
    if (this.activeIdx === this.results.length - 1) {
      this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
    } else {
      this.activeIdx++;
    }
    this._activeChanged();
  }

  prev() {
    if (this.activeIdx < 0) {
      this.activeIdx = this.results.length - 1;
    } else if (this.activeIdx === 0) {
      this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
    } else {
      this.activeIdx--;
    }
    this._activeChanged();
  }

  resetActive() {
    this.activeIdx = this.focusFirst ? 0 : -1;
    this._activeChanged();
  }

  select(item) { this.selectEvent.emit(item); }

  ngOnInit() {
    this.activeIdx = this.focusFirst ? 0 : -1;
    this._activeChanged();
  }

  private _activeChanged() {
    this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
  }
}
