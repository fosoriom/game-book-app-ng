import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar)

  loading = false;
  public myForm: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login() {
    this.loading = true;
    const { email, password } = this.myForm.value;
    this.authService.login(email, password)
      .subscribe(
        {
        next: () => {
          this.loading = false
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "logged in successfully",
            showConfirmButton: false,
            timer: 1500,
            
          });
          this.router.navigateByUrl('/dashboard')
        },
        error: (message) => {
         // Swal.fire('Error',message,'error');
         Swal.fire({
          position: "top-end",
          icon: "error",
          title: message,
          showConfirmButton: false,
          timer: 1500,
          
        });
          this.loading = false;
         // this.error(message);
        },
      })
  }
  error(message: string,) {
    this._snackBar.open(
      message,
      '',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      },
    )
  }


}
