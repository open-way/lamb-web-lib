import {
    Injector,
    TemplateRef,
    ViewRef,
    ViewContainerRef,
    Renderer2,
    ComponentRef,
    ComponentFactory,
    ComponentFactoryResolver,
} from '@angular/core';

export class ContentRef {
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) { }
}

export class PopupService<T> {
    private windowFactory: ComponentFactory<T>;
    private windowRef: ComponentRef<T>;
    private contentRef: ContentRef;

    constructor(
        type: any,
        private injector: Injector,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        componentFactoryResolver: ComponentFactoryResolver,
    ) {
        this.windowFactory = componentFactoryResolver.resolveComponentFactory<T>(type);
    }

    open(content?: string | TemplateRef<any>, context?: any): ComponentRef<T> {
        if (!this.windowRef) {
            this.contentRef = this.getContentRef(content, context);
            this.windowRef =
                this.viewContainerRef.createComponent(this.windowFactory, 0, this.injector, this.contentRef.nodes);
        }

        return this.windowRef;
    }

    close() {
        if (this.windowRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.windowRef.hostView));
            this.windowRef = null;

            if (this.contentRef.viewRef) {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.contentRef.viewRef));
                this.contentRef = null;
            }
        }
    }

    private getContentRef(content: string | TemplateRef<any>, context?: any): ContentRef {
        if (!content) {
            return new ContentRef([]);
        } else if (content instanceof TemplateRef) {
            const viewRef = this.viewContainerRef.createEmbeddedView(<TemplateRef<T>>content, context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        } else {
            return new ContentRef([[this.renderer.createText(`${content}`)]]);
        }
    }
}
