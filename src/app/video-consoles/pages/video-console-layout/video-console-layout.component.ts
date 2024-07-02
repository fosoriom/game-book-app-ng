import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VideoConsole } from '../../interfaces/video-console.interface';
import { VideoConsolesService } from '../../services/video-consoles.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VideoConsoleCreateComponent } from '../video-console-create/video-console-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video-console-layout',
  templateUrl: './video-console-layout.component.html',
  styleUrl: './video-console-layout.component.css'
})
export class VideoConsoleLayoutComponent implements OnInit {


  
  public videoConsoles: VideoConsole[] = [];
  private videoConsolesService = inject(VideoConsolesService)
  private router = inject(Router);
  displayedColumns: string[] = ['id', 'name', 'releaseDate', 'url','like' ,'company','actions'];
  //dataSource!: MatTableDataSource<Company>;
  dataSource = new MatTableDataSource(this.videoConsoles);
  loading = false;
  private _snackBar = inject(MatSnackBar)
  constructor(private _dialog: MatDialog){

  }
    ngOnInit(): void {
      this.getVideoConsoles();
    }

  openAddVideoConsole(){
    const dialogRef = this._dialog.open(VideoConsoleCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVideoConsoles();
        }
      }
    })

  }
  openEditVideoComsole(videoConsole:VideoConsole){
    videoConsole.companyId = videoConsole.company.id
    const dialogRef = this._dialog.open(VideoConsoleCreateComponent, {
      data: videoConsole
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVideoConsoles();

        }
      }
    })
   
  }
  getVideoConsoles(): void {
    this.loading = true;
    this.videoConsolesService.getVideoConsoles().subscribe(
      companies => {
        this.videoConsoles = companies;
        this.dataSource = new MatTableDataSource(this.videoConsoles);
        this.loading = false;
      });

  }
  clickFavorite(videoConsole:VideoConsole){
    videoConsole.like = !videoConsole.like
    videoConsole.companyId = videoConsole.company.id
    this.videoConsolesService.updateVideoConsole(videoConsole)
    .subscribe({
      next :(videoConsoleSuccess) => {
        this.getVideoConsoles();
        if(videoConsoleSuccess.like) {

          this.error(`${videoConsoleSuccess.name} is now your favorite console`)
        } else {
          this.error(`${videoConsoleSuccess.name} is now not your favorite console`)
        }

      },error:(message) => {

      }
    })
    
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
