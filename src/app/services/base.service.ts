import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { EnvironmentService } from './environment';
import { Response } from '../models/user';
import { firstValueFrom } from 'rxjs';

export abstract class BaseService<T> {
  protected httpClient = inject(HttpClient);
  protected environmentService = inject(EnvironmentService);
  protected apiUrl: string = this.environmentService.apiUrl;

  protected resource: string = '';

  constructor() {}

  list(search: string = ''): Promise<Response<T[]>> {
    let res;
    if (search == '')
      res = this.httpClient.get<Response<T[]>>(
        `${this.apiUrl}/${this.resource}/`
      );
    else
      res = this.httpClient.get<Response<T[]>>(
        `${this.apiUrl}/${this.resource}/?search=${encodeURIComponent(search)}`
      );

    return firstValueFrom(res);
  }

  get(id: number | string): Promise<Response<T>> {
    const res = this.httpClient.get<Response<T>>(
      `${this.apiUrl}/${this.resource}/${id}/`
    );

    return firstValueFrom(res);
  }

  create(data: T): Promise<Response<T>> {
    const res = this.httpClient.post<Response<T>>(
      `${this.apiUrl}/${this.resource}/`,
      data
    );

    return firstValueFrom(res);
  }

  update(id: number | string, data: T): Promise<Response<T>> {
    const res = this.httpClient.put<Response<T>>(
      `${this.apiUrl}/${this.resource}/${id}/`,
      data
    );

    return firstValueFrom(res);
  }

  delete(id: number | string): Promise<Response<T>> {
    const res = this.httpClient.delete<Response<T>>(
      `${this.apiUrl}/${this.resource}/${id}/`
    );

    return firstValueFrom(res);
  }
}
