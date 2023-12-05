import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, Response } from '../models/user';
import { TOKEN_STORAGE_KEY } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private isLoged = false;

  private baseUrl: string;
  private httpClient = inject(HttpClient);

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1';

    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    this.isLoged = token !== null;
  }

  getIsLoged() {
    return this.isLoged;
  }

  setIsLoged(obj: boolean) {
    this.isLoged = obj;
  }

  login(formValue: any): Promise<Response<User>> {
    const res = this.httpClient.post<Response<User>>(
      `${this.baseUrl}/auth/login`,
      formValue,
    );
    return firstValueFrom(res);
  }

  listUsers(search: string): Promise<Response<User[]>> {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      throw new Error('Falta token');
    }

    const headers = new HttpHeaders({
      Authorization: token,
    });

    let res;
    if (search == '')
      res = this.httpClient.get<Response<User[]>>(`${this.baseUrl}/users/`, {
        headers,
      });
    else
      res = this.httpClient.get<Response<User[]>>(
        `${this.baseUrl}/users/?search=${encodeURIComponent(search)}`,
        { headers },
      );

    return firstValueFrom(res);
  }

  createUser(formValue: any): Promise<Response<User>> {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      throw new Error('Falta token');
    }

    const res = this.httpClient.post<Response<User>>(
      `${this.baseUrl}/users/`,
      formValue,
      { headers: new HttpHeaders().set('Authorization', token) },
    );
    return firstValueFrom(res);
  }

  updateUser(id: number, formValue: any): Promise<Response<User>> {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token === null) {
      throw new Error('Falta token');
    }

    const res = this.httpClient.put<Response<User>>(
      `${this.baseUrl}/users/${id}`,
      formValue,
      { headers: new HttpHeaders().set('Authorization', token) },
    );
    return firstValueFrom(res);
  }

  getUser(id: number): Promise<Response<User>> {
    const res = this.httpClient.get<Response<User>>(
      `${this.baseUrl}/auth/confirm/${id}`,
    );
    return firstValueFrom(res);
  }

  sendConfirmation(id: number, formValue: any): Promise<Response<User>> {
    const res = this.httpClient.post<Response<User>>(
      `${this.baseUrl}/auth/confirm/${id}`,
      formValue,
    );
    return firstValueFrom(res);
  }
}
