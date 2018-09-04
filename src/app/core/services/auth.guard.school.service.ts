import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardSchool {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        
        if (!this.authService.isSchoolLogin()) {
            this.router.navigate(['/login']);
            console.log('authService.currentUser=>', this.authService.currentUser);
            return false;
        }
        return true;
    }
}
