import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Company } from '../../interfaces/company.interface';
import { CompaniesService } from '../../services/companies.service';
import { CompanyCreateComponent } from '../../pages/company-create/company-create.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styles: ``
})
export class CompanyListComponent implements OnInit, AfterViewInit {

  public companies: Company[] = [];
  private companiesService = inject(CompaniesService)
  private router = inject(Router);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'foundationYear', 'urlImage', 'acciones'];
  //dataSource!: MatTableDataSource<Company>;
  dataSource = new MatTableDataSource(this.companies);

  loading = false;
  
  constructor(private _dialog: MatDialog) { }
  
  ngOnInit(): void {

    this.getCompanies();

  }
  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.companies);
    this.dataSource.paginator = this.paginator;

  }

  getCompanies(): void {
    this.loading = true;
    this.companiesService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
        this.dataSource = new MatTableDataSource(this.companies);
        this.loading = false;
      });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  modificarImagen(id: string) {
    console.log(id);
  }
  openAddEditCompany() {
    const dialogRef = this._dialog.open(CompanyCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanies();
        }
      }
    })
  }
  openEditCompany(company: Company) {
    const dialogRef = this._dialog.open(CompanyCreateComponent, {
      data: company
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanies();

        }
      }
    })

  }
}
