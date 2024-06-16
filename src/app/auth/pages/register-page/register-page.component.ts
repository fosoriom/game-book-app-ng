import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passswordsDontMatch: true
      }
    }
    return null;
  };

}
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar)

  loading = false;

  public myForm: FormGroup = this.fb.group({
    id: [''],
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordsMatchValidator() });

  //  myForm = new FormGroup ({
  //   id: new FormControl(''),
  //   fullName: new FormControl('',[Validators.required,Validators.minLength(3)]),
  //   email: new FormControl('',[Validators.required, Validators.email]),
  //   password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  //   confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
  // },{validators:passwordsMatchValidator()});

  signUp() {
    this.loading = true;
    const { email, password, fullName } = this.myForm.value;
    this.authService.register(email, password, fullName)
      .subscribe(
        {
          next: () => {
            this.loading = false
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "register in successfully",
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
}

