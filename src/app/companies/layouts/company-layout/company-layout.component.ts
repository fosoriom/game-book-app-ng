import { AfterViewInit, Component, OnInit, ViewChild,inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Company } from '../../interfaces/company.interface';
import { CompaniesService } from '../../services/companies.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyCreateComponent } from '../../pages/company-create/company-create.component';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styles: ``
})
export class CompanyLayoutComponent implements OnInit, AfterViewInit {

  public companies: Company[] = [];
  displayedColumns: string[] = ['id', 'name', 'foundationYear', 'urlImage', 'acciones'];

  dataSource!:MatTableDataSource<Company>;
  
  private companiesService = inject(CompaniesService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _matdialog : MatDialog) { }

  loading = false;
  ngOnInit(): void {
    
    this.getCompanies();

  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.companies);
    this.dataSource.paginator = this.paginator;

  }

  getCompanies(): void {
    this.loading = true;
    console.log('cargando...')
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
  modificarImagen(id: string){
    console.log(id);
  }
  openAddEditCompany(){
   const dialogRef = this._matdialog.open(CompanyCreateComponent);
   dialogRef.afterClosed().subscribe({
    next:(val) => {
      if(val){
        this.getCompanies();
      }
    }
   })
    
  }
}
