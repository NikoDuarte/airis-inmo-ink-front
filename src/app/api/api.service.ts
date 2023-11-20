import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _inmueble_c, _login, _user_c } from '../interfaces/interfaces';
import { catchError, map, of } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url_static_back: string = 'http://localhost:2204/v1/api'
  private key_api_geo: string = 'a3b14f5d601c4a449136138c50e28288'

  public User!: User

  constructor(
    private http : HttpClient
  ) { }

  get header_geo() {
    return {
      headers: {
        'X-RapidAPI-Key': this.key_api_geo
      }
    }
  }

  get header_auth() {
    return {
      headers: {
        'Authorization': String(localStorage.getItem('token_auth'))
      }
    }
  }

  //? -_ Metodo que geocodificara una direccion por coordenadas
  geoCoding(direccion: string) {
    const api: string = `https://api.opencagedata.com/geocode/v1/json?q=${direccion}&key=${this.key_api_geo}&language=es`
      return this.http.get(api, this.header_geo)
  }

  /*###############################*/
  //? -> Metodo que creara un usuario
  createUser(user: _user_c){
    const api: string = `${this.url_static_back}/users/`
      return this.http.post(api, user)
  }

  //? -> Metodo que logue un usuario
  loginUser(user: _login){
    const api: string = `${this.url_static_back}/auth/login`
      return this.http.post(api, user)
  }

  //? -> Metodo que renovara un token de acceso
  renewToken() {
    const api: string = `${this.url_static_back}/auth/renew-token`
      return this.http.patch(api, null, this.header_auth).pipe(
        map(
          (elt: any) => {
            const { id_user, name, email } = elt.data.user_info
            this.User = new User(id_user, name, email)
            return true
          }
        ), catchError( err => {return of(false)} )
      )
  }
  /*###############################*/

  /*###############################*/
  //? -> Metodo que mostrara todos los inmuebles
  viewAllInmuebles() {
    const api: string = `${this.url_static_back}/inmueble/view-all`
      return this.http.get(api, this.header_auth)
  }

  //? -> Metodo que mostrara un inmueble segun su id
  viewUniqueInmuebleId(id_inmueble: number) {
    const api: string = `${this.url_static_back}/inmueble/view-unique/${id_inmueble}`
      return this.http.get(api, this.header_auth)
  }

  //? -> Metodo que mostrara el informe de ventas de inmuebles de un usuario
  viewInformeVentas() {
    const api: string = `${this.url_static_back}/inmueble/view-informe-ventas`
      return this.http.get(api, this.header_auth)
  }

  //? -> Metodo que creara un inmueble
  createInmueble(inmueble: _inmueble_c) {
    const api: string = `${this.url_static_back}/inmueble/create`
      return this.http.post(api, inmueble, this.header_auth)
  }
  
  //? -> Metodo que actualizara un inmueble
  updateInmuebleId(inmueble: any, id_inmueble: number) {
    const api: string = `${this.url_static_back}/inmueble/update-unique/${id_inmueble}`
      return this.http.put(api, inmueble, this.header_auth)
  }

  //? -> Metodo que eliminara un inmueble
  deleteInmueble(id_inmueble: number) {
    const api: string = `${this.url_static_back}/inmueble/delete/${id_inmueble}`
      return this.http.delete(api, this.header_auth)
  }
  /*###############################*/

}
