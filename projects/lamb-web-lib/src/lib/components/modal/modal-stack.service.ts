import {
  Injectable, ApplicationRef, Injector,
  Inject, ComponentFactoryResolver, ComponentRef,
  ComponentFactory, TemplateRef, ReflectiveInjector,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LambActiveModal, LambModalRef } from './modal-ref';
import { isDefined, isString } from './util/util';
import { LambModalBackdropComponent } from './modal-backdrop.component';
import { LambModalWindowComponent } from './modal-window.component';
import { ContentRef } from './util/popup';

@Injectable()
export class LambModalStackService {
  private _document: any;
  private _windowAttributes = ['backdrop', 'keyboard', 'centered', 'size', 'windowClass'];

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) document,
  ) {
    this._document = document;
  }

  open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): LambModalRef {
    const containerEl = isDefined(options.container) ?
      this._document.querySelector(options.container) : this._document.body;
    if (!containerEl) {
      throw new Error(`El contenedor modal especificado "${options.container || 'body'}" no fue encontrado en el DOM`);
    }

    const activeModal = new LambActiveModal();
    const contentRef = this.getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);

    const backdropCmptRef: ComponentRef<LambModalBackdropComponent> =
      options.backdrop !== false ? this.attachBackdrop(containerEl) : null;
    const windowCmptRef: ComponentRef<LambModalWindowComponent>
      = this.attachWindowComponent(containerEl, contentRef);
    const lambModalRef: LambModalRef =
      new LambModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);

    activeModal.close = (result: any) => { lambModalRef.close(result); };
    activeModal.dismiss = (reason: any) => { lambModalRef.dismiss(reason); };

    this.applyWindowOptions(windowCmptRef.instance, options);
    return lambModalRef;
  }

  private attachBackdrop(containerEl: any): ComponentRef<LambModalBackdropComponent> {
    const backdropFactory: ComponentFactory<LambModalBackdropComponent> =
      this.componentFactoryResolver.resolveComponentFactory(LambModalBackdropComponent);
    const backdropCmptRef = backdropFactory.create(this.injector);
    this.applicationRef.attachView(backdropCmptRef.hostView);
    containerEl.appendChild(backdropCmptRef.location.nativeElement);
    return backdropCmptRef;
  }

  private attachWindowComponent(containerEl: any, contentRef: any): ComponentRef<LambModalWindowComponent> {
    const windowFactory = this.componentFactoryResolver.resolveComponentFactory(LambModalWindowComponent);
    const windowCmptRef = windowFactory.create(this.injector, contentRef.nodes);
    this.applicationRef.attachView(windowCmptRef.hostView);
    containerEl.appendChild(windowCmptRef.location.nativeElement);
    return windowCmptRef;
  }

  private applyWindowOptions(windowInstance: LambModalWindowComponent, options: Object): void {
    this._windowAttributes.forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        windowInstance[optionName] = options[optionName];
      }
    });
  }

  private getContentRef(
    moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any,
    context: LambActiveModal): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      return this.createFromTemplateRef(content, context);
    } else if (isString(content)) {
      return this.createFromString(content);
    } else {
      return this.createFromComponent(moduleCFR, contentInjector, content, context);
    }
  }

  private createFromTemplateRef(content: TemplateRef<any>, context: LambActiveModal): ContentRef {
    const viewRef = content.createEmbeddedView(context);
    this.applicationRef.attachView(viewRef);
    return new ContentRef([viewRef.rootNodes], viewRef);
  }

  private createFromString(content: string): ContentRef {
    const component = this._document.createTextNode(`${content}`);
    return new ContentRef([[component]]);
  }

  private createFromComponent(
    moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any,
    context: LambActiveModal): ContentRef {
    const contentComponentFactory = moduleCFR.resolveComponentFactory(content);
    const modalContentInjector =
      ReflectiveInjector.resolveAndCreate([{ provide: LambActiveModal, useValue: context }], contentInjector);
    const componentRef = contentComponentFactory.create(modalContentInjector);
    this.applicationRef.attachView(componentRef.hostView);
    return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
  }
}
