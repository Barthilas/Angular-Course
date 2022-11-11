import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR CALLED');
    const newRequest = request.clone({
      headers: new HttpHeaders({ token: '1234' }),
    });
    if(request.method === "POST")
    {
      //handle
    }
    return next.handle(newRequest);
  }
}
