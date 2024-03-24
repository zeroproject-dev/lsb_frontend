import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../services/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly environmentService: EnvironmentService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenObj = localStorage.getItem(
      this.environmentService.tokenStorageKey
    );

    if (tokenObj) {
      const { token } = JSON.parse(tokenObj);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
