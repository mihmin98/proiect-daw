import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private loggerService: LoggerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loggerService.log('intercepted request');
        const jwt = localStorage.getItem('jwt');

        request = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        });

        if (jwt) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + jwt)

            });
        }
        return next.handle(request);
    }
}
