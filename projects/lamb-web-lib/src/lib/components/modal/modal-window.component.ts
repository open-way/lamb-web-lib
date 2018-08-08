import {
  Component, OnInit, OnDestroy,
  AfterViewInit, Input, Output, EventEmitter,
  Inject,
  ElementRef,
  Renderer2,
  HostBinding,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalDismissReasons } from './modal-dismiss-reasons';
import { lambFocusTrap } from './util/focus-trap';

@Component({
  selector: 'lamb-modal-window',
  template: `
    <div
      [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '')"
      role="document">
      <div class="modal-content"><ng-content></ng-content></div>
    </div>
  `,
  host: {
    // '[class]': '"modal fade show" + (windowClass ? " " + windowClass : "")',
    'role': 'dialog',
    'tabindex': '-1',
    'style': 'display: block;',
    // '(keyup.esc)': 'escKey($event)',
    // '(click)': 'backdropClick($event)',
  },
})
export class LambModalWindowComponent implements OnInit, AfterViewInit, OnDestroy {
  private _document: any;
  private _elWithFocus: Element; // elemento que se enfoca antes de la apertura modal

  @Input() backdrop: boolean | string = true;
  @Input() keyboard = true;
  @Input() size: string;
  @Input() centered: boolean;
  @Input() windowClass: string;
  @Output() dismissEvent = new EventEmitter<any>();

  @HostBinding('class')
  get modalClass() { return 'modal fade show d-block' + (this.windowClass ? ' ' + this.windowClass : ''); }
  // @HostBinding('attr.role')
  // public role = 'dialog';
  // @HostBinding('attr.tabindex')
  // public tabindex = '-1';
  // @HostBinding('attr.style')
  // public style = 'display: block;';

  constructor(@Inject(DOCUMENT) document, private _elRef: ElementRef, private _renderer: Renderer2) {
    this._document = document;
    lambFocusTrap(this._elRef.nativeElement, this.dismissEvent);
  }

  @HostListener('click', ['$event'])
  public backdropClick($event): void {
    if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
      this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
    }
  }

  @HostListener('keyup.esc', ['$event'])
  public escKey($event): void {
    if (this.keyboard && !$event.defaultPrevented) {
      this.dismiss(ModalDismissReasons.ESC);
    }
  }

  public dismiss(reason): void { this.dismissEvent.emit(reason); }

  ngOnInit() {
    this._elWithFocus = this._document.activeElement;
    this._renderer.addClass(this._document.body, 'modal-open');
  }

  ngAfterViewInit() {
    if (!this._elRef.nativeElement.contains(document.activeElement)) {
      this._elRef.nativeElement['focus'].apply(this._elRef.nativeElement, []);
    }
  }

  ngOnDestroy() {
    const body = this._document.body;
    const elWithFocus = this._elWithFocus;

    let elementToFocus;
    if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
      elementToFocus = elWithFocus;
    } else {
      elementToFocus = body;
    }
    elementToFocus['focus'].apply(elementToFocus, []);

    this._elWithFocus = null;
    this._renderer.removeClass(body, 'modal-open');
  }
}
