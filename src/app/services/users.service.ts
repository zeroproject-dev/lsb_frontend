import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, Response } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string;
  private httpClient = inject(HttpClient);

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1';
  }

  login(formValue: any): Promise<Response<User>> {
    const res = this.httpClient.post<Response<User>>(
      `${this.baseUrl}/auth/login`,
      formValue,
    );
    return firstValueFrom(res);
  }

  listUsers(): Promise<Response<User[]>> {
    const res = this.httpClient.get<Response<User[]>>(`${this.baseUrl}/users/`);
    return firstValueFrom(res);
  }

  createUser(formValue: any): Promise<Response<User>> {
    const res = this.httpClient.post<Response<User>>(
      `${this.baseUrl}/users/`,
      formValue,
    );
    return firstValueFrom(res);
  }
}
