/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as mapboxgl from 'mapbox-gl'

mapboxgl!.accessToken = 'pk.eyJ1Ijoibmlrb2QiLCJhIjoiY2t2aGFoamdmYzg3NTJ3bno0MHZ6aDR3aSJ9.XRjIg-EPHxFsG0E-xWtTYQ';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
