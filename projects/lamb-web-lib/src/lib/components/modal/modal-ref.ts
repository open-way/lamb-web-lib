import { ComponentRef } from '@angular/core';
import { LambModalBackdropComponent } from './modal-backdrop.component';
import { LambModalWindowComponent } from './modal-window.component';
import { ContentRef } from './util/popup';

/**
 * Una referencia a un modal activo (actualmente abierto). Instancias de esta clase
 * puede ser inyectado en componentes pasados ​​como contenido modal.
 */
export class LambActiveModal {
    /**
     * Se puede usar para cerrar un modal, pasando un resultado opcional.
     *  @param reason rasultado.
     */
    close(result?: any): void { }

    /**
     * Se puede usar para descartar un modal, pasando un motivo opcional.
     * @param reason razon por que se descarto.
     */
    dismiss(reason?: any): void { }
}

/**
 * Una referencia a un modal recientemente abierto.
 */
export class LambModalRef {
    private resolve: (result?: any) => void;
    private reject: (reason?: any) => void;

    /**
     * La instancia de componente utilizada como contenido modal.
     * Indefinido cuando se utiliza un TemplateRef como contenido modal.
     */
    get componentInstance(): any {
        if (this.contentRef.componentRef) {
            return this.contentRef.componentRef.instance;
        }
    }

    // solo es necesario para mantener la compatibilidad con TS1.8
    set componentInstance(instance: any) { }

    /**
     * Una promesa que se resuelve cuando se cierra un modal y se rechaza cuando se desestima un modal.
     */
    result: Promise<any>;

    constructor(
        private windowComponentRef: ComponentRef<LambModalWindowComponent>,
        private contentRef: ContentRef,
        private backdropComponentRef?: ComponentRef<LambModalBackdropComponent>,
        private beforeDismiss?: Function,
    ) {
        windowComponentRef.instance.dismissEvent.subscribe((reason: any) => { this.dismiss(reason); });

        this.result = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.result.then(null, () => { });
    }

    /**
     * Se puede usar para cerrar un modal, pasando un resultado opcional.
     * @param result
     */
    close(result?: any): any {

        if (this.windowComponentRef) {
            this.resolve(result);
            this.removeModalElements();
        }
    }

    /**
     * Se puede usar para descartar un modal, pasando un motivo opcional.
     * @param reason
     */
    dismiss(reason?: any): void {
        // console.log('reason');
        // console.log(reason);

        if (this.windowComponentRef) {
            if (!this.beforeDismiss || this.beforeDismiss() !== false) {
                this.reject(reason);
                this.removeModalElements();
            }
        }
    }

    private removeModalElements() {
        const windowNativeEl = this.windowComponentRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this.windowComponentRef.destroy();

        if (this.backdropComponentRef) {
            const backdropNativeEl = this.backdropComponentRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this.backdropComponentRef.destroy();
        }

        if (this.contentRef && this.contentRef.viewRef) {
            this.contentRef.viewRef.destroy();
        }

        this.windowComponentRef = null;
        this.backdropComponentRef = null;
        this.contentRef = null;
    }
}
