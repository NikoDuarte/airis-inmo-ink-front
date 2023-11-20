import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api/api.service';
import { ModalComponent } from 'src/app/components/dash/modal/modal.component';
import { _mapa_direccion, _mapa_info } from 'src/app/interfaces/interfaces';
import { EmmitersService } from 'src/app/services/emmiters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
  ]
})
export class ComprasComponent implements OnInit{

  public displayedColumns: string[] = ['idx', 'name_inmueble', 'price', 'opt'];
  public dataSource!: any

  constructor(
    private api_services: ApiService,
    private modalService: NgbModal,
    private emmiter_service: EmmitersService
  ) {}

  ngOnInit(): void {
    this.loadInmueblesAll()
    this.emmiter_service.$emmiterLoadInfoInmuebles.subscribe(() => this.loadInmueblesAll())
  }

  loadInmueblesAll() {
    this.api_services.viewAllInmuebles().subscribe(
      ({data}: any) => {
        this.dataSource = data
        const ubi_map: _mapa_info[] = data.map(
          (elt: any) => {
            return {
              lat: Number(elt.lat),
              lon: Number(elt.lon),
              name: elt.name_inmueble,
              direccion: elt.address,
              description: elt.description,
              color: '#000000'
            }
          }
        )
        this.emmiter_service.$emmiterMapa.emit(ubi_map)
      }
    )
  }

  openModal(is_edit: boolean, id_inmueble?: number) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'md' });
    modalRef.componentInstance.title = `${ is_edit === true ? 'Editar inmueble inmueble' : 'Crear un inmueble' }`
    modalRef.componentInstance.is_edit = is_edit
    modalRef.componentInstance.id_inmueble = id_inmueble
  }


  deleteInmuelbe(inmueble: any) {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar a ${inmueble.name_inmueble}?`,
      text: ``,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api_services.deleteInmueble(inmueble.id_inmueble).subscribe(
          ({ msg }: any) => {
            Swal.fire('Exito!', msg, 'success')
            this.emmiter_service.$emmiterLoadInfoInmuebles.emit(true)
          }
        )
      }
    })
  }

}
