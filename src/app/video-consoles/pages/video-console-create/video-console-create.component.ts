import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoConsolesService } from '../../services/video-consoles.service';
import { AuthService } from '../../../auth/services/auth-service.service';
import { FilesService } from '../../../services/files.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideoConsole } from '../../interfaces/video-console.interface';
import { CompaniesService } from '../../../companies/services/companies.service';
import { Company } from '../../../companies/interfaces/company.interface';

@Component({
  selector: 'app-video-console-create',
  templateUrl: './video-console-create.component.html',
  styleUrl: './video-console-create.component.css'
})
export class VideoConsoleCreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private videoConsoleService = inject(VideoConsolesService)
  private companiesService = inject(CompaniesService)
  private authService = inject(AuthService)
  private filesService = inject(FilesService)
  private router = inject(Router)
  private _snackBar = inject(MatSnackBar)

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  TITLE_DIALOG = ""
  isDisabled: boolean = false;
  companies: Company[] = [];

  constructor(
    private _dialogRef: MatDialogRef<VideoConsoleCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public videoConsole: VideoConsole

  ) { }
  ngOnInit(): void {

    this.myForm.patchValue(this.videoConsole);
    this.getCompanies()
  }
  setTitleDialog() {
    if (this.videoConsole) {
      this.TITLE_DIALOG = "Update video console"
    } else {
      this.TITLE_DIALOG = "Create video console"
    }
  }
  public myForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    releaseDate: ['', [Validators.required, Validators.minLength(4)]],
    url: [''],
    companyId: ['', [Validators.required]],
    userId: ['']
  });
  getCompanies(): void {

    this.companiesService.getCompanies().subscribe(
      companies => {
        this.companies = companies;

      });

  }
  createVideoConsole() {

    if (this.myForm.valid) {
      if (this.videoConsole) {
        this.videoConsole.name = this.myForm.value.name
        this.videoConsole.releaseDate = this.myForm.value.releaseDate
        this.videoConsole.companyId = this.myForm.value.companyId
        
        this.videoConsoleService.updateVideoConsole(this.videoConsole)
          .subscribe({
            next: (videoConsole) => {
              if (this.currentFile) {
                this.filesService.uploadFile(this.currentFile, this.videoConsole.id)
                  .subscribe({
                    next: (fileSuccess) => {
                      this.videoConsole.url = fileSuccess.url;
                      this.videoConsoleService.updateVideoConsole(this.videoConsole)
                        .subscribe({
                          next: (updateResult) => {
                            this.error('Video console with image update success');
                            this._dialogRef.close(true);
                          }, error: (message) => {
                            this.error(message);
                            this._dialogRef.close(true);
                          }
                        })

                    }, error: (message) => {
                      this.error(message);
                      this._dialogRef.close(true);
                    }
                  })
              } else {
                this.error('Video console update success')
                this._dialogRef.close(true);
              }

            }, error: (message) => {
              this.error(message);
              this._dialogRef.close(true);
            }
          })

      } else {
        this.myForm.value.userId = this.authService.currentUser()?.id!
        this.videoConsoleService.addVideoConsole(this.myForm.value)
          .subscribe(
            {

              next: (videoConsole) => {
                this.isDisabled = true
                
                if (this.currentFile) {
                  this.filesService.uploadFile(this.currentFile, videoConsole.id)
                    .subscribe({
                      next: (fileResponse) => {
                        videoConsole.url = fileResponse.url
                        videoConsole.companyId = videoConsole.company.id;
                        this.videoConsoleService.updateVideoConsole(videoConsole)
                          .subscribe({
                            next: () => {
                              this.error('Video console add success');
                              this._dialogRef.close(true);
                            }, error: (message) => {
                              this.error(message);
                              this._dialogRef.close(true);
                            }
                          })

                      }, error: (message) => {
                        this.error(message);
                        this._dialogRef.close(true);

                      },
                    })
                } else {
                  this.error('Video console add success without image');
                  this._dialogRef.close(true);
                }

              }, error: (message) => {
                this.error(message)
                this._dialogRef.close(true);
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
  error(message: string,) {
    this._snackBar.open(
      message,
      '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',

      },
    )
  }
}
