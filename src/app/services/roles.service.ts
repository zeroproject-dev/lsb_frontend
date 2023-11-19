import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Permissions, Response } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private httpClient = inject(HttpClient);

  private baseUrl;

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1';
  }

  createRole(formValue: any) {
    const res = this.httpClient.post<Response<any>>(
      this.baseUrl + '/roles',
      formValue,
    );
    return firstValueFrom(res);
  }

  listOfPermissions(): Promise<Response<Permissions>> {
    const res = this.httpClient.get<Response<Permissions>>(
      this.baseUrl + '/permissions',
    );
    return firstValueFrom(res);
  }
}
