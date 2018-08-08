import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { LambModalStackService } from './modal-stack.service';
import { LambModalRef } from './modal-ref';

/**
 * Represente las opciones disponibles al abrir nuevas ventanas modales.
 */
export interface LambModalOptions {
  /**
   * Si se debe crear un elemento de fondo para un modal dado (verdadero de manera predeterminada).
   * Alternativamente, especifique 'estático' para un fondo que no cierre el modal al hacer clic.
   */
  backdrop?: boolean | 'static';

  /**
   * Función llamada cuando un modal será descartado.
   * Si esta función devuelve falso, el modal no se descarta.
   */
  beforeDismiss?: () => boolean;

  /**
   * Un elemento para adjuntar ventanas modales recién abiertas.
   */
  container?: string;

  /**
   * Inyector para usar para el contenido modal.
   */
  injector?: Injector;

  /**
   * Si se cierra el modal cuando se presiona la tecla de escape (verdadero de manera predeterminada).
   */
  keyboard?: boolean;

  /**
   * Tamaño de una nueva ventana modal.
   */
  size?: 'sm' | 'lg';

  /**
   * Clase personalizada para agregar a la ventana modal
   */
  windowClass?: string;

  /**
   * Si el modal estara centrado.
   */
  centered?: boolean;
}

/**
 * Un servicio para abrir ventanas modales
 * Crear un modal es sencillo: crear una plantilla y pasarla como argumento para
 * el método "abierto"!
 */
@Injectable()
export class LambModalService {

  constructor(private moduleCFR: ComponentFactoryResolver,
    private injector: Injector,
    private lambModalStackService: LambModalStackService) { }

  /**
   * Abre una nueva ventana modal con el contenido especificado y usando las opciones provistas.
   * El contenido puede ser proporcionado
   * como un TemplateRef o un tipo de componente.
   * Si pasa un tipo de componente como contenido que las instancias de aquellos
   * los componentes se pueden inyectar con una instancia de la clase NgbActiveModal.
   * Puedes usar métodos en
   * Clase LambActiveModal para close / dismiss modales del "inside" de un componente.
   * @param content
   * @param options
   */
  open(content: any, options: LambModalOptions = {}): LambModalRef {
    return this.lambModalStackService.open(this.moduleCFR, this.injector, content, options);
  }
}
