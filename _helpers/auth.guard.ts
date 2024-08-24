import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private apiService: ApiService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.apiService.userValue;
        if (user) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/app/login');
        return false;
    }

    isUserLoggedIn(): boolean {
        const user = this.apiService.userValue;
        if (user && user.accessToken) {
            return true;
        }
        return false;
    }

    getUserEmail(): any {
        const user: any = this.apiService.userValue;
        return user.email;
    }

    getUserName(): any {
        const user: any = this.apiService.userValue;
        return user.name ? user.name : '';
    }
}
