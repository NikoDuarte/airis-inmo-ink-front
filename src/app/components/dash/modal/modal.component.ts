import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent {

  @Input() public title: string = ''
  @Input() public is_edit: boolean = true
  @Input() public id_inmueble!: number

  constructor(
    public activeModal: NgbActiveModal
  ) {}
}
