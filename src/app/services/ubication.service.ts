import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbicationService {

  public currentUbication!: [ {lon: number, lat: number} ]

  constructor() { }

  getCurrentPosition(): Promise<[{lon: number, lat: number}]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { longitude, latitude } = coords
          this.currentUbication = [ {lon: longitude, lat: latitude} ]
          resolve(this.currentUbication)
        }, (err) => {
          console.log(err);
        }
      )
    })
  }
}
