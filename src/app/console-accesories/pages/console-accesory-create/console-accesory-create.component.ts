import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsoleAccesoriesService } from '../../services/console-accesories.service';
import { VideoConsolesService } from '../../../video-consoles/services/video-consoles.service';
import { AuthService } from '../../../auth/services/auth-service.service';
import { FilesService } from '../../../services/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsoleAccesory } from '../../interfaces/console-accesory.interface';
import { VideoConsole } from '../../../video-consoles/interfaces/video-console.interface';

@Component({
  selector: 'app-console-accesory-create',
  templateUrl: './console-accesory-create.component.html',
  styleUrl: './console-accesory-create.component.css'
})
export class ConsoleAccesoryCreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private consoleAccesoriesServices = inject(ConsoleAccesoriesService)
  private videoConsolesService = inject(VideoConsolesService)
  private authService = inject(AuthService)
  private filesService = inject(FilesService)

  private _snackBar = inject(MatSnackBar)

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  TITLE_DIALOG = ""
  isDisabled: boolean = false;
  videoConsoles: VideoConsole[] = [];


  public myForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    releaseDate: ['', [Validators.required, Validators.minLength(4)]],
    url: [''],
    videoConsoleId: ['', [Validators.required]],
    userId: ['']

  });
  constructor(
    private _dialogRef: MatDialogRef<ConsoleAccesoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public consoleAccesory: ConsoleAccesory

  ) { }

  ngOnInit(): void {

    this.myForm.patchValue(this.consoleAccesory);
    this.getVideoConsoles()
  }
  setTitleDialog() {
    if (this.consoleAccesory) {
      this.TITLE_DIALOG = "Update video game"
    } else {
      this.TITLE_DIALOG = "Create video game"
    }
  }

  getVideoConsoles(): void {

    this.videoConsolesService.getVideoConsoles().subscribe(
      consoles => {
        this.videoConsoles = consoles;

      });

  }

  createAccesoryConsole() {

    if (this.myForm.valid) {
      if (this.consoleAccesory) {

        this.consoleAccesory.name = this.myForm.value.name;
        this.consoleAccesory.releaseDate = this.myForm.value.releaseDate;
        this.consoleAccesory.videoConsoleId = this.myForm.value.videoConsoleId;
        this.consoleAccesoriesServices.updateConsoleAccesory(this.myForm.value)
          .subscribe({
            next: (videoGame) => {
              this.isDisabled = true;
              if (this.currentFile) {
                this.filesService.uploadFile(this.currentFile, this.consoleAccesory.id)
                  .subscribe({
                    next: (fileSuccess) => {
                      this.consoleAccesory.url = fileSuccess.url;
                      this.consoleAccesoriesServices.updateConsoleAccesory(this.consoleAccesory)
                        .subscribe({
                          next: (updateResult) => {
                            this.error('Console accesory with image update success');
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
                this.error('Console accesory update success')
                this._dialogRef.close(true);
              }
            }, error: (message) => {
              this.error(message);
              this._dialogRef.close(true);
            }
          })

      } else {
        this.myForm.value.userId = this.authService.currentUser()?.id!
        this.consoleAccesoriesServices.addConsoleAccesory(this.myForm.value)
          .subscribe(
            {
              next: (consoleAccesory) => {
                this.isDisabled = true;
                if (this.currentFile) {
                  this.filesService.uploadFile(this.currentFile, consoleAccesory.id)
                    .subscribe({
                      next: (fileResponse) => {
                        consoleAccesory.url = fileResponse.url;
                        consoleAccesory.videoConsoleId = consoleAccesory.videoConsole.id;
                        this.consoleAccesoriesServices.updateConsoleAccesory(consoleAccesory)
                          .subscribe({
                            next: () => {
                              this.error('Console accesory add success');
                              this._dialogRef.close(true);
                            }, error: (message) => {

                            }
                          })
                      },
                      error: (message) => {
                        this.error(message);
                        this._dialogRef.close(true);
                      }
                    })
                } else {
                  this.error('Console accesory add success without image');
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
