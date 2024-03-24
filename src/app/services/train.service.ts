import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Response } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { EnvironmentService } from './environment';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private baseUrl: string;

  http = inject(HttpClient);
  environmentService = inject(EnvironmentService);

  constructor() {
    this.baseUrl = this.environmentService.apiUrl;
  }

  train() {
    const res = this.http.post<Response<any>>(
      `${this.baseUrl}/translate/train`,
      null
    );
    return firstValueFrom(res);
  }

  checkStatus() {
    const res = this.http.get<Response<any>>(
      `${this.baseUrl}/translate/status`
    );
    return firstValueFrom(res);
  }

  updateService(formValue: any) {
    const res = this.http.post<Response<any>>(
      `${this.baseUrl}/translate/service-link`,
      formValue
    );
    return firstValueFrom(res);
  }

  getService() {
    const res = this.http.get<Response<any>>(
      `${this.baseUrl}/translate/service-link`
    );
    return firstValueFrom(res);
  }
}
