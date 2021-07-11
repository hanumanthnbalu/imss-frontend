import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(): boolean {
        const { isAuthenticated } = this.userService.getIsAuth();
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}
