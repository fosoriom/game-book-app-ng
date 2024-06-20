import { Component, Inject, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../interfaces/company.interface';
import { FilesService } from '../../../services/files.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styles: ``
})

export class CompanyCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private companiesService = inject(CompaniesService)
  private authService = inject(AuthService)
  private filesService = inject(FilesService)
  private router = inject(Router)
  isDisabled: boolean = true;

  constructor(
    private _dialogRef: MatDialogRef<CompanyCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public company: Company
  ) { }
  ngOnInit(): void {

    this.myForm.patchValue(this.company);
  }
  public myForm: FormGroup = this.fb.group({
    id: '',
    name: ['', [Validators.required]],
    foundationYear: ['', [Validators.required, Validators.minLength(4)]],
    urlImage: ['']
  });
  public user = computed(() => this.authService.currentUser());
  //selectedFile: File | null = null;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  TITLE_DIALOG = ""

  setTitleDialog() {
    if (this.company) {
      this.TITLE_DIALOG = "Update company"
    } else {
      this.TITLE_DIALOG = "Create company"
    }
  }
  createCompany() {
    this.setTitleDialog();
    //TODO: 
    if (this.myForm.valid) {
      if (this.company) {
        const companyEdit: Company = {
          id: this.myForm.value.id,
          name: this.myForm.value.name,
          foundationYear: this.myForm.value.foundationYear,
          urlImage: this.myForm.value.urlImage,
          userId: this.authService.currentUser()?.id!

        }
        this.companiesService.updateCompany(companyEdit)
          .subscribe(result => {
            if (this.currentFile) { //si actualiza imagen
              this.filesService.uploadFile(this.currentFile, this.company.id)
                .subscribe(res => {
                  companyEdit.urlImage = res.url;
                  this.companiesService.updateCompany(companyEdit)
                    .subscribe(result => {
                      alert('company with image update success');
                      this._dialogRef.close(true);
                    })

                })
            } else {
              alert('company update success');
              this._dialogRef.close(true);
            }
          })
      } else {
        const { name, foundationYear } = this.myForm.value
        const userId = this.authService.currentUser()?.id!
        this.companiesService.addCompany(name, foundationYear, userId)
          .subscribe(company => {
            if (this.currentFile) {
              this.filesService.uploadFile(this.currentFile, company.id)
                .subscribe(succes => {
                  company.urlImage = succes.url;
                  this.companiesService.updateCompany(company)
                    .subscribe(result => {
                      alert('company add success');
                      this._dialogRef.close(true);
                    })
                });
            }
          }
          )
      }
    }


  }
  onFileSelected(event: any) {

    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }


  }
}
