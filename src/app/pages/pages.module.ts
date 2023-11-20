import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PagesComponent,
    ComprasComponent,
    VentasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class PagesModule { }
