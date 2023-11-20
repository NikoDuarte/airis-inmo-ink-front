import { EventEmitter, Injectable } from '@angular/core';
import { _mapa_direccion, _mapa_info } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmmitersService {

  public $emmiterMapa: EventEmitter<_mapa_info[]> = new EventEmitter()

  public $emmiterMapaDireccion: EventEmitter<_mapa_direccion[]> = new EventEmitter()

  public $emmiterLoadInfoInmuebles: EventEmitter<boolean> = new EventEmitter()

  constructor() { }
}
