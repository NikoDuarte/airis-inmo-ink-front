import { AfterViewInit, Component, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { _mapa_direccion, _mapa_info } from 'src/app/interfaces/interfaces';
import { EmmitersService } from 'src/app/services/emmiters.service';
import { UbicationService } from 'src/app/services/ubication.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  public map!: mapboxgl.Map
  public inmueble: _mapa_info[] = []
  public ubicaciones: _mapa_direccion[] = []
  @Input() public ubi_direction: boolean = false

  constructor(
    private ubication_service: UbicationService,
    private emmiter: EmmitersService
  ) { }

  ngAfterViewInit(): void {
    this.loadMapa()
    if (this.ubi_direction === false) {
      this.emmiter.$emmiterMapa.subscribe(
        resp => {
          const divClass = document.getElementsByClassName('mapboxgl-marker')
          const divClassArray = Array.from(divClass)
          divClassArray.forEach(elt => {
            elt.remove()
          });
          this.inmueble = resp
          for (const marker of this.inmueble) {
            this.markerMapa(marker)
          }
        }
      )
    }
  }

  async loadMapa() {
    mapboxgl!.accessToken = 'pk.eyJ1Ijoibmlrb2QiLCJhIjoiY2t2aGFoamdmYzg3NTJ3bno0MHZ6aDR3aSJ9.XRjIg-EPHxFsG0E-xWtTYQ'
    const position = await this.ubication_service.getCurrentPosition()
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [position[0].lon, position[0].lat],
      zoom: 8
    });
    for (const marker of this.inmueble) {
      this.markerMapa(marker)
    }
  }

  markerMapa(marcador: _mapa_info) {
    const html = `
      <h2>
        <strong>Inmueble:</strong> 
        ${marcador.name}
      </h2>
      <h4>
        <strong>Descripcion:</strong> 
        ${marcador.description}
      </h4>
    `
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML(html)

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: marcador.color,
    })
      .setLngLat([marcador.lon, marcador.lat])
      .setPopup(customPopup)
      .addTo(this.map)
  }

  markerMapaDrag(marca: { lon: number, lat: number, direccion: { ubi: string } }) {
    const html = `
    <h4><strong>Direccion de inmueble:</strong> ${marca.direccion.ubi}</h4>
    `
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML(html)

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })
      .setLngLat([marca.lon, marca.lat])
      .setPopup(customPopup)
      .addTo(this.map)

  }

}
