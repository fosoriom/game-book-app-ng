import { Component, OnInit, inject } from '@angular/core';
import { ConsoleAccesory } from '../../interfaces/console-accesory.interface';
import { ConsoleAccesoriesService } from '../../services/console-accesories.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConsoleAccesoryCreateComponent } from '../console-accesory-create/console-accesory-create.component';

@Component({
  selector: 'app-console-accesory-layout',
  templateUrl: './console-accesory-layout.component.html',
  styleUrl: './console-accesory-layout.component.css'
})
export class ConsoleAccesoryLayoutComponent implements OnInit {

  public consoleAccesories: ConsoleAccesory[] = [];
  private consoleAccesoriesService = inject(ConsoleAccesoriesService)
  private router = inject(Router);
  displayedColumns: string[] = ['id', 'name', 'releaseDate', 'url', 'favorite', 'console', 'actions'];
  dataSource = new MatTableDataSource(this.consoleAccesories);
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = false;
  private _snackBar = inject(MatSnackBar)
  constructor(private _dialog: MatDialog) {

  }
  ngOnInit(): void {

    this.getConsoleAccesories();
  }

  openAddConsoleAccesory(){
    const dialogRef = this._dialog.open(ConsoleAccesoryCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getConsoleAccesories();
        }
      }
    })

  }

  openEditConsoleAccesory(consoleAccesory:ConsoleAccesory){
    consoleAccesory.videoConsoleId = consoleAccesory.videoConsole.id
    const dialogRef = this._dialog.open(ConsoleAccesoryCreateComponent, {
      data: consoleAccesory
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getConsoleAccesories();

        }
      }
    })
   
  }
  getConsoleAccesories(): void {
    this.loading = true;
    this.consoleAccesoriesService.getConsoleAccesories().subscribe(
      accesories => {
        this.consoleAccesories = accesories;
        this.dataSource = new MatTableDataSource(this.consoleAccesories);
        this.loading = false;

      });

  }
  clickFavorite(consoleAccesory:ConsoleAccesory){
    
    consoleAccesory.favorite = !consoleAccesory.favorite
    consoleAccesory.videoConsoleId = consoleAccesory.videoConsole.id
    
    this.consoleAccesoriesService.updateConsoleAccesory(consoleAccesory)
    .subscribe({
      next :(videoGameSuccess) => {
        
        if(videoGameSuccess.favorite) {
          
          this.error(`${videoGameSuccess.name} is now your favorite accesory`)
          
        } else {
          this.error(`${videoGameSuccess.name} is now not your favorite accesory`)
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
