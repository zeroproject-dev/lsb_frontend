import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;
  private httpClient = inject(HttpClient)

  constructor() {
    this.baseUrl = 'http://localhost:3300/api/v1'
  }

  login(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/auth/login`, formValue)
    )
  }
}
