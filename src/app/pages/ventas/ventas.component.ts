import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit{

  public displayedColumns: string[] = ['mes', 'total_inmueble', 'total_price'];
  public dataSource!: any

  constructor(
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loadInformeVentas()
  }

  loadInformeVentas() {
    this.api.viewInformeVentas().subscribe(
      ({data}: any) => {
        const data_table = data.map(
          (elt: any) => {
            return {
              mes: elt.mes_nombre,
              total_inmueble: elt.total_inmuebles_mes,
              total_price: elt.suma_precios_usuario
            }
          }
        )
        this.dataSource = data_table
      }
    )
  }

}
