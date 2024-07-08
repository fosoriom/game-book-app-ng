import { Component, Inject, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGamesService } from '../../services/video-games.service';
import { VideoConsolesService } from '../../../video-consoles/services/video-consoles.service';
import { AuthService } from '../../../auth/services/auth-service.service';
import { FilesService } from '../../../services/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoConsole } from '../../../video-consoles/interfaces/video-console.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideoGame } from '../../interfaces/video-game.interface';

@Component({
  selector: 'app-video-game-create',
  templateUrl: './video-game-create.component.html',
  styleUrl: './video-game-create.component.css'
})
export class VideoGameCreateComponent {

  private fb = inject(FormBuilder);
  private videoGamesService = inject(VideoGamesService)
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

  

  constructor(
    private _dialogRef: MatDialogRef<VideoGameCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public videoGame: VideoGame

  ) { }

  ngOnInit(): void {

    this.myForm.patchValue(this.videoGame);
    this.getVideoConsoles()
  }
  setTitleDialog() {
    if (this.videoGame) {
      this.TITLE_DIALOG = "Update video game"
    } else {
      this.TITLE_DIALOG = "Create video game"
    }
  }
  public myForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    releaseDate: ['', [Validators.required, Validators.minLength(4)]],
    url: [''],
    videoConsoleId: ['', [Validators.required]],
    userId: ['']

  });

  createVideoGame() {

    if (this.myForm.valid) {
      if (this.videoGame) {

        this.videoGame.name = this.myForm.value.name;
        this.videoGame.releaseDate = this.myForm.value.releaseDate;
        this.videoGame.videoConsoleId = this.myForm.value.videoConsoleId;
        this.videoGamesService.updateVideoGame(this.myForm.value)
        .subscribe({
          next:(videoGame) => {
            this.isDisabled = true;
            if(this.currentFile){
              this.filesService.uploadFile(this.currentFile,this.videoGame.id)
              .subscribe({
                next:(fileSuccess) => {
                  this.videoGame.url = fileSuccess.url;
                  this.videoGamesService.updateVideoGame(this.videoGame)
                  .subscribe({
                    next:(updateResult) => {
                      this.error('Video game with image update success');
                      this._dialogRef.close(true);

                    },error:(message) => {
                      this.error(message);
                      this._dialogRef.close(true);
                    }
                  })
                }, error: (message) => {
                  this.error(message);
                  this._dialogRef.close(true);
                }
              })
            }else {
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
        this.videoGamesService.addVideoGame(this.myForm.value)
          .subscribe(
            {
              next: (videoGame) => {
                this.isDisabled = true;
                if (this.currentFile) {
                  this.filesService.uploadFile(this.currentFile, videoGame.id)
                    .subscribe({
                      next: (fileResponse) => {
                        videoGame.url = fileResponse.url;
                        videoGame.videoConsoleId = videoGame.videoConsole.id;
                        this.videoGamesService.updateVideoGame(videoGame)
                          .subscribe({
                            next: () => {
                              this.error('Video game add success');
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
                  this.error('Video game add success without image');
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

  getVideoConsoles(): void {

    this.videoConsolesService.getVideoConsoles().subscribe(
      consoles => {
        this.videoConsoles = consoles;

      });

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
