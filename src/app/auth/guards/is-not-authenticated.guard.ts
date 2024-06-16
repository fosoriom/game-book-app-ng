import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

    const auhtService = inject(AuthService);
    const router = inject(Router);

    const token = localStorage.getItem('token');
    // if(token) {
    //     router.navigateByUrl('/login');
    //     return false; 
    // }
    if (auhtService.authStatus() === AuthStatus.authenticated) { 
        
        router.navigateByUrl('/');
        return false; 
    }

    return true;
}