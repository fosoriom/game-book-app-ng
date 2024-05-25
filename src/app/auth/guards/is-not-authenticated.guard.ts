import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

    const auhtService = inject(AuthService);
    const router = inject(Router);

    if (auhtService.authStatus() === AuthStatus.authenticated) { 
        
        router.navigateByUrl('/dashboard');
        return false; 
    }

    return true;
}