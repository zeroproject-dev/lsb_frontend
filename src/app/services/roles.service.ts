import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Permissions, Response } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { TOKEN_STORAGE_KEY } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private httpClient = inject(HttpClient);

  private baseUrl;

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1';
  }

  listRoles(search: string) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      throw new Error('Falta token');
    }

    const headers = new HttpHeaders({
      Authorization: token,
    });

    let res;
    if (search == '')
      res = this.httpClient.get<Response<any>>(`${this.baseUrl}/roles/`, {
        headers,
      });
    else
      res = this.httpClient.get<Response<any>>(
        `${this.baseUrl}/roles/?search=${encodeURIComponent(search)}`,
        { headers },
      );

    return firstValueFrom(res);
  }

  updateRole(formValue: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    console.log(formValue);
    const res = this.httpClient.put<Response<any>>(
      this.baseUrl + `/roles/${formValue['id']}`,
      formValue,
      { headers },
    );
    return firstValueFrom(res);
  }

  createRole(formValue: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    const res = this.httpClient.post<Response<any>>(
      this.baseUrl + '/roles/',
      formValue,
      { headers },
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
