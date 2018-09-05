import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('the inter');
        const authService = this.injector.get(AuthService);
        console.log('Interceptor', authService.isAuthenticated());
        // if (!authService.isAuthenticated()) {
        //     return next.handle(req);
        // }
        const authReq = req.clone({setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Authorisation': authService.getToken()
        }});
            // { headers: req.headers.set('Authorisation', authService.getToken()) });
        console.log();
        return next
        .handle(authReq).catch(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        authService.logout();
                    }
                }
                console.log(authReq);
                return Observable.throw(error);
            });
    }
}
