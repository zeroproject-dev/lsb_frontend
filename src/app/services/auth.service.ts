import { Injectable } from '@angular/core';
import { Response, User } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { EnvironmentService } from './environment';
import { HttpClient } from '@angular/common/http';

import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = this.environmentService.apiUrl;
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly httpClient: HttpClient
  ) {}

  getConfirmationUser(id: number): Promise<Response<User>> {
    const res = this.httpClient.get<Response<User>>(
      `${this.apiUrl}/auth/confirm/${id}`
    );
    return firstValueFrom(res);
  }

  sendConfirmation(id: number, formValue: any): Promise<Response<User>> {
    const res = this.httpClient.post<Response<User>>(
      `${this.apiUrl}/auth/confirm/${id}`,
      formValue
    );
    return firstValueFrom(res);
  }

  async login(formValue: any): Promise<Response<User>> {
    const res = this.httpClient.post<Response<User>>(
      `${this.environmentService.apiUrl}/auth/login`,
      formValue
    );
    const response = await firstValueFrom(res);
    if (response.success && response.data) this.setSession(response.data);
    return response;
  }

  private setSession(authResult: User) {
    const expires_at = dayjs().add(
      Number.parseInt(authResult.expires_at),
      'seconds'
    );

    localStorage.setItem(
      this.environmentService.tokenStorageKey,
      JSON.stringify({
        token: authResult.token,
        expires_at,
      })
    );
  }

  logout() {
    localStorage.removeItem(this.environmentService.tokenStorageKey);
  }

  public isLoggedIn() {
    if (this.getExpiration() === null) return false;

    return this.getExpiration() && dayjs().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem(
      this.environmentService.tokenStorageKey
    );
    if (!expiration) return null;
    const expiresAt = JSON.parse(expiration);
    return dayjs(expiresAt.expires_at);
  }
}
