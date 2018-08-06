# LambWebLib

LambWebLib. Es un proyecto angular de tipo Librería. que contiene una Suit de componentes reutilizables para el proyecto [Lamb Financial](https://lamb.upeu.edu.pe).

## Demo
[Demo](https://lamb.upeu.edu.pe)

## Requisitos
* Angular versión 6.0.0
* Bootstrap Versión 4.0.0

## Instalación
Tu puedes instalar el paquete con `npm` con el siguiente comando.

```shell
npm install lamb-web-lib
```
Luego agregar el módulo del componente que deseas utilizar en el `AppModule` o `xModule` de tu aplicación.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonIconModule, LambWebLibModule } from 'lamb-web-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    LambWebLibModule,
    ButtonIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
y ya podras utilizarlo en tu componente html.
```html
<lamb-lamb-web-lib></lamb-lamb-web-lib>

<lamb-button-icon></lamb-button-icon>
```

## Colaboradores.


## Autor

* [Vitmar J. Aliaga Cruz](https://github.com/valiaga).

## Licencia

Este proyecto esta bajo la licencia MIT.
