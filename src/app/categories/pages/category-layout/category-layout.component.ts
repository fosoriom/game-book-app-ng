import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryCreateComponent } from '../category-create/category-create.component';

@Component({
  selector: 'app-category-layout',
  templateUrl: './category-layout.component.html',
  styles: ``
})
export class CategoryLayoutComponent implements OnInit {

  public categories: Category[] = [];
  public categoriesService = inject(CategoriesService)
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar)
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name','acciones'];

  dataSource = new MatTableDataSource(this.categories);
  loading = false;

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.getCategories();

  }
  getCategories() {
    this.loading = true;
    this.categoriesService.getCategories().subscribe(
      {
        next: (value) => {
          this.categories = value;
          this.dataSource = new MatTableDataSource(this.categories);
          this.loading = false;
        },
        error: (message) => {
          this.error(message);
        }
      }
    )
  }
  openAddCategory() {
    const dialogRef = this._dialog.open(CategoryCreateComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val)
          this.getCategories();
      },error:(message) => {
        this.error(message);
      }
    });

  }
  openEditCategory(category: Category) {
    const dialogRef = this._dialog.open(CategoryCreateComponent,{
      data:category
    });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val)
          this.getCategories();
      },error:(message) => {
        this.error(message);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
