import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { VideoGame } from '../../interfaces/video-game.interface';
import { Router } from '@angular/router';
import { VideoGamesService } from '../../services/video-games.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VideoGameCreateComponent } from '../video-game-create/video-game-create.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-video-game-layout',
  templateUrl: './video-game-layout.component.html',
  styleUrl: './video-game-layout.component.css'
})
export class VideoGameLayoutComponent implements OnInit, AfterViewInit {
  public videoGames: VideoGame[] = [];
  private videoGamesService = inject(VideoGamesService)
  private router = inject(Router);
  displayedColumns: string[] = ['id', 'name', 'releaseDate', 'url','favorite' ,'consoles','actions'];
  dataSource = new MatTableDataSource(this.videoGames);
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = false;
  private _snackBar = inject(MatSnackBar)
  constructor(private _dialog: MatDialog){

  }
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getVideoGames();
    
  }


  openAddVideoConsole(){
    const dialogRef = this._dialog.open(VideoGameCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVideoGames();
        }
      }
    })

  }
  openEditVideoGame(videoGame:VideoGame){
    videoGame.videoConsoleId = videoGame.videoConsole.id
    const dialogRef = this._dialog.open(VideoGameCreateComponent, {
      data: videoGame
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVideoGames();

        }
      }
    })
   
  }
  getVideoGames(): void {
    this.loading = true;
    this.videoGamesService.getVideoGames().subscribe(
      games => {
        this.videoGames = games;
        this.dataSource = new MatTableDataSource(this.videoGames);
        this.loading = false;
        
      });

  }

  clickFavorite(videoGame:VideoGame){
    
    videoGame.favorite = !videoGame.favorite
    videoGame.videoConsoleId = videoGame.videoConsole.id
    
    this.videoGamesService.updateVideoGame(videoGame)
    .subscribe({
      next :(videoGameSuccess) => {
        
        if(videoGameSuccess.favorite) {
          
          this.error(`${videoGameSuccess.name} is now your favorite game`)
          
        } else {
          this.error(`${videoGameSuccess.name} is now not your favorite game`)
        }

      },error:(message) => {
        this.error(message);
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
