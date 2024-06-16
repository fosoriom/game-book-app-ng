import { Component, computed, effect, inject, signal } from '@angular/core';
import { AuthService } from './auth/services/auth-service.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import {MenuItem } from './shared/interfaces/menu-item.interface';
import {CustomSidenavComponent} from './shared/components/custom-sidenav/custom-sidenav.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gameBookApp';
  private authService = inject(AuthService)
  private router = inject(Router);
  public user = computed(() => this.authService.currentUser());
  collapsed = signal(false);
  sidenavWidth = computed( () =>this.collapsed()? '65px' : '250px');
  onLogout() {

    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
  
  public finishedAuthChek = computed<boolean>(() => {
    this.authService.checkAuthStatus();
    
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  // public authStatusChangedEffect = effect(() => {
  //   console.log(this.user());
  //   switch (this.authService.authStatus()) {
  //     case AuthStatus.checking:
  //       return;
  //     case AuthStatus.authenticated:

  //       //this.router.navigateByUrl('/dashboard');
  //       return;
  //     case AuthStatus.notAuthenticated:
  //       //this.router.navigateByUrl('/login')
  //       return;


  //   }
  // })

 
}
