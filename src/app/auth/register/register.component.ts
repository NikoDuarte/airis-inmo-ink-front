import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public form_register!: FormGroup

  public hide: boolean = true

  constructor(
    private fb: FormBuilder,
    private api_services: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFormRegister()
  }

  loadFormRegister(){
    this.form_register = this.fb.group({
      name: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ]
    })
  }

  submitRegister() {
    this.api_services.createUser(this.form_register.value).subscribe(
      ({ msg }: any) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: msg,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/login')
      }
    )
  }

}
