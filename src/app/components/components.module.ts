import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './dash/menu/menu.component';
import { FooterComponent } from './dash/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MapaComponent } from './dash/mapa/mapa.component';
import { ModalComponent } from './dash/modal/modal.component';
import { FormInmuebleComponent } from './dash/modal/form-inmueble/form-inmueble.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { InfoInmuebleComponent } from './dash/modal/info-inmueble/info-inmueble.component';



@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    MapaComponent,
    ModalComponent,
    FormInmuebleComponent,
    InfoInmuebleComponent
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
