import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public form_login!: FormGroup
  public hide: boolean = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api_service: ApiService,
    private ngZone : NgZone
  ) {}

  ngOnInit(): void {
    this.loadFormLogin()
  }

  loadFormLogin() {
    this.form_login = this.fb.group({
      email: [ '', [ Validators.required ] ],
      password: [ '', [ Validators.required ] ],
    })
  }

  submitLogin() {
    this.api_service.loginUser(this.form_login.value).subscribe(
      ({msg, data}: any) => {
        localStorage.removeItem('token_auth')
        localStorage.setItem('token_auth', data)
        let timerInterval: any
        Swal.fire({
          title: 'INMO INK',
          html: `${msg}`,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            timerInterval = setTimeout(() => {
              //Navegar al dashboard
              this.ngZone.run( () => {
                this.router.navigateByUrl('/dashboard/compras')
              } )
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
      }
    )
  }

}
