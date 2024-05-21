import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

    const auhtService = inject(AuthService);
    const router = inject(Router);

    if (auhtService.authStatus() === AuthStatus.authenticated) { return true; }
    // const url = state.url;
    // localStorage.setItem('url', url);

    router.navigateByUrl('/auth/login');
    return false;
}