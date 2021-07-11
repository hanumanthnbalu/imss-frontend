import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(public auth: UserService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.auth.getToken();
        if (!token) {
            return next.handle(request);
        } else {
            request = request.clone({
                setHeaders: {
                    Authorization: token,
                },
            });
            return next.handle(request);
        }
    }
}
