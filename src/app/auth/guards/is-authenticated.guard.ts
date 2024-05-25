import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.authStatus() === AuthStatus.authenticated) { 
        return true; 
    }
    // const url = state.url;
    // localStorage.setItem('url', url);
// if( authService.authStatus() === AuthStatus.checking){
//     return false;

// }
    router.navigateByUrl('/auth/login');
    return false;
}