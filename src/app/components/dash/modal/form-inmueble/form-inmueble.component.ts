import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api/api.service';
import { _inmueble_c, _mapa_direccion } from 'src/app/interfaces/interfaces';
import { EmmitersService } from 'src/app/services/emmiters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-inmueble',
  templateUrl: './form-inmueble.component.html',
  styles: [
  ]
})
export class FormInmuebleComponent implements OnInit{

  public form_inmueble!: FormGroup
  public ubicacion: any[] = []

  @Input() public is_edit: boolean = false
  @Input() public id_inmueble!: number

  constructor(
    private fb: FormBuilder,
    private api_service: ApiService,
    private emmiter_service: EmmitersService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.loadFormInmueble()
    if (this.is_edit === true) {
      this.loadInmuebleId()
    }
  }

  loadInmuebleId() {
    this.api_service.viewUniqueInmuebleId(this.id_inmueble).subscribe(
      ({ data }: any) => {
        const { name_inmueble, description, address, price } = data
        this.form_inmueble.setValue({ name_inmueble, description, address, price })
      }
    )
  }

  loadFormInmueble() {
    this.form_inmueble = this.fb.group({
      name_inmueble: [ '', [ Validators.required ] ],
      description: [ '', [ Validators.required ] ],
      address: [ '', [ Validators.required ] ],
      price: [ 0, [ Validators.required ] ],
    })
  }

  onHanndleChangeDirOrigin(e: Event | any) {
    const direccion: string = e.target.value
    let new_direccion: string = direccion.replace(/ /g, '+')
    new_direccion = new_direccion.replace(/#/g, '%23')
    this.api_service.geoCoding(new_direccion).subscribe(
      ({ results }: any) => {
        const ubi: _mapa_direccion[] | any = results.map(
          (elt: any) => {
            return {
              lon: elt.geometry.lng,
              lat: elt.geometry.lat,
              direccion: {
                ubi: direccion,
              }
            }
          }
        )
        const idx_filter = this.ubicacion.filter((elt: any, i: number) => elt.direccion.origin === origin).map((_, i) => i);
        if (idx_filter.length > 0) {
          this.ubicacion.splice(idx_filter[0], 1)
        }
        this.ubicacion.push(ubi[0])
        this.emmiter_service.$emmiterMapaDireccion.emit(this.ubicacion)
      }
    )
  }

  submitInmueble() {
    const { name_inmueble, description, address, price } = this.form_inmueble.value
    const new_body: _inmueble_c = {
      name_inmueble,
      description,
      address,
      price,
      lat: this.ubicacion[0].lat,
      lon: this.ubicacion[0].lon,
    }
    if (this.is_edit === false) {
      this.createInmueble(new_body)
    }else {
      this.updateInmuebleId(new_body)
    }
  }
  
  createInmueble(new_body: any) {
    this.api_service.createInmueble(new_body).subscribe(
      ({ msg }: string | any) => {
        Swal.fire({
          position: "bottom-right",
          icon: "success",
          title: msg,
          showConfirmButton: false,
          timer: 1500
        })
        this.activeModal.close()
        this.emmiter_service.$emmiterLoadInfoInmuebles.emit(true)
      }
    )
  }

  updateInmuebleId(new_body: any){
    this.api_service.updateInmuebleId(new_body, this.id_inmueble).subscribe(
      ({ msg }: string | any) => {
        Swal.fire({
          position: "bottom-right",
          icon: "success",
          title: msg,
          showConfirmButton: false,
          timer: 1500
        })
        this.activeModal.close()
        this.emmiter_service.$emmiterLoadInfoInmuebles.emit(true)
      }
    )
  }

}
