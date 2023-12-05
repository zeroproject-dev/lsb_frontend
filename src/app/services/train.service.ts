import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TOKEN_STORAGE_KEY } from '../utils/constants';
import { Response } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private baseUrl: string;

  http = inject(HttpClient);

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1';
  }

  train() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      throw new Error('Falta token');
    }

    const res = this.http.post<Response<any>>(
      `${this.baseUrl}/translate/train`,
      null,
      {
        headers: new HttpHeaders().set('Authorization', token),
      },
    );
    return firstValueFrom(res);
  }

  checkStatus() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      // throw new Error('Falta token');
    }

    const res = this.http.get<Response<any>>(
      `${this.baseUrl}/translate/status`,
      {
        headers: new HttpHeaders().set('Authorization', token ?? ''),
      },
    );
    return firstValueFrom(res);
  }

  updateService(formValue: any) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      // throw new Error('Falta token');
    }

    const res = this.http.post<Response<any>>(
      `${this.baseUrl}/translate/service-link`,
      formValue,
      {
        headers: new HttpHeaders().set('Authorization', token ?? ''),
      },
    );
    return firstValueFrom(res);
  }

  getService() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      // throw new Error('Falta token');
    }

    const res = this.http.get<Response<any>>(
      `${this.baseUrl}/translate/service-link`,
      {
        headers: new HttpHeaders().set('Authorization', token ?? ''),
      },
    );
    return firstValueFrom(res);
  }
}
