import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-menu></app-menu>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <!--<app-footer></app-footer>-->
  `,
  styles: [
  ]
})
export class PagesComponent {

}
