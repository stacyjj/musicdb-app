import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()

export class DeezerInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.method === 'GET' && request.url.indexOf(environment.deezerURL +'search?q=') > -1) {
      return next.handle(request);
    }
    
    if(request.method === 'GET' && request.url === environment.deezerURL +'chart') {
      return next.handle(request);
    }
  }
}
