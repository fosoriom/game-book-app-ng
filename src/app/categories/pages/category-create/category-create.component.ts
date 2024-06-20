import { Component, Inject, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styles: ``
})
export class CategoryCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService)
  private authService = inject(AuthService)
  private router = inject(Router)
  private _snackBar = inject(MatSnackBar)
  public user = computed(() => this.authService.currentUser());
  public myForm: FormGroup = this.fb.group({
    id: '',
    name: ['', [Validators.required]],
  });
  TITLE_DIALOG = ""
  constructor(
    private _dialogRef: MatDialogRef<CategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) { }

  ngOnInit(): void {
    this.myForm.patchValue(this.category);
  }
  setTitleDialog() {
    if (this.category) {
      this.TITLE_DIALOG = "Update company"
    } else {
      this.TITLE_DIALOG = "Create company"
    }
  }

  createCategory() {
    this.setTitleDialog();
    if (this.myForm.valid) {
      if (this.category) {
        //TODO
        const category: Category = {
          id: this.myForm.value.id,
          name: this.myForm.value.name,
          userId: this.authService.currentUser()?.id!
        }
        this.categoriesService.updateCategory(category).subscribe({
          next: () => {
            this.error('Category update success');
            this._dialogRef.close(true);
          },
          error: (message) => {
            this.error(message);
            this._dialogRef.close(true);
          }
        })
      } else {
        const { name } = this.myForm.value;
        this.categoriesService.addCategory(name, this.user()?.id!).subscribe({
          next: () => {
            this.error('Category add success');
            this._dialogRef.close(true);
          },
          error: (message) => {
            console.log(message);
            this.error(message);
            this._dialogRef.close(true);
          }
        })
      }
    }
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
